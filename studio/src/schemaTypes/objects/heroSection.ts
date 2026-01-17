import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title of the hero section, used as H1, important for SEO!',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle text of the hero section',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'linkType',
          title: 'Link Type',
          type: 'string',
          options: {
            list: [
              {title: 'Internal Page', value: 'page'},
              {title: 'External URL', value: 'url'},
            ],
            layout: 'radio',
          },
          initialValue: 'page',
        }),
        defineField({
          name: 'page',
          title: 'Page',
          type: 'reference',
          to: [{type: 'page'}],
          hidden: ({parent}) => parent?.linkType !== 'page',
        }),
        defineField({
          name: 'url',
          title: 'External URL',
          type: 'url',
          hidden: ({parent}) => parent?.linkType !== 'url',
          validation: (Rule) =>
            Rule.uri({
              allowRelative: false,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
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
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'linkType',
          title: 'Link Type',
          type: 'string',
          options: {
            list: [
              {title: 'Internal Page', value: 'page'},
              {title: 'External URL', value: 'url'},
            ],
            layout: 'radio',
          },
          initialValue: 'page',
        }),
        defineField({
          name: 'page',
          title: 'Page',
          type: 'reference',
          to: [{type: 'page'}],
          hidden: ({parent}) => parent?.linkType !== 'page',
        }),
        defineField({
          name: 'url',
          title: 'External URL',
          type: 'url',
          hidden: ({parent}) => parent?.linkType !== 'url',
          validation: (Rule) =>
            Rule.uri({
              allowRelative: false,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
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
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'heroSectionCard',
        },
      ],
      description: 'Add cards to display in the hero section',
    }),
  ],
})
