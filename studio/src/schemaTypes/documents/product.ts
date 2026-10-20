import {defineArrayMember, defineField, defineType} from 'sanity'
import {BasketIcon} from '@sanity/icons'

const DIGITAL_FILE_CATEGORIES = ['Ebooky', 'Audionahrávky', 'Video kurzy', 'Ebook + Audio']
const PHYSICAL = 'Fyzické produkty'
const VOUCHER = 'Dárkové poukazy'

type DocWithCategory = {category?: string} | undefined
const isCategory = (document: DocWithCategory, ...categories: string[]) =>
  categories.includes(document?.category ?? '')

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  groups: [
    {name: 'main', title: 'Základ', default: true},
    {name: 'detail', title: 'Detail produktu'},
    {name: 'files', title: 'Soubory'},
    {name: 'voucher', title: 'Dárkový poukaz'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      group: 'main',
      description: 'Adresa detailu produktu: /e-shop/<slug>. Vygenerujte tlačítkem „Generate“.',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) =>
        Rule.custom((slug, ctx) => {
          if (isCategory(ctx.document as DocWithCategory, PHYSICAL, VOUCHER) && !slug?.current) {
            return 'Fyzický produkt a poukaz musí mít URL (slug)'
          }
          return true
        }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Ebooky', value: 'Ebooky'},
          {title: 'Audionahrávky', value: 'Audionahrávky'},
          {title: 'Video kurzy', value: 'Video kurzy'},
          {title: 'Ebook + Audio', value: 'Ebook + Audio'},
          {title: 'Balíčky', value: 'Balíčky'},
          {title: 'Fyzické produkty', value: PHYSICAL},
          {title: 'Dárkové poukazy', value: VOUCHER},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'main',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Base price',
      type: 'number',
      group: 'main',
      description: 'Cena v Kč (Medifree není plátce DPH).',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'main',
      description: 'Krátký popis na kartičce v e-shopu.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isAvailable',
      title: 'Skladem',
      type: 'boolean',
      group: 'main',
      initialValue: true,
      description: 'Vypněte, pokud produkt momentálně nejde objednat.',
      hidden: ({document}) => !isCategory(document as DocWithCategory, PHYSICAL),
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie',
      type: 'array',
      group: 'detail',
      description: 'Další fotky na detailu produktu (hlavní obrázek se zobrazí jako první).',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Podrobný popis',
      type: 'blockContent',
      group: 'detail',
      description: 'Text na detailu produktu (složení, použití, co balíček obsahuje…).',
    }),
    defineField({
      name: 'ebookFile',
      title: 'Ebook File',
      type: 'file',
      group: 'files',
      description:
        'Upload the ebook file (PDF, EPUB, etc.) that will be sent to customers after purchase',
      options: {
        accept: '.pdf,.epub,.mobi',
      },
      hidden: ({document}) =>
        document?.category !== 'Ebooky' && document?.category !== 'Ebook + Audio',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio súbor',
      type: 'file',
      group: 'files',
      description: 'Upload the audio file that will be sent to customers after purchase',
      options: {
        accept: 'audio/*',
      },
      hidden: ({document}) =>
        document?.category !== 'Audionahrávky' && document?.category !== 'Ebook + Audio',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video súbor',
      type: 'file',
      group: 'files',
      description: 'Upload the video file that will be sent to customers after purchase',
      options: {
        accept: 'video/*',
      },
      hidden: ({document}) => document?.category !== 'Video kurzy',
    }),
    defineField({
      name: 'originalPrice',
      title: 'Původní cena bez slevy',
      type: 'number',
      group: 'main',
      description: 'Full price before bundle discount — used to display savings',
      hidden: ({document}) => document?.category !== 'Balíčky',
    }),
    defineField({
      name: 'bundleItems',
      title: 'Produkty v balíčku',
      type: 'array',
      group: 'main',
      description: 'Select the individual products included in this bundle (min. 2)',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      hidden: ({document}) => document?.category !== 'Balíčky',
      validation: (Rule) =>
        Rule.custom((items, ctx) => {
          if (ctx.document?.category === 'Balíčky' && (!items || (items as unknown[]).length < 2)) {
            return 'Balíček musí obsahovat alespoň 2 produkty'
          }
          return true
        }),
    }),
    defineField({
      name: 'voucherValidityMonths',
      title: 'Platnost poukazu (měsíce)',
      type: 'number',
      group: 'voucher',
      initialValue: 12,
      hidden: ({document}) => !isCategory(document as DocWithCategory, VOUCHER),
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          if (isCategory(ctx.document as DocWithCategory, VOUCHER) && (!value || value < 1)) {
            return 'Zadejte platnost poukazu v měsících'
          }
          return true
        }),
    }),
    defineField({
      name: 'voucherIncludes',
      title: 'Co poukaz obsahuje',
      type: 'text',
      rows: 5,
      group: 'voucher',
      description: 'Vytiskne se na poukaz a zobrazí na detailu. Každý řádek = jedna odrážka.',
      hidden: ({document}) => !isCategory(document as DocWithCategory, VOUCHER),
    }),
    defineField({
      name: 'voucherBackground',
      title: 'Pozadí poukazu',
      type: 'image',
      group: 'voucher',
      description:
        'Obrázek na šířku (A5, ideálně 2480 × 1748 px). Text se tiskne vpravo – nechte tam klidnou plochu. Bez obrázku se použije barevné pozadí Medifree.',
      hidden: ({document}) => !isCategory(document as DocWithCategory, VOUCHER),
    }),
    defineField({
      name: 'voucherGuides',
      title: 'Průvodci posílaní s poukazem',
      type: 'array',
      group: 'voucher',
      description: 'E-booky/audio, které kupující dostane e-mailem spolu s poukazem.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}],
          options: {filter: 'category in $categories', filterParams: {categories: DIGITAL_FILE_CATEGORIES}},
        }),
      ],
      hidden: ({document}) => !isCategory(document as DocWithCategory, VOUCHER),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'main',
      initialValue: false,
      // only one product can be featured
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true

          const {getClient} = context
          const client = getClient({apiVersion: '2023-01-01'})
          const otherFeatured = await client.fetch(
            `*[_type == "product" && featured == true && _id != $id][0]._id`,
            {id: context?.document?._id},
          )

          if (otherFeatured) {
            return 'Only one product can be featured at a time. Unfeature the other product first.'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {title: 'title', category: 'category', price: 'price', media: 'image'},
    prepare({title, category, price, media}) {
      return {title, subtitle: [category, price != null ? `${price} Kč` : null].filter(Boolean).join(' · '), media}
    },
  },
})
