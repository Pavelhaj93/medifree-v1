import {defineField, defineType} from 'sanity'

export const videoSection = defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {accept: 'video/*'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileVideo',
      title: 'Mobile Video File',
      type: 'file',
      options: {accept: 'video/*'},
    }),
  ],
})
