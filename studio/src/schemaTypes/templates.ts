import type {Template} from 'sanity'

// Same order as the category list in documents/product.ts.
export const PRODUCT_CATEGORIES = [
  'Ebooky',
  'Audionahrávky',
  'Video kurzy',
  'Ebook + Audio',
  'Balíčky',
  'Fyzické produkty',
  'Dárkové poukazy',
]

// A product created from a category folder in E-shop → Produkty starts in that category.
export const productByCategory: Template<{category: string}> = {
  id: 'product-by-category',
  title: 'Produkt v kategorii',
  schemaType: 'product',
  parameters: [{name: 'category', type: 'string'}],
  value: ({category}: {category: string}) => ({category}),
}
