import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

/**
 * Homepage schema - A singleton document for the homepage content
 */

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Medifree - Váš prostor po zdraví a rovnováhu',
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Objevte Medifree, váš online prostor pro fyzické ale i duševní zdraví. Nabízíme širokou škálu služeb, včetně online konzultací, přednášek a workshopů, tématických pobytů a e-shop s odbornými materiály.',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        {type: 'heroSectionCarousel'},
        {type: 'quoteSection'},
        {type: 'therapistSection'},
        {type: 'videoSection'},
        {type: 'servicesCarouselSection'},
        {type: 'howItWorksSection'},
        {type: 'calendarSection'},
        {type: 'socialConnectSection'},
        {type: 'contactSection'},
        // Also include generic sections
        {type: 'callToAction'},
        {type: 'infoSection'},
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
  preview: {
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Main website homepage',
      }
    },
  },
})
