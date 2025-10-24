import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { client } from "@/sanity/lib/client";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Check if webhook secret is configured
    if (!webhookSecret) {
      console.error(
        "STRIPE_WEBHOOK_SECRET is not configured in environment variables"
      );
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      console.error("No stripe-signature header found");
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      console.error("Webhook secret exists:", !!webhookSecret);
      console.error("Signature exists:", !!signature);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get customer email
      const customerEmail = session.customer_details?.email;

      if (!customerEmail) {
        console.error("No customer email found in session");
        return NextResponse.json(
          { error: "No customer email" },
          { status: 400 }
        );
      }

      // Get line items to know what products were purchased
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          expand: ["data.price.product"],
        }
      );

      // Process each purchased item
      for (const item of lineItems.data) {
        const productName = (item.price?.product as Stripe.Product)?.name;

        if (productName) {
          // Find the product in Sanity by title
          const product = await client.fetch(
            `
            *[_type == "product" && title == $title][0]{
              _id,
              title,
              category,
              ebookFile {
                asset->{
                  _id,
                  url,
                  originalFilename,
                  mimeType
                }
              }
            }
          `,
            { title: productName }
          );

          if (
            product &&
            product.category === "Ebooky" &&
            product.ebookFile?.asset
          ) {
            // Send email with ebook attachment
            await sendEbookEmail(customerEmail, product);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function sendEbookEmail(email: string, product: any) {
  try {
    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error(
        "Gmail credentials not configured. Missing GMAIL_USER or GMAIL_APP_PASSWORD"
      );
      throw new Error("Email service not configured");
    }

    console.log("Attempting to send email to:", email);
    console.log("Gmail user configured:", !!process.env.GMAIL_USER);
    console.log("Gmail password configured:", !!process.env.GMAIL_APP_PASSWORD);

    // Configure transporter using Gmail (same as contact route)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify the connection
    await transporter.verify();
    console.log("Gmail connection verified successfully");

    // Send the email with ebook
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Váš ebook: ${product.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Děkujeme za nákup!</h2>
          <p>Váš ebook <strong>${product.title}</strong> je připraven ke stažení.</p>
          <p>Odkaz ke stažení najdete níže:</p>
          <a href="${product.ebookFile.asset.url}" 
             style="background-color: #007cba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">
            Stáhnout ebook
          </a>
          <hr style="margin: 24px 0; border: none; height: 1px; background-color: #eee;">
          <p style="color: #666; font-size: 14px;">
            S pozdravem,<br>
            Tým Medifree<br>
            <a href="https://www.medifree.cz">www.medifree.cz</a>
          </p>
        </div>
      `,
      attachments: [
        {
          filename:
            product.ebookFile.asset.originalFilename || `${product.title}.pdf`,
          path: product.ebookFile.asset.url,
        },
      ],
    });

    console.log(
      `Ebook email sent successfully to ${email} for product ${product.title}`
    );
  } catch (error) {
    console.error("Failed to send ebook email:", error);
    throw error;
  }
}
