export type DeliveryType = "packeta" | "pickup";

type ShopShipping = {
  packetaLabel?: string | null;
  packetaPrice?: number | null;
  pickupEnabled?: boolean | null;
  pickupLabel?: string | null;
  pickupAddress?: string | null;
  pickupInfo?: string | null;
} | null | undefined;

export type DeliveryOption = {
  type: DeliveryType;
  label: string;
  /** null = the price is not set in Sanity, so the option cannot be ordered. */
  price: number | null;
  address?: string;
  info?: string;
};

/** Delivery options for physical goods, in the order they are offered in the cart. */
export function deliveryOptions(shop: ShopShipping): DeliveryOption[] {
  const options: DeliveryOption[] = [
    {
      type: "packeta",
      label: shop?.packetaLabel || "Zásilkovna – výdejní místo nebo Z-BOX",
      price: shop?.packetaPrice ?? null,
    },
  ];
  if (shop?.pickupEnabled && shop.pickupAddress) {
    options.push({
      type: "pickup",
      label: shop.pickupLabel || "Osobní odběr",
      price: 0,
      address: shop.pickupAddress,
      info: shop.pickupInfo ?? undefined,
    });
  }
  return options;
}

export function deliveryOption(shop: ShopShipping, type: DeliveryType): DeliveryOption | undefined {
  return deliveryOptions(shop).find((o) => o.type === type);
}
