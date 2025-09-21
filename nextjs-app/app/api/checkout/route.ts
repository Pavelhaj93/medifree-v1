import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/sanity.types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

console.log("Stripe initialized:", !!stripe);
console.log(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: (Product & { quantity: number })[] } =
      await req.json();

    // const line_items = items.map((item) => ({
    //   price_data: {
    //     currency: "czk",
    //     product_data: {
    //       name: item.title,
    //       images: ["https://via.placeholder.com/150"],
    //     },
    //     unit_amount: item.price,
    //   },
    //   quantity: item.quantity,
    // }));
    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "https://medifree-v1-nextjs-app.vercel.app/",
      cancel_url: "https://medifree-v1-nextjs-app.vercel.app/",
      line_items: items.map((item) => ({
        price_data: {
          currency: "czk",
          product_data: {
            name: item.title,
            // @ts-ignore
            images: [item?.image?.asset?.url],
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
