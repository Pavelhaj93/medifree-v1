import {defineField, defineType} from 'sanity'

export const productShowcase = defineType({
  name: 'productShowcase',
  title: 'Product Showcase',
  type: 'object',
  description: 'Displays featured product and product grid from your e-shop',
  fields: [
    defineField({
      name: 'bestSellerBadgeText',
      type: 'string',
      title: 'Best Seller Badge Text',
      description: 'Text to display on the best seller badge',
    }),
    defineField({
      name: 'recommendedBadgeText',
      type: 'string',
      title: 'Recommended badge text',
      description: 'Text to display on the recommended badge',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Product Showcase',
        subtitle: 'Featured product + Product grid',
      }
    },
  },
})
