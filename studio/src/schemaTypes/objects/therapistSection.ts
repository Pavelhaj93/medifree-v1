import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const therapistSection = defineType({
  name: 'therapistSection',
  title: 'Therapist Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'O nás',
    }),
    defineField({
      name: 'showAllTherapists',
      title: 'Show All Therapists',
      type: 'boolean',
      description: 'If enabled, will automatically show all therapists from the Person documents',
      initialValue: true,
    }),
    defineField({
      name: 'selectedTherapists',
      title: 'Selected Therapists',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
      description: 'Only used if "Show All Therapists" is disabled',
      hidden: ({parent}) => parent?.showAllTherapists,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Light Gray', value: 'bg-gray-50'},
          {title: 'White', value: 'bg-white'},
          {title: 'Primary Light', value: 'bg-primary/5'},
        ],
      },
      initialValue: 'bg-gray-50',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      showAll: 'showAllTherapists',
      selectedCount: 'selectedTherapists.length',
    },
    prepare({title, showAll, selectedCount}) {
      return {
        title: title || 'Therapist Section',
        subtitle: showAll ? 'All therapists' : `${selectedCount || 0} selected therapists`,
      }
    },
  },
})
