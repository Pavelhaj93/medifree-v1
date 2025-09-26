// just one block content

import {defineField, defineType} from 'sanity'

export const newAndEvent = defineType({
  name: 'newAndEvent',
  title: 'New and Event',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'content',
    },
    prepare() {
      return {
        title: `News and Events`,
      }
    },
  },
})
