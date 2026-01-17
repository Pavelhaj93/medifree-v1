import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {iconList} from '../../lib/iconList'

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
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'picture',
      title: 'Avatar Picture',
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
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          description: 'Description above the video',
        }),
        defineField({
          name: 'thumbnailImage',
          title: 'Thumbnail Image',
          type: 'image',
          description: 'Poster image for the video',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              validation: (rule) => {
                // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
                return rule.custom((alt, context) => {
                  if ((context.parent as any)?.asset?._ref && !alt) {
                    return 'Required'
                  }
                  return true
                })
              },
            }),
          ],
        }),
        // defineField({
        //   name: 'caption',
        //   title: 'Caption',
        //   type: 'string',
        //   description: 'Caption for the video for accessibility and SEO',
        // }),
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'certificationItem',
          title: 'Certification Item',
          fields: [
            defineField({
              name: 'certification',
              title: 'Certification',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: iconList,
                layout: 'dropdown',
              },
              description: 'Select an icon for this certification',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'certification',
              subtitle: 'icon',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    {
      name: 'extraBlock',
      title: 'Extra Block of biography',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'blockContent',
        }),
      ],
    },
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
