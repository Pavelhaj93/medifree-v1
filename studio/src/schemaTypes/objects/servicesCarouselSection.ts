import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export const servicesCarouselSection = defineType({
  name: 'servicesCarouselSection',
  title: 'Services Carousel Section',
  type: 'object',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Naše služby',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Služby',
    }),
    defineField({
      name: 'showAllServices',
      title: 'Show All Homepage Services',
      type: 'boolean',
      description: 'If enabled, will automatically show all homepage services',
      initialValue: true,
    }),
    defineField({
      name: 'selectedServices',
      title: 'Selected Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'homepageService'}],
        },
      ],
      description: 'Only used if "Show All Homepage Services" is disabled',
      hidden: ({parent}) => parent?.showAllServices,
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
  ],
  preview: {
    select: {
      title: 'title',
      showAll: 'showAllServices',
      selectedCount: 'selectedServices.length',
    },
    prepare({title, showAll, selectedCount}) {
      return {
        title: title || 'Services Carousel Section',
        subtitle: showAll ? 'All homepage services' : `${selectedCount || 0} selected services`,
      }
    },
  },
})
