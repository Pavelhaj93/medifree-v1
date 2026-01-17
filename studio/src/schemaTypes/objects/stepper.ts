import {defineField, defineType} from 'sanity'

export const stepper = defineType({
  name: 'stepper',
  title: 'Stepper',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Text for the badge above the stepper title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{type: 'step'}],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],
})
