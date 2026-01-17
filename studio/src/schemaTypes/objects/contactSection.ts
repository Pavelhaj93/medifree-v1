import {defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'bgColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Light Gray', value: 'lightGray'},
        ],
      },
      initialValue: 'lightGray',
    }),

    // Form Section
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      initialValue: 'Napište nám',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameLabel',
      title: 'Name Field Label',
      type: 'string',
      initialValue: 'Jméno a příjmení',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'namePlaceholder',
      title: 'Name Placeholder',
      type: 'string',
      initialValue: 'Vaše jméno',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email Field Label',
      type: 'string',
      initialValue: 'Email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      initialValue: 'Váš email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'messageLabel',
      title: 'Message Field Label',
      type: 'string',
      initialValue: 'Zpráva',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'messagePlaceholder',
      title: 'Message Placeholder',
      type: 'string',
      initialValue: 'S čím vám můžeme pomoci?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'termsText',
      title: 'Terms Agreement Text',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Odeslat zprávu',
      validation: (Rule) => Rule.required(),
    }),

    // Contact Information Section
    defineField({
      name: 'infoTitle',
      title: 'Contact Info Title',
      type: 'string',
      initialValue: 'Kontaktní informace',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'infoDescription',
      title: 'Contact Info Description',
      type: 'text',
      initialValue:
        'Jsme tu pro vás. Neváhejte nás kontaktovat s jakýmikoli dotazy. Naš tým je připraven vám pomoci.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyLabel',
      title: 'Company Label',
      type: 'string',
      initialValue: 'Firma',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyText',
      title: 'Company Text',
      type: 'string',
      initialValue: 'Medifree s.r.o. - Na Kotli 1176/29, 500 09 Hradec Králové',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vatLabel',
      title: 'VAT Number Label',
      type: 'string',
      initialValue: 'IČO',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vatNumber',
      title: 'VAT Number',
      type: 'string',
      initialValue: '23153041',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailContactLabel',
      title: 'Email Contact Label',
      type: 'string',
      initialValue: 'Email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailContactText',
      title: 'Email Contact',
      type: 'string',
      initialValue: 'info@medifree.cz',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'instagramLabel',
      title: 'Instagram Label',
      type: 'string',
      initialValue: 'Instagram',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instagramLink1Text',
      title: 'Instagram Link 1 Text',
      type: 'string',
      initialValue: '@medifreecz',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instagramLink1Url',
      title: 'Instagram Link 1 URL',
      type: 'url',
      initialValue: 'https://www.instagram.com/medifreecz',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instagramLink2Text',
      title: 'Instagram Link 2 Text',
      type: 'string',
      initialValue: '@michaela_medifree',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instagramLink2Url',
      title: 'Instagram Link 2 URL',
      type: 'url',
      initialValue: 'https://www.instagram.com/michaela_medifree',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'workingHoursLabel',
      title: 'Working Hours Label',
      type: 'string',
      initialValue: 'Pracovní doba',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'workingHoursText',
      title: 'Working Hours Text',
      type: 'string',
      initialValue: 'Dle domluvy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookButtonLabel',
      title: 'Book Appointment Button Label',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Section',
        subtitle: 'Contact form and company information',
      }
    },
  },
})
