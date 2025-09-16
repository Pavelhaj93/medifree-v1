import {defineField, defineType} from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'Upload the video file here',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
