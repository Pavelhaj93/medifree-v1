import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
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
          {title: 'Video kurzy', value: 'Video kurzy'},
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
      hidden: ({document}) => document?.category !== 'Ebooky',
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
