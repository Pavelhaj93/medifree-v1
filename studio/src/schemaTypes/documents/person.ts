import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Person schema.  Define and edit the fields for the 'person' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "Unique identifier for this person, don't change it please.",
      readOnly: true,
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'specialization',
      title: 'Specialization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    // Main image field
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.mainImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
    // Video field
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      description: 'Upload a video file (e.g., MP4, MOV)',
      options: {
        accept: 'video/*',
      },
      validation: (rule) =>
        rule.custom((file) => {
          if (file && file.asset && file.asset._ref) {
            const isValidType = /\.(mp4|mov|avi|wmv|flv|mkv)$/i.test(file.asset._ref)
            return isValidType ? true : 'Unsupported file type. Please upload a video file.'
          }
          return true
        }),
      fields: [
        defineField({
          name: 'thumbnailUrl',
          type: 'url',
          title: 'Thumbnail URL',
          description: 'URL of the thumbnail image for the video',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Caption for the video for accessibility and SEO',
        }),
        defineField({
          name: 'description',
          type: 'string',
          title: 'Description',
          description: 'Description above the video',
        }),
      ],
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      name: 'name',
      picture: 'picture',
    },
    prepare(selection) {
      return {
        title: `${selection.name} `,
        subtitle: 'Person',
        media: selection.picture,
      }
    },
  },
})
