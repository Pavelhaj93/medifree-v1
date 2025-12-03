import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

console.log("Stripe initialized:", !!stripe);
console.log(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const {
      items,
      customerEmail,
    }: {
      items: (Product & { quantity: number })[];
      customerEmail?: string;
    } = await req.json();

    // Get the base URL from the request
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://www.medifree.cz"
        : `${req.nextUrl.protocol}//${req.nextUrl.host}`;

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${baseUrl}/uspech?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/kosik`,
      customer_email: customerEmail,
      billing_address_collection: "required",
      // Enable automatic receipt emails from Stripe
      payment_intent_data: {
        receipt_email: customerEmail,
      },
      line_items: items.map((item) => ({
        price_data: {
          currency: "czk",
          product_data: {
            name: item.title,
            // @ts-ignore
            images: [urlForImage(item.image).url()!],
            metadata: {
              product_id: item._id,
              category: item.category,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
    };

    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
