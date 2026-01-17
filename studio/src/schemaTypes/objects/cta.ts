import {defineField, defineType} from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'string',
          options: {
            list: [
              {title: 'Calendar', value: 'Calendar'},
              {title: 'ArrowRight', value: 'ArrowRight'},
              {title: 'ChevronRight', value: 'ChevronRight'},
              {title: 'Check', value: 'Check'},
              {title: 'User', value: 'User'},
              {title: 'Mail', value: 'Mail'},
              {title: 'Phone', value: 'Phone'},
              {title: 'MapPin', value: 'MapPin'},
              {title: 'Star', value: 'Star'},
              {title: 'Heart', value: 'Heart'},
            ],
            layout: 'dropdown',
          },
          description: 'Choose an icon for the button',
        }),
      ],
    }),
  ],
})
