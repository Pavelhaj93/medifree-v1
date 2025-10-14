import {defineField, defineType} from 'sanity'
import {OlistIcon} from '@sanity/icons'

export const howItWorksSection = defineType({
  name: 'howItWorksSection',
  title: 'How It Works Section',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Jak to funguje?',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Náš postup',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Step',
                subtitle: subtitle || 'Step description',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: [
        {
          title: 'První konzultace',
          description:
            'Zarezervujte si prvních 15 minut konzultace zdarma, kde se seznámíme a zjistíme, jak vám můžeme pomoci.',
        },
        {
          title: 'Individuální plán',
          description:
            'Na základě úvodní konzultace vytvoříme individuální plán, který zahrnuje laboratorní vyšetření a úpravu životního stylu na míru',
        },
        {
          title: 'Pravidelné sezení',
          description:
            'Budeme se pravidelně setkávat, abychom sledovali váš pokrok a přizpůsobovali plán podle vašich potřeb.',
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Light Gray', value: 'bg-gray-200'},
          {title: 'Gray 50', value: 'bg-gray-50'},
          {title: 'White', value: 'bg-white'},
          {title: 'Primary Light', value: 'bg-primary/5'},
        ],
      },
      initialValue: 'bg-gray-200',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      stepsCount: 'steps.length',
    },
    prepare({title, stepsCount}) {
      return {
        title: title || 'How It Works Section',
        subtitle: `${stepsCount || 0} steps`,
      }
    },
  },
})
