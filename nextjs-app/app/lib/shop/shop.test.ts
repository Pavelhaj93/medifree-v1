import { describe, expect, it } from "vitest";
import { buildCheckoutLines, CheckoutError, summarizeLines, toMinorUnits } from "./pricing";
import { clampQuantity, productKind } from "./kinds";
import { formatCzechDate, voucherCode, voucherValidUntil } from "./vouchers";
import { customerOrderEmail, adminOrderEmail, type OrderEmailData } from "./emails";
import { getDeliveryFiles, uniqueFiles } from "./delivery";
import { reconcileCart } from "./cart";
import { groupVariants, pricePer100g } from "./variants";
import { escapeHtml } from "@/app/lib/html";

const products = [
  { _id: "ebook", title: "E-book", category: "Ebooky", price: 290 },
  { _id: "sensor", title: "Senzor", category: "Fyzické produkty", price: 1990, isAvailable: true },
  { _id: "glasses", title: "Brýle", category: "Fyzické produkty", price: 690, isAvailable: false },
  { _id: "voucher", title: "Poukaz na konzultaci", category: "Dárkové poukazy", price: 4500 },
];

describe("buildCheckoutLines", () => {
  it("uses prices from Sanity, not from the request", () => {
    const lines = buildCheckoutLines([{ id: "sensor", quantity: 2 }], products);
    expect(lines).toEqual([
      { productId: "sensor", title: "Senzor", kind: "physical", quantity: 2, unitPrice: 1990 },
    ]);
  });

  it("forces digital products to quantity 1 and merges duplicates", () => {
    const lines = buildCheckoutLines(
      [
        { id: "ebook", quantity: 3 },
        { id: "voucher", quantity: 1 },
        { id: "voucher", quantity: 2 },
      ],
      products,
    );
    expect(lines.find((l) => l.productId === "ebook")?.quantity).toBe(1);
    expect(lines.find((l) => l.productId === "voucher")?.quantity).toBe(3);
  });

  it("rejects unknown and unavailable products", () => {
    expect(() => buildCheckoutLines([{ id: "nope", quantity: 1 }], products)).toThrow(CheckoutError);
    expect(() => buildCheckoutLines([{ id: "glasses", quantity: 1 }], products)).toThrow(/není skladem/);
  });

  it("reports every product the customer has to remove", () => {
    try {
      buildCheckoutLines(
        [
          { id: "nope", quantity: 1 },
          { id: "glasses", quantity: 1 },
          { id: "ebook", quantity: 1 },
        ],
        products,
      );
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(CheckoutError);
      expect((err as CheckoutError).invalidIds.sort()).toEqual(["glasses", "nope"]);
    }
  });

  it("summarizes kinds and totals", () => {
    const lines = buildCheckoutLines(
      [
        { id: "ebook", quantity: 1 },
        { id: "sensor", quantity: 2 },
      ],
      products,
    );
    expect(summarizeLines(lines)).toMatchObject({
      kinds: ["digital", "physical"],
      hasPhysical: true,
      hasVoucher: false,
      itemsTotal: 290 + 2 * 1990,
    });
    expect(toMinorUnits(19.9)).toBe(1990);
  });
});

describe("kinds", () => {
  it("maps categories and clamps quantities", () => {
    expect(productKind("Fyzické produkty")).toBe("physical");
    expect(productKind("Dárkové poukazy")).toBe("voucher");
    expect(productKind("Balíčky")).toBe("digital");
    expect(clampQuantity("physical", 99)).toBe(20);
    expect(clampQuantity("voucher", 0)).toBe(1);
  });
});

describe("vouchers", () => {
  it("generates readable, deterministic, unique codes", () => {
    const a = voucherCode("secret", "cs_test_123", 0, 0);
    expect(a).toMatch(/^MF-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/);
    expect(voucherCode("secret", "cs_test_123", 0, 0)).toBe(a);
    expect(voucherCode("secret", "cs_test_123", 0, 1)).not.toBe(a);
    expect(voucherCode("other", "cs_test_123", 0, 0)).not.toBe(a);
    expect(() => voucherCode("", "cs_test_123", 0, 0)).toThrow();
  });

  it("computes validity and formats Czech dates", () => {
    expect(voucherValidUntil(new Date("2026-10-12T10:00:00Z"), 12)).toBe("2027-10-12");
    expect(voucherValidUntil(new Date("2026-01-31T10:00:00Z"), 1)).toBe("2026-02-28");
    expect(formatCzechDate("2027-10-02")).toBe("2. 10. 2027");
  });
});

describe("delivery files", () => {
  it("collects bundle files and removes duplicates", () => {
    const files = getDeliveryFiles({
      title: "Balíček",
      category: "Balíčky",
      bundleItems: [
        { title: "A", category: "Ebooky", ebookFile: { asset: { url: "https://x/a.pdf" } } },
        { title: "B", category: "Ebooky", ebookFile: { asset: { url: "https://x/a.pdf" } } },
      ],
    });
    expect(files).toHaveLength(2);
    expect(uniqueFiles(files)).toHaveLength(1);
  });
});

describe("emails", () => {
  const data: OrderEmailData = {
    orderNumber: "AB12CD34",
    customer: { name: "Jana <script>", email: "jana@example.com", phone: "+420777000111" },
    lines: [{ title: "Senzor", kind: "physical", quantity: 2, unitPrice: 1990 }],
    shipping: { label: "Zásilkovna", price: 89, pointId: "123", pointName: "Z-BOX Praha", pointAddress: "Ulice 1, Praha" },
    total: 4069,
    dispatchTime: "Odesíláme do 10 pracovních dnů",
    downloads: [],
    vouchers: [{ code: "MF-AAAA-BBBB", title: "Poukaz", validUntil: "2027-10-12", dedication: "Pro mámu" }],
    voucherRedeemInfo: "Napište nám.",
    legalDocuments: [{ title: "Obchodní podmínky", url: "https://cdn/op.pdf" }],
    siteUrl: "https://www.medifree.cz",
    studioOrderUrl: "https://studio/intent",
  };

  it("builds a customer confirmation with delivery, vouchers and terms", () => {
    const mail = customerOrderEmail(data);
    expect(mail.subject).toContain("AB12CD34");
    expect(mail.html).toContain("Z-BOX Praha");
    expect(mail.html).toContain("MF-AAAA-BBBB");
    expect(mail.html).toContain("12. 10. 2027");
    expect(mail.html).toContain("Obchodní podmínky");
    expect(mail.html).toContain("4 069 Kč");
  });

  it("escapes customer input in the admin email", () => {
    const mail = adminOrderEmail(data);
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain(escapeHtml("Jana <script>"));
    expect(mail.html).toContain("ID místa");
    expect(mail.subject).toContain("zboží k odeslání");
  });
});

describe("reconcileCart", () => {
  const cart = [
    { id: "ebook", title: "E-book", price: 250, quantity: 1 },
    { id: "sensor", title: "Senzor", price: 1990, quantity: 2 },
    { id: "glasses", title: "Brýle", price: 690, quantity: 1 },
    { id: "deleted", title: "Smazaný produkt", price: 100, quantity: 1 },
  ];

  it("updates prices, flags out-of-stock items and drops deleted ones", () => {
    const result = reconcileCart(cart, products);
    expect(result.changed).toBe(true);
    expect(result.removed).toEqual(["Smazaný produkt"]);
    expect(result.repriced).toEqual(["E-book"]);
    expect(result.items.map((i) => [i.id, i.price, i.quantity, i.unavailable])).toEqual([
      ["ebook", 290, 1, false],
      ["sensor", 1990, 2, false],
      ["glasses", 690, 1, true],
    ]);
  });

  it("reports no change when the cart already matches Sanity", () => {
    const synced = reconcileCart(cart, products).items;
    expect(reconcileCart(synced, products).changed).toBe(false);
  });
});

describe("groupVariants", () => {
  const list = [
    { _id: "ebook", price: 290, variantGroup: null },
    { _id: "choco", price: 1190, variantGroup: "Protein", isAvailable: false },
    { _id: "vanilla", price: 1190, variantGroup: "Protein" },
    { _id: "glasses", price: 690 },
    { _id: "plain", price: 1090, variantGroup: "Protein" },
  ];

  it("shows each flavor group once, represented by its cheapest available flavor", () => {
    const entries = groupVariants(list);
    expect(entries.map((e) => [e.product._id, e.variantCount, e.minPrice])).toEqual([
      ["ebook", 1, 290],
      ["plain", 3, 1090],
      ["glasses", 1, 690],
    ]);
  });

  it("computes price per 100 g", () => {
    expect(pricePer100g(1190, 1000)).toBe(119);
    expect(pricePer100g(1190, null)).toBeNull();
  });
});
