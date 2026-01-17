import {defineType, defineField} from 'sanity'

export const masonryGallery = defineType({
  name: 'masonryGallery',
  title: 'Masonry Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Text displayed in the badge above the heading',
      initialValue: 'GALERIE',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the gallery section',
      initialValue: 'Medifree v akci',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text below the heading',
    }),
    defineField({
      name: 'images',
      title: 'Images',
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
      description: 'Images to display in the masonry gallery',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'badgeText',
      media: 'images.0',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Masonry Gallery',
        subtitle: selection.subtitle || 'Gallery',
        media: selection.media,
      }
    },
  },
})
