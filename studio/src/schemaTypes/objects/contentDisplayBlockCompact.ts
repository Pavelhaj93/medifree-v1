import {defineType, defineField} from 'sanity'

export const contentDisplayBlockCompact = defineType({
  name: 'contentDisplayBlockCompact',
  title: 'Content Display Block Compact',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the content display block',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description for the content display block under title',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      description: 'Add one or more buttons (e.g. Instagram, WhatsApp, Facebook)',
      of: [
        {
          type: 'object',
          fields: [
            {
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
              initialValue: 'url',
            },
            {
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{type: 'page'}],
              hidden: ({parent}) => parent?.linkType !== 'page',
            },
            {
              name: 'url',
              title: 'External URL',
              type: 'url',
              hidden: ({parent}) => parent?.linkType !== 'url',
            },
            {
              name: 'anchor',
              title: 'Anchor (optional)',
              type: 'string',
              description: 'Add an anchor/hash to the link (e.g., "section-id" becomes "#section-id")',
            },
            {name: 'label', type: 'string', title: 'Label'},
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Calendar', value: 'Calendar'},
                  {title: 'Arrow Right', value: 'ArrowRight'},
                  {title: 'Chevron Right', value: 'ChevronRight'},
                  {title: 'Check', value: 'Check'},
                  {title: 'User', value: 'User'},
                  {title: 'Mail', value: 'Mail'},
                  {title: 'Phone', value: 'Phone'},
                  {title: 'Map Pin', value: 'MapPin'},
                  {title: 'Star', value: 'Star'},
                  {title: 'Heart', value: 'Heart'},
                  {title: 'Instagram', value: 'Instagram'},
                  {title: 'Facebook', value: 'Facebook'},
                  {title: 'WhatsApp', value: 'MessageCircle'},
                ],
                layout: 'dropdown',
              },
              description: 'Choose an icon for the link (optional)',
            },
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'},
          },
        },
      ],
    }),
    defineField({
      name: 'reverse',
      title: 'Reverse Layout',
      type: 'boolean',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Tertiary', value: 'tertiary'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
})
