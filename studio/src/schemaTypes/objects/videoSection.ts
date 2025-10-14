import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const videoSection = defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{type: 'video'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay Video',
      type: 'boolean',
      description: 'Video will autoplay when in view (may be blocked by browser)',
      initialValue: true,
    }),
    defineField({
      name: 'showControls',
      title: 'Show Video Controls',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'loop',
      title: 'Loop Video',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'video.title',
      subtitle: 'video.description',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Video Section',
        subtitle: subtitle || 'Video content section',
      }
    },
  },
})
