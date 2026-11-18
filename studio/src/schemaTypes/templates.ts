import type {Template} from 'sanity'

// E-shop categories the customer sees (menu, filter on /e-shop). Independent of the product type
// (`category`), which decides delivery. Same list as SHOP_CATEGORIES in nextjs-app/app/lib/shop/kinds.ts.
export const SHOP_CATEGORIES = [
  'Výhodné balíčky',
  'Diagnostika',
  'Doplňky stravy',
  'Spánek a cirkadiánní rytmus',
  'Non-toxic',
  'Dárkové poukazy',
  'Ostatní',
  'Digitální obsah',
]

// Same fallback as shopCategoryField in nextjs-app/sanity/queries/fragments.ts.
export const SHOP_CATEGORY_EXPR = `coalesce(shopCategory, select(
  category in ["Ebooky", "Audionahrávky", "Video kurzy", "Ebook + Audio"] => "Digitální obsah",
  category == "Balíčky" => "Výhodné balíčky",
  category == "Dárkové poukazy" => "Dárkové poukazy",
  "Ostatní"
))`

// The usual product type for a new product in a given e-shop category. Digital content can be
// an e-book, audio or video, so the editor picks the type there.
const DEFAULT_TYPE: Record<string, string | undefined> = {
  'Výhodné balíčky': 'Balíčky',
  'Dárkové poukazy': 'Dárkové poukazy',
  'Digitální obsah': undefined,
}

// A product created from a category folder in E-shop → Produkty starts in that e-shop category
// with the usual product type.
export const productByCategory: Template<{shopCategory: string}> = {
  id: 'product-by-category',
  title: 'Produkt v kategorii',
  schemaType: 'product',
  parameters: [{name: 'shopCategory', type: 'string'}],
  value: ({shopCategory}: {shopCategory: string}) => {
    const category = shopCategory in DEFAULT_TYPE ? DEFAULT_TYPE[shopCategory] : 'Fyzické produkty'
    return category ? {shopCategory, category} : {shopCategory}
  },
}
