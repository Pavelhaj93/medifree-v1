import {defineField, defineType} from 'sanity'
import {BasketIcon} from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Ebooky', value: 'Ebooky'},
          {title: 'Audionahrávky', value: 'Audionahrávky'},
          {title: 'Video kurzy', value: 'Video kurzy'},
          {title: 'Ebook + Audio', value: 'Ebook + Audio'},
          {title: 'Balíčky', value: 'Balíčky'},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.mainImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Base price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ebookFile',
      title: 'Ebook File',
      type: 'file',
      description:
        'Upload the ebook file (PDF, EPUB, etc.) that will be sent to customers after purchase',
      options: {
        accept: '.pdf,.epub,.mobi',
      },
      hidden: ({document}) =>
        document?.category !== 'Ebooky' && document?.category !== 'Ebook + Audio',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio súbor',
      type: 'file',
      description: 'Upload the audio file that will be sent to customers after purchase',
      options: {
        accept: 'audio/*',
      },
      hidden: ({document}) =>
        document?.category !== 'Audionahrávky' && document?.category !== 'Ebook + Audio',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video súbor',
      type: 'file',
      description: 'Upload the video file that will be sent to customers after purchase',
      options: {
        accept: 'video/*',
      },
      hidden: ({document}) => document?.category !== 'Video kurzy',
    }),
    defineField({
      name: 'originalPrice',
      title: 'Původní cena bez slevy',
      type: 'number',
      description: 'Full price before bundle discount — used to display savings',
      hidden: ({document}) => document?.category !== 'Balíčky',
    }),
    defineField({
      name: 'bundleItems',
      title: 'Produkty v balíčku',
      type: 'array',
      description: 'Select the individual products included in this bundle (min. 2)',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      hidden: ({document}) => document?.category !== 'Balíčky',
      validation: (Rule) =>
        Rule.custom((items, ctx) => {
          if (ctx.document?.category === 'Balíčky' && (!items || (items as unknown[]).length < 2)) {
            return 'Balíček musí obsahovat alespoň 2 produkty'
          }
          return true
        }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      // only one product can be featured
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true

          const {getClient} = context
          const client = getClient({apiVersion: '2023-01-01'})
          const otherFeatured = await client.fetch(
            `*[_type == "product" && featured == true && _id != $id][0]._id`,
            {id: context?.document?._id},
          )

          if (otherFeatured) {
            return 'Only one product can be featured at a time. Unfeature the other product first.'
          }
          return true
        }),
    }),
  ],
})
