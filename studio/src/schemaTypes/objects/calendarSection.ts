import {defineType} from 'sanity'

export const calendarSection = defineType({
  name: 'calendarSection',
  title: 'Calendar Section',
  type: 'object',
  fields: [
    {
      name: 'badgeTitle',
      title: 'Badge Title',
      type: 'string',
      description: 'Text displayed in the badge above the title',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the calendar section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the calendar section',
    },
  ],
})
