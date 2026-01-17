import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Internal name for the page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // readOnly: true,
      description: 'The URL slug for the page, e.g. "about-us"',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the page, used in metadata or as H1, very important for SEO!',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Subheading for the page, used in metadata or as H2, important for SEO',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [
        {type: 'callToAction'},
        {type: 'infoSection'},
        {type: 'heroSectionCarousel'},
        {type: 'quote'},
        {type: 'videoSection'},
        {type: 'mediaCardsCarousel'},
        {type: 'stepper'},
        {type: 'contentDisplayBlock'},
        {type: 'contactSection'},
        {type: 'cta'},
        {type: 'contentDisplayBlockCompact'},
        {type: 'heroSection'},
        {type: 'therapistSection'},
        {type: 'serviceCardBlock'},
        {type: 'masonryGallery'},
        {type: 'productShowcase'},
        {type: 'calendarSection'},
        {type: 'postShowcase'},
        {type: 'textBlock'},
        {type: 'faqCardsGrid'},
        {type: 'faqAccordion'},
        {type: 'cart'},
        {type: 'checkoutSuccess'},
        {type: 'legalDocumentsSection'},
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
  ],
})
