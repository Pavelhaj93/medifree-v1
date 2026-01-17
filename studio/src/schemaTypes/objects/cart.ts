import {defineType, defineField} from 'sanity'

export const cart = defineType({
  name: 'cart',
  title: 'Cart Section',
  type: 'object',
  fields: [
    // Page Header
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Košík',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Váš košík',
      validation: (Rule) => Rule.required(),
    }),

    // Empty Cart State
    defineField({
      name: 'emptyCartTitle',
      title: 'Empty Cart Title',
      type: 'string',
      initialValue: 'Váš košík je prázdný',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emptyCartDescription',
      title: 'Empty Cart Description',
      type: 'text',
      initialValue:
        'Vypadá to, že jste do svého košíku zatím nepřidali žádné položky. Prozkoumejte náš obchod a najděte digitální zdroje, které podpoří vaši cestu ke zdraví a duševní pohodě.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emptyCartButtonText',
      title: 'Empty Cart Button Text',
      type: 'string',
      initialValue: 'Prozkoumat obchod',
      validation: (Rule) => Rule.required(),
    }),

    // Cart Items Section
    defineField({
      name: 'cartItemsTitle',
      title: 'Cart Items Title',
      type: 'string',
      initialValue: 'Položek v košíku',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'removeButtonText',
      title: 'Remove Button Text',
      type: 'string',
      initialValue: 'Odstranit',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'continueShoppingText',
      title: 'Continue Shopping Text',
      type: 'string',
      initialValue: 'Pokračovat v nákupu',
      validation: (Rule) => Rule.required(),
    }),

    // Order Summary Section
    defineField({
      name: 'orderSummaryTitle',
      title: 'Order Summary Title',
      type: 'string',
      initialValue: 'Shrnutí objednávky',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtotalLabel',
      title: 'Subtotal Label',
      type: 'string',
      initialValue: 'Mezisoučet',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'taxLabel',
      title: 'Tax Label',
      type: 'string',
      initialValue: 'DPH (21%)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'totalLabel',
      title: 'Total Label',
      type: 'string',
      initialValue: 'Celkem',
      validation: (Rule) => Rule.required(),
    }),

    // Email & Checkout
    defineField({
      name: 'emailLabel',
      title: 'Email Field Label',
      type: 'string',
      initialValue: 'Email pro doručení ebooků *',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      initialValue: 'vas.email@priklad.cz',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailHelperText',
      title: 'Email Helper Text',
      type: 'string',
      initialValue: 'Na tento email Vám zašleme zakoupené ebooky',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'checkoutButtonText',
      title: 'Checkout Button Text',
      type: 'string',
      initialValue: 'Pokračovat k platbě',
      validation: (Rule) => Rule.required(),
    }),

    // Customer Support Section
    defineField({
      name: 'supportTitle',
      title: 'Support Section Title',
      type: 'string',
      initialValue: 'Potřebujete pomoc?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'supportDescription',
      title: 'Support Description',
      type: 'text',
      initialValue:
        'Pokud máte jakékoli dotazy nebo potřebujete pomoc s vaší objednávkou, neváhejte se obrátit na náš tým zákaznické podpory. Jsme tu, abychom vám pomohli!',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactButtonText',
      title: 'Contact Button Text',
      type: 'string',
      initialValue: 'Kontaktujte nás',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faqButtonText',
      title: 'FAQ Button Text',
      type: 'string',
      initialValue: 'Často kladené otázky',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'checkingOutText',
      title: 'Checking Out Text',
      type: 'string',
      initialValue: 'Přesměrovávání...',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'termsText',
      title: 'Terms & Conditions Text',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Cart Section',
        subtitle: 'Cart page content configuration',
      }
    },
  },
})
