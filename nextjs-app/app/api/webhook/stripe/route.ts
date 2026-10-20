import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { fulfillCheckoutSession } from "@/app/lib/shop/fulfillment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// PDF rendering and Gmail can take a few seconds.
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const result = await fulfillCheckoutSession(stripe, session.id);
      console.log(`Checkout ${session.id}: ${result.status}`);
    } catch (error) {
      // 500 makes Stripe retry; fulfillment is idempotent so retries are safe.
      console.error(`Fulfillment failed for ${session.id}:`, error);
      return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
