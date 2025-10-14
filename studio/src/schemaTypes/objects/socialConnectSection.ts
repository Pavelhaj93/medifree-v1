import {defineField, defineType} from 'sanity'
import {ShareIcon} from '@sanity/icons'

export const socialConnectSection = defineType({
  name: 'socialConnectSection',
  title: 'Social Connect Section',
  type: 'object',
  icon: ShareIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Spojte se s námi',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Sledujte nás na sociálních sítích',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Sociální sítě',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Twitter/X', value: 'twitter'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'TikTok', value: 'tiktok'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Optional custom label for the link',
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
              label: 'label',
            },
            prepare({platform, url, label}) {
              return {
                title: label || platform || 'Social Link',
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Light Gray', value: 'bg-gray-50'},
          {title: 'White', value: 'bg-white'},
          {title: 'Primary Light', value: 'bg-primary/5'},
        ],
      },
      initialValue: 'bg-gray-50',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      linksCount: 'socialLinks.length',
    },
    prepare({title, linksCount}) {
      return {
        title: title || 'Social Connect Section',
        subtitle: `${linksCount || 0} social links`,
      }
    },
  },
})
