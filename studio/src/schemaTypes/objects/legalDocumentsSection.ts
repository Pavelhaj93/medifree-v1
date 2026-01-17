import {defineType, defineField} from 'sanity'

export const legalDocumentsSection = defineType({
  name: 'legalDocumentsSection',
  title: 'Legal Documents Section',
  type: 'object',
  fields: [
    // Company Info
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Medifree s.r.o.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyDetails',
      title: 'Company Details',
      type: 'string',
      initialValue: 'IČO: 23153041 • Na Kotli 1176/29, Hradec Králové',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyEmail',
      title: 'Company Email',
      type: 'string',
      initialValue: 'info@medifree.cz',
      validation: (Rule) => Rule.required().email(),
    }),

    // Important Notice Section
    defineField({
      name: 'noticeTitle',
      title: 'Important Notice Title',
      type: 'string',
      initialValue: 'Důležité informace',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'noticeItems',
      title: 'Notice Items',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: [
        'Všechny dokumenty jsou platné od data uvedeného v každém dokumentu',
        'V případě nejasností nás kontaktujte na',
        'Dokumenty jsou pravidelně aktualizovány dle platné legislativy',
        'Pro zobrazení staženého dokumentu je potřeba mít nainstalovaný PDF prohlížeč (např. Adobe Acrobat Reader)',
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Contact Section
    defineField({
      name: 'contactTitle',
      title: 'Contact Section Title',
      type: 'string',
      initialValue: 'Potřebujete pomoc?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact Description',
      type: 'text',
      initialValue:
        'Máte-li jakékoliv dotazy k právním dokumentům nebo potřebujete vysvětlení, neváhejte nás kontaktovat.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactButtonText',
      title: 'Contact Button Text',
      type: 'string',
      initialValue: 'Kontaktujte nás',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Legal Documents Section',
        subtitle: 'Company info and legal documents display',
      }
    },
  },
})
