import {defineField, defineType} from 'sanity'
import {DocumentVideoIcon} from '@sanity/icons'

// A file or link the customer gets by e-mail after paying. One material can be attached to any
// number of products (Produkt → Soubory → Materiály po zaplacení).
export const material = defineType({
  name: 'material',
  title: 'Materiál',
  type: 'document',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      description: 'Tak, jak ho zákazník uvidí v e-mailu (např. „Video: Jak číst data ze senzoru“).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Soubor',
      type: 'file',
      description: 'Video, PDF, audio nebo jiný soubor. Velká videa raději jako odkaz (YouTube/Vimeo).',
    }),
    defineField({
      name: 'url',
      title: 'Nebo odkaz',
      type: 'url',
      description: 'Např. neveřejné video na YouTube/Vimeo nebo sdílená složka. Použije se, když není nahraný soubor.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'note',
      title: 'Poznámka (jen pro vás)',
      type: 'text',
      rows: 2,
    }),
  ],
  validation: (rule) =>
    rule.custom((doc) =>
      doc?.file || doc?.url ? true : 'Nahrajte soubor, nebo vyplňte odkaz.',
    ),
  preview: {
    select: {title: 'title', mimeType: 'file.asset.mimeType', fileName: 'file.asset.originalFilename', url: 'url'},
    prepare({title, mimeType, fileName, url}) {
      return {title, subtitle: fileName ? `${fileName}${mimeType ? ` · ${mimeType}` : ''}` : url || 'Bez souboru'}
    },
  },
})
