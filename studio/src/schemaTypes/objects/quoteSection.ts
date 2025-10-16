import {defineField, defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons'

export const quoteSection = defineType({
  name: 'quoteSection',
  title: 'Quote Section',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Naše tělo je naším vlastním lékařem. To nejlepší, co můžeme udělat, je umožnit mu pustit se do práce.',
    }),
    defineField({
      name: 'author',
      title: 'Quote Author',
      type: 'string',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Light Gray', value: 'bg-gray-50'},
          {title: 'White', value: 'bg-white'},
          {title: 'Primary Light', value: 'bg-primary/5'},
        ],
      },
      initialValue: 'bg-gray-50',
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      subtitle: 'author',
    },
    prepare({title, subtitle}) {
      return {
        title: title ? `"${title.substring(0, 60)}..."` : 'Quote Section',
        subtitle: subtitle ? `— ${subtitle}` : 'Inspirational quote',
      }
    },
  },
})
