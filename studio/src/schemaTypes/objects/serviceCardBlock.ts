import {defineType, defineField} from 'sanity'

export const serviceCardBlock = defineType({
  name: 'serviceCardBlock',
  title: 'Service Card',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Category or tag for the service',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Service title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'Detailed service content (what the service includes)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.parent as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Service price in CZK',
    }),
    defineField({
      name: 'priceType',
      title: 'Price Type',
      type: 'string',
      description: 'Price unit or type (e.g., /hod, /konzultaci)',
    }),
    defineField({
      name: 'reverseLayout',
      title: 'Reverse Layout',
      type: 'boolean',
      description: 'Swap the position of image and content',
      initialValue: false,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Gray', value: 'gray'},
        ],
        layout: 'radio',
      },
      initialValue: 'gray',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Custom button text (leave empty for default)',
      initialValue: 'Objednat službu',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'url',
      description: 'Custom booking URL (leave empty to use default https://cal.com/medifree)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tag',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Service Card',
        subtitle: selection.subtitle || 'No tag',
        media: selection.media,
      }
    },
  },
})
