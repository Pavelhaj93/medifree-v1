import {defineType, defineField} from 'sanity'

export const therapistSection = defineType({
  name: 'therapistSection',
  title: 'Therapist Card',
  type: 'object',
  fields: [
    defineField({
      name: 'therapist',
      title: 'Therapist',
      type: 'reference',
      to: [{type: 'person'}],
      description: 'Select a therapist to display',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Green)', value: 'primary'},
          {title: 'Tertiary (Pink)', value: 'tertiary'},
          {title: 'White', value: 'white'},
          {title: 'Gray', value: 'gray'},
        ],
        layout: 'radio',
      },
      initialValue: 'gray',
    }),
    defineField({
      name: 'reverseLayout',
      title: 'Reverse Layout',
      type: 'boolean',
      description: 'Swap the position of image and content',
      initialValue: false,
    }),
    defineField({
      name: 'showBookingButton',
      title: 'Show Booking Button',
      type: 'boolean',
      description: 'Display the "Schedule Consultation" button',
      initialValue: true,
    }),
    defineField({
      name: 'bookingButtonText',
      title: 'Booking Button Text',
      type: 'string',
      description: 'Custom text for the booking button (leave empty for default)',
      hidden: ({parent}) => !parent?.showBookingButton,
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'Custom booking URL (leave empty to use default)',
      hidden: ({parent}) => !parent?.showBookingButton,
    }),
    defineField({
      name: 'underImageTitle',
      title: 'Under Image Title',
      type: 'string',
      description: 'Title to display under the therapist image',
    }),
  ],
  preview: {
    select: {
      therapistName: 'therapist.name',
      therapistImage: 'therapist.picture',
    },
    prepare(selection) {
      return {
        title: 'Therapist Card',
        subtitle: selection.therapistName || 'No therapist selected',
        media: selection.therapistImage,
      }
    },
  },
})
