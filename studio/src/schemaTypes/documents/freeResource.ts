import {defineField, defineType} from 'sanity'
import {DownloadIcon} from '@sanity/icons'

export const freeResource = defineType({
  name: 'freeResource',
  title: 'Ke stažení',
  type: 'document',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Typ materiálu',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Video přednáška', value: 'video'},
          {title: 'Audionahrávka', value: 'audio'},
          {title: 'Dokument (PDF)', value: 'dokument'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Náhledový obrázek',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativní text',
        }),
      ],
      options: {hotspot: true},
    }),
    defineField({
      name: 'file',
      title: 'Soubor',
      type: 'file',
      description: 'Nahrajte audio, video nebo PDF soubor',
      options: {
        accept: 'audio/*,video/*,.pdf',
      },
      hidden: ({document}) => document?.category === undefined,
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL (YouTube / Vimeo)',
      type: 'url',
      description:
        'Volitelné — zadejte URL z YouTube nebo Vimeo. Pokud je vyplněno, použije se místo nahraného souboru.',
      hidden: ({document}) => document?.category !== 'video',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum zveřejnění',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'thumbnail',
    },
    prepare({title, category, media}) {
      const labels: Record<string, string> = {
        video: 'Video přednáška',
        audio: 'Audionahrávka',
        dokument: 'Dokument (PDF)',
      }
      return {
        title,
        subtitle: labels[category] ?? category,
        media,
      }
    },
  },
})
