import {defineType} from 'sanity'

export const faqAccordion = defineType({
  name: 'faqAccordion',
  title: 'FAQ Accordion',
  type: 'object',
  description: 'An accordion displaying frequently asked questions and answers',
  fields: [
    {
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Text to display inside the badge above the FAQ accordion title',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title for the FAQ accordion section',
    },
  ],
})
