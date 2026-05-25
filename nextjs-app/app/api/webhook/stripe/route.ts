import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { client } from "@/sanity/lib/client";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

type FileAsset = {
  _id: string;
  url: string | null;
  originalFilename: string | null;
  mimeType: string | null;
};

type SanityProduct = {
  _id: string;
  title: string;
  category: string;
  ebookFile?: { asset?: FileAsset } | null;
  audioFile?: { asset?: FileAsset } | null;
  videoFile?: { asset?: FileAsset } | null;
  bundleItems?: Array<{
    _id: string;
    title: string;
    category: string;
    ebookFile?: { asset?: FileAsset } | null;
    audioFile?: { asset?: FileAsset } | null;
    videoFile?: { asset?: FileAsset } | null;
  }> | null;
};

type DeliveryFile = { label: string; url: string };

function getDeliveryFiles(product: SanityProduct): DeliveryFile[] {
  const files: DeliveryFile[] = [];

  const addFile = (
    file: { asset?: FileAsset } | null | undefined,
    label: string,
  ) => {
    if (file?.asset?.url) {
      files.push({ label, url: file.asset.url });
    }
  };

  switch (product.category) {
    case "Ebooky":
      addFile(product.ebookFile, `📖 ${product.title} (PDF)`);
      break;
    case "Audionahrávky":
      addFile(product.audioFile, `🎧 ${product.title}`);
      break;
    case "Video kurzy":
      addFile(product.videoFile, `🎬 ${product.title}`);
      break;
    case "Ebook + Audio":
      addFile(product.ebookFile, `📖 ${product.title} (PDF)`);
      addFile(product.audioFile, `🎧 ${product.title} (audio)`);
      break;
    case "Balíčky":
      for (const item of product.bundleItems ?? []) {
        addFile(item.ebookFile, `📖 ${item.title} (PDF)`);
        addFile(item.audioFile, `🎧 ${item.title} (audio)`);
        addFile(item.videoFile, `🎬 ${item.title} (video)`);
      }
      break;
  }

  return files;
}

export async function POST(req: NextRequest) {
  try {
    if (!webhookSecret) {
      console.error(
        "STRIPE_WEBHOOK_SECRET is not configured in environment variables",
      );
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 },
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

      const customerEmail = session.customer_details?.email;

      if (!customerEmail) {
        console.error("No customer email found in session");
        return NextResponse.json(
          { error: "No customer email" },
          { status: 400 },
        );
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ["data.price.product"] },
      );

      for (const item of lineItems.data) {
        const productName = (item.price?.product as Stripe.Product)?.name;

        if (productName) {
          const product: SanityProduct | null = await client.fetch(
            `
            *[_type == "product" && title == $title][0]{
              _id,
              title,
              category,
              ebookFile { asset->{ _id, url, originalFilename, mimeType } },
              audioFile { asset->{ _id, url, originalFilename, mimeType } },
              videoFile { asset->{ _id, url, originalFilename, mimeType } },
              bundleItems[]->{
                _id, title, category,
                ebookFile { asset->{ _id, url, originalFilename, mimeType } },
                audioFile { asset->{ _id, url, originalFilename, mimeType } },
                videoFile { asset->{ _id, url, originalFilename, mimeType } }
              }
            }
          `,
            { title: productName },
          );

          if (product) {
            const deliveryFiles = getDeliveryFiles(product);
            if (deliveryFiles.length > 0) {
              await sendDeliveryEmail(customerEmail, product.title, deliveryFiles);
            }
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}

async function sendDeliveryEmail(
  email: string,
  productTitle: string,
  files: DeliveryFile[],
) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error(
        "Gmail credentials not configured. Missing GMAIL_USER or GMAIL_APP_PASSWORD",
      );
      throw new Error("Email service not configured");
    }

    console.log("Attempting to send email to:", email);
    console.log("Gmail user configured:", !!process.env.GMAIL_USER);
    console.log("Gmail password configured:", !!process.env.GMAIL_APP_PASSWORD);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.verify();
    console.log("Gmail connection verified successfully");

    const fileListHtml = files
      .map(
        (f) =>
          `<li style="margin: 8px 0;"><a href="${f.url}" style="color: #007cba; text-decoration: none;">${f.label}</a></li>`,
      )
      .join("");

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Váš nákup: ${productTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Děkujeme za nákup!</h2>
          <p>Váš produkt <strong>${productTitle}</strong> je připraven ke stažení.</p>
          <p>Zde jsou vaše soubory ke stažení:</p>
          <ul style="list-style: none; padding: 0;">
            ${fileListHtml}
          </ul>
          <hr style="margin: 24px 0; border: none; height: 1px; background-color: #eee;">
          <p style="color: #666; font-size: 14px;">
            S pozdravem,<br>
            Tým Medifree<br>
            <a href="https://www.medifree.cz">www.medifree.cz</a>
          </p>
        </div>
      `,
    });

    console.log(
      `Delivery email sent successfully to ${email} for product ${productTitle}`,
    );
  } catch (error) {
    console.error("Failed to send delivery email:", error);
    throw error;
  }
}
