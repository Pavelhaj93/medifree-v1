import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const heroSectionCarousel = defineType({
  name: 'heroSectionCarousel',
  title: 'Hero Section Carousel',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Váš prostor pro zdraví a rovnováhu',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Nabízíme celostní terapeutické přístupy, které vás podpoří na cestě k plnohodnotnému životu.',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Medifree',
    }),
    defineField({
      name: 'images',
      title: 'Background Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'showBookButton',
      title: 'Show Book Button',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'images.0',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle || 'Hero section with carousel',
      }
    },
  },
})
