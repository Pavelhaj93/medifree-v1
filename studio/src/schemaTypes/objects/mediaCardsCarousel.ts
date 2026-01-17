import {defineField, defineType} from 'sanity'

export const mediaCardsCarousel = defineType({
  name: 'mediaCardsCarousel',
  title: 'Media Cards Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Text for the badge above the carousel',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the carousel section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle or description for the carousel',
    }),
    defineField({
      name: 'cards',
      title: 'Media Cards',
      type: 'array',
      of: [{type: 'mediaCard'}],
      validation: (Rule) => Rule.required().min(1),
      description: 'Array of media cards to display in the carousel',
    }),
  ],
})
