import {defineField, defineType} from 'sanity'

export const freeResourcesSection = defineType({
  name: 'freeResourcesSection',
  title: 'Ke stažení — sekce',
  type: 'object',
  description: 'Zobrazí mřížku bezplatných materiálů ke stažení nebo přehrání',
  fields: [
    defineField({
      name: 'heading',
      title: 'Nadpis sekce',
      type: 'string',
      initialValue: 'Ke stažení zdarma',
    }),
    defineField({
      name: 'subheading',
      title: 'Podnapis sekce',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({heading}) {
      return {
        title: heading ?? 'Ke stažení — sekce',
        subtitle: 'Mřížka bezplatných materiálů',
      }
    },
  },
})
