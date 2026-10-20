import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { serverClient } from "@/sanity/lib/writeClient";
import { checkoutProductsQuery } from "@/sanity/queries/shop";
import type { CheckoutProductsQueryResult } from "@/sanity.types";

const requestSchema = z.object({ ids: z.array(z.string().min(1)).max(50) });

/**
 * Current price, title and availability for the products in a browser cart, so the cart can
 * show what Stripe will actually charge and drop products that were deleted in Sanity.
 */
export async function POST(req: NextRequest) {
  const parsed = requestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const products = await serverClient.fetch<CheckoutProductsQueryResult>(checkoutProductsQuery, {
    ids: parsed.data.ids,
  });

  return NextResponse.json({
    products: products.map((p) => ({
      _id: p._id,
      title: p.title,
      price: p.price,
      category: p.category,
      isAvailable: p.isAvailable,
    })),
  });
}
