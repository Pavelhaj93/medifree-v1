import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const calendarSection = defineType({
  name: 'calendarSection',
  title: 'Calendar Section',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Rezervace',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Zarezervujte si termín',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Kalendář',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'bg-white'},
          {title: 'Light Gray', value: 'bg-gray-50'},
          {title: 'Primary Light', value: 'bg-primary/5'},
        ],
      },
      initialValue: 'bg-white',
    }),
    defineField({
      name: 'showBookButton',
      title: 'Show Book Button',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Calendar Section',
        subtitle: subtitle || 'Booking calendar section',
      }
    },
  },
})
