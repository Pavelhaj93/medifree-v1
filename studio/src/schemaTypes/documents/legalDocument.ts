import {DocumentPdfIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const legalDocument = defineType({
  name: 'legalDocument',
  title: 'Legal Document',
  type: 'document',
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Obchodní podmínky', value: 'Obchodní podmínky'},
          {title: 'Ochrana osobních údajů (GDPR)', value: 'Ochrana osobních údajů (GDPR)'},
          {title: 'Cookies', value: 'Cookies'},
          {title: 'E-shop', value: 'E-shop'},
          {title: 'Pobytové služby', value: 'Pobytové služby'},
          {title: 'Další dokumenty', value: 'Další dokumenty'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.txt',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'file',
    },
  },
})
