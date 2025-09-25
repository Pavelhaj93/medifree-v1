// define schema where will be array of pictures

import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Homepage Picture schema.  Define and edit the fields for the 'homepagePicture' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const homepagePicture = defineType({
  name: 'homepagePicture',
  title: 'Homepage Picture',
  icon: ImageIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Alternative text for the image for accessibility',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      description: 'Image displayed on the homepage',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Homepage Picture',
        media: media,
      }
    },
  },
})
