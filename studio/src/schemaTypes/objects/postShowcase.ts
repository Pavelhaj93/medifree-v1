import {defineField, defineType} from 'sanity'

export const postShowcase = defineType({
  name: 'postShowcase',
  title: 'Post Showcase',
  type: 'object',
  description: 'Displays first post and post grid from your blog',
  fields: [
    defineField({
      name: 'recommendedBadgeText',
      type: 'string',
      title: 'Recommended badge text',
      description: 'Text to display on the recommended badge',
    }),
    defineField({
      name: 'gridSectionHeading',
      type: 'string',
      title: 'Grid section heading',
      description: 'Heading for the post grid section',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Post Showcase',
        subtitle: 'First post + Post grid',
      }
    },
  },
})
