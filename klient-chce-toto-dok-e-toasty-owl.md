# Plán: Rozšíření e-shopu – Sanity + Next.js

## Context
Klient chce přidat balíčky více eboků, audionahrávky (samostatné nebo s ebooke) a videa záznamů přednášek. Aktuálně existují jen kategorie „Ebooky" a „Video kurzy", přičemž Video kurzy nemají upload pole (bug). Celý e-shop flow: Sanity → Next.js → Stripe checkout → webhook → email s downloadem.

---

## ČÁST 1 – Sanity Studio

**Soubor:** `studio/src/schemaTypes/documents/product.ts`

### 1a. Opravit bug – přidat chybějící `videoFile` pole
```ts
defineField({
  name: 'videoFile',
  title: 'Video soubor',
  type: 'file',
  options: { accept: 'video/*' },
  hidden: ({document}) => document?.category !== 'Video kurzy',
})
```

### 1b. Rozšířit kategorie
```ts
{ title: 'Ebooky', value: 'Ebooky' },
{ title: 'Audionahrávky', value: 'Audionahrávky' },
{ title: 'Video kurzy', value: 'Video kurzy' },
{ title: 'Ebook + Audio', value: 'Ebook + Audio' },
{ title: 'Balíčky', value: 'Balíčky' },
```

### 1c. Přidat `audioFile` pole
```ts
defineField({
  name: 'audioFile',
  title: 'Audio soubor',
  type: 'file',
  options: { accept: 'audio/*' },
  hidden: ({document}) =>
    document?.category !== 'Audionahrávky' && document?.category !== 'Ebook + Audio',
})
```

### 1d. Upravit viditelnost `ebookFile` i pro kombinaci
```ts
hidden: ({document}) =>
  document?.category !== 'Ebooky' && document?.category !== 'Ebook + Audio',
```

### 1e. Přidat `bundleItems` pole (reference na produkty)
```ts
defineField({
  name: 'bundleItems',
  title: 'Produkty v balíčku',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'product' }] }],
  hidden: ({document}) => document?.category !== 'Balíčky',
  validation: (Rule) => Rule.custom((items, ctx) => {
    if (ctx.document?.category === 'Balíčky' && (!items || items.length < 2))
      return 'Balíček musí obsahovat alespoň 2 produkty'
    return true
  }),
})
```

### 1f. Přidat `originalPrice` (pro zobrazení úspory u balíčku)
```ts
defineField({
  name: 'originalPrice',
  title: 'Původní cena bez slevy',
  type: 'number',
  hidden: ({document}) => document?.category !== 'Balíčky',
})
```

---

## ČÁST 2 – Next.js Frontend

### 2a. GROQ fragment – přidat nová pole
**Soubor:** `nextjs-app/sanity/queries/fragments.ts`

Přidat do product fields fragmentu:
```
videoFile { asset->{ _id, url, originalFilename, mimeType } },
audioFile { asset->{ _id, url, originalFilename, mimeType } },
originalPrice,
bundleItems[]->{ _id, title, category, price,
  ebookFile { asset->{ _id, url, originalFilename, mimeType } },
  audioFile { asset->{ _id, url, originalFilename, mimeType } },
  videoFile { asset->{ _id, url, originalFilename, mimeType } }
}
```

### 2b. TypeScript typy – aktualizovat Product type
**Soubor:** `nextjs-app/sanity.types.ts`

Aktualizovat `category` union type:
```ts
category: "Ebooky" | "Audionahrávky" | "Video kurzy" | "Ebook + Audio" | "Balíčky";
```

Přidat nové fieldy:
```ts
videoFile?: { asset?: { _id: string; url: string; originalFilename?: string; mimeType?: string } };
audioFile?: { asset?: { _id: string; url: string; originalFilename?: string; mimeType?: string } };
originalPrice?: number;
bundleItems?: Array<{
  _id: string; title: string; category: string; price: number;
  ebookFile?: ...; audioFile?: ...; videoFile?: ...;
}>;
```

### 2c. ProductCard – zobrazit kategorii/typ
**Soubor:** `nextjs-app/app/components/sections/eshop/ProductCard.tsx`

- Přidat barevný badge pro každý typ kategorie (Ebook, Audio, Video, Balíček)
- U balíčků: zobrazit "Obsahuje X produktů" a přeškrtnutou `originalPrice` vs. aktuální cenu

### 2d. ProductGrid – filtrování nových kategorií
**Soubor:** `nextjs-app/app/components/sections/eshop/ProductGrid.tsx`

- Přidat nové kategorie do filtrovacího seznamu: Audionahrávky, Ebook + Audio, Balíčky
- Přidat filtr „Vše" jako výchozí

### 2e. Stripe webhook – email pro nové typy
**Soubor:** `nextjs-app/app/api/webhook/stripe/route.ts`

Aktuální logika odesílá email jen pro `category === "Ebooky"`. Rozšířit:

```
"Ebooky"       → email s odkazem na ebookFile
"Audionahrávky" → email s odkazem na audioFile
"Video kurzy"  → email s odkazem na videoFile
"Ebook + Audio" → email s oběma soubory
"Balíčky"      → email s odkazy na soubory všech bundleItems
```

Logika pro balíčky: projít `bundleItems`, pro každý item zjistit jeho soubory a přidat do emailu. Doporučuji helper funkci `getDeliveryFilesForProduct(product)`.

### 2f. Email šablona – podpora více souborů
**Soubor:** `nextjs-app/app/lib/email.ts` (nebo webhook route)

Šablona musí zvládnout seznam souborů ke stažení, ne jen jeden odkaz. Příklad:
```html
<p>Zde jsou vaše soubory ke stažení:</p>
<ul>
  <li><a href="...">📖 Název ebooku (PDF)</a></li>
  <li><a href="...">🎧 Název audionahrávky (MP3)</a></li>
</ul>
```

---

## Výsledná tabulka podmíněných polí

| Kategorie      | ebookFile | audioFile | videoFile | bundleItems |
|----------------|-----------|-----------|-----------|-------------|
| Ebooky         | ✅        | —         | —         | —           |
| Audionahrávky  | —         | ✅        | —         | —           |
| Video kurzy    | —         | —         | ✅        | —           |
| Ebook + Audio  | ✅        | ✅        | —         | —           |
| Balíčky        | —         | —         | —         | ✅          |

---

## Pořadí implementace (doporučené)

1. Sanity schema změny (studio/product.ts) → otestovat ve Studiu
2. GROQ fragmenty + TypeScript typy (nextjs-app)
3. Stripe webhook – rozšíření email logiky
4. Email šablona – více souborů
5. ProductCard badge + bundle zobrazení
6. ProductGrid filtry

---

## Časová estimace (developer bez AI)

| Krok | Úkol | Odhadovaný čas |
|------|------|----------------|
| 1 | Sanity schema (nové kategorie, pole, podmíněné zobrazení) | 1–2 h |
| 2 | GROQ fragmenty + TypeScript typy | 1–2 h |
| 3 | Stripe webhook – logika pro nové typy + balíčky | 2–3 h |
| 4 | Email šablona – více souborů, různé typy | 1–2 h |
| 5 | ProductCard – badges, zobrazení balíčku, původní cena | 2–3 h |
| 6 | ProductGrid – nové filtry | 0.5–1 h |
| 7 | Testování (Studio, checkout, webhook, email) | 2–3 h |
| **Celkem** | | **9.5–16 h** |

**Reálný odhad:** 2–3 pracovní dny, počítaje s průzkumem kódu, debugováním Stripe webhooků a testováním emailů.

> Poznámka: Největší časová náročnost je v logice Stripe webhooků (balíčky vyžadují rekurzivní procházení bundleItems) a testování end-to-end flow.

---

## Ověření

1. Sanity Studio: přepínat kategorie, ověřit zobrazení polí
2. Vytvořit testovací produkt každé kategorie vč. balíčku
3. Spustit Next.js dev server, ověřit grid a filtry
4. Test checkout + Stripe webhook (Stripe CLI `stripe listen`)
5. Ověřit doručení emailu pro každý typ produktu
