import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nadpis sekce',
      type: 'string',
      initialValue: 'Co říkají naši klienti',
    }),
    defineField({
      name: 'testimonials',
      title: 'Reference',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Jméno / zdroj',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role / kontext (nepovinné)',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Text reference',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'text'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Testimonials'}
    },
  },
})
