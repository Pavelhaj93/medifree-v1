import {defineType, defineField} from 'sanity'

export const checkoutSuccess = defineType({
  name: 'checkoutSuccess',
  title: 'Checkout Success Section',
  type: 'object',
  fields: [
    // Success Message
    defineField({
      name: 'successTitle',
      title: 'Success Title',
      type: 'string',
      initialValue: 'Platba byla úspěšná!',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'successDescription',
      title: 'Success Description',
      type: 'text',
      initialValue: 'Děkujeme za váš nákup. Vaše objednávka byla úspěšně zpracována.',
      validation: (Rule) => Rule.required(),
    }),

    // Ebook Delivery Info
    defineField({
      name: 'deliveryTitle',
      title: 'Delivery Info Title',
      type: 'string',
      initialValue: 'Doručení ebooků',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deliveryDescription',
      title: 'Delivery Description',
      type: 'text',
      initialValue:
        'Zakoupené ebooky vám byly odeslány na váš email. Pokud email nevidíte, zkontrolujte složku spam.',
      validation: (Rule) => Rule.required(),
    }),

    // Physical goods + voucher delivery info (shown based on what was in the order)
    defineField({
      name: 'physicalDeliveryTitle',
      title: 'Nadpis – doručení zásilky',
      type: 'string',
      initialValue: 'Doručení zásilky',
    }),
    defineField({
      name: 'physicalDeliveryDescription',
      title: 'Text – doručení zásilky',
      type: 'text',
      initialValue:
        'Potvrzení objednávky jsme vám poslali e-mailem. Jakmile zásilku předáme Zásilkovně, přijde vám od ní e-mail se sledováním zásilky.',
    }),
    defineField({
      name: 'voucherDeliveryTitle',
      title: 'Nadpis – dárkový poukaz',
      type: 'string',
      initialValue: 'Dárkový poukaz',
    }),
    defineField({
      name: 'voucherDeliveryDescription',
      title: 'Text – dárkový poukaz',
      type: 'text',
      initialValue:
        'Dárkový poukaz s unikátním kódem vám přišel e-mailem jako PDF. Můžete ho vytisknout nebo poslat obdarovanému.',
    }),

    // Order Details
    defineField({
      name: 'orderNumberLabel',
      title: 'Order Number Label',
      type: 'string',
      initialValue: 'Číslo objednávky:',
      validation: (Rule) => Rule.required(),
    }),

    // Action Buttons
    defineField({
      name: 'continueShoppingText',
      title: 'Continue Shopping Button',
      type: 'string',
      initialValue: 'Pokračovat v nákupu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'homeButtonText',
      title: 'Home Button Text',
      type: 'string',
      initialValue: 'Zpět na hlavní stránku',
      validation: (Rule) => Rule.required(),
    }),

    // Support Section
    defineField({
      name: 'supportText',
      title: 'Support Question Text',
      type: 'string',
      initialValue: 'Máte problémy s objednávkou?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactLinkText',
      title: 'Contact Link Text',
      type: 'string',
      initialValue: 'Kontaktujte nás',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Checkout Success Section',
        subtitle: 'Success page configuration',
      }
    },
  },
})
