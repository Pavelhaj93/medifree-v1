import {defineField, defineType} from 'sanity'

export const faqCardsGrid = defineType({
  name: 'faqCardsGrid',
  title: 'FAQ Cards Grid',
  type: 'object',
  description: 'A grid of FAQ cards displaying frequently asked questions and answers',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title for the FAQ section',
    }),
  ],
})
