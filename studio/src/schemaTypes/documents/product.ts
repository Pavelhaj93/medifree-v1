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
  title: 'Produkt',
  type: 'document',
  icon: BasketIcon,
  groups: [
    {name: 'main', title: 'Základ', default: true},
    {name: 'detail', title: 'Detail produktu'},
    {name: 'files', title: 'Soubory'},
    {name: 'voucher', title: 'Dárkový poukaz'},
    {name: 'variant', title: 'Příchuť / varianta'},
    {name: 'food', title: 'Potravina'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
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
      title: 'Kategorie',
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
      title: 'Hlavní obrázek',
      type: 'image',
      group: 'main',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativní text',
          description: 'Krátký popis obrázku – důležité pro SEO a přístupnost.',
        }),
      ],
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Cena (Kč)',
      type: 'number',
      group: 'main',
      description: 'Cena v Kč (Medifree není plátce DPH).',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Krátký popis',
      type: 'text',
      group: 'main',
      description: 'Krátký popis na kartičce v e-shopu.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stockStatus',
      title: 'Stav skladu',
      type: 'string',
      group: 'main',
      initialValue: 'in',
      options: {
        list: [
          {title: 'Skladem', value: 'in'},
          {title: 'Poslední kusy', value: 'low'},
          {title: 'Vyprodáno', value: 'out'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'Zobrazí se na webu jako semafor. Vyprodané zboží nejde objednat.',
      hidden: ({document}) => !isCategory(document as DocWithCategory, PHYSICAL),
    }),
    defineField({
      name: 'label',
      title: 'Štítek kategorie',
      type: 'string',
      group: 'main',
      description: 'Krátký štítek na detailu a kartě, např. „Sportovní výživa“. Prázdné = podle kategorie.',
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
          fields: [defineField({name: 'alt', type: 'string', title: 'Alternativní text'})],
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
      name: 'forWhom',
      title: 'Pro koho to je',
      type: 'array',
      group: 'detail',
      description: 'Komu produkt pomůže – tučný titulek a krátké vysvětlení.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'audience',
          title: 'Pro koho',
          fields: [
            defineField({name: 'title', title: 'Titulek (tučně)', type: 'string', description: 'Např. „Sportujícím“'}),
            defineField({name: 'text', title: 'Vysvětlení', type: 'string', description: 'Např. „jako doplnění bílkovin po tréninku“'}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
    }),
    defineField({
      name: 'notSuitableFor',
      title: 'Není vhodné',
      type: 'string',
      group: 'detail',
      description: 'Např. „při alergii na mléčnou bílkovinu. Při onemocnění ledvin se poraďte s lékařem.“',
    }),
    defineField({
      name: 'benefits',
      title: 'Co získáte',
      type: 'array',
      group: 'detail',
      description: 'Dlaždice s výrazným číslem nebo slovem nahoře.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'benefit',
          title: 'Přínos',
          fields: [
            defineField({name: 'highlight', title: 'Výrazný údaj', type: 'string', description: 'Např. „22 g“ nebo „14 dní“'}),
            defineField({name: 'title', title: 'Titulek', type: 'string', description: 'Např. „bílkovin v porci“'}),
            defineField({name: 'text', title: 'Popis', type: 'string'}),
          ],
          preview: {
            select: {highlight: 'highlight', title: 'title', subtitle: 'text'},
            prepare: ({highlight, title, subtitle}) => ({title: [highlight, title].filter(Boolean).join(' '), subtitle}),
          },
        }),
      ],
    }),
    defineField({
      name: 'variantGroup',
      title: 'Skupina příchutí',
      type: 'string',
      group: 'variant',
      description:
        'Stejný text u všech příchutí jednoho produktu (např. „Syrovátkový protein“). Na detailu se pak zobrazí přepínač příchutí a v e-shopu jedna karta.',
      hidden: ({document}) => !isCategory(document as DocWithCategory, PHYSICAL),
    }),
    defineField({
      name: 'variantLabel',
      title: 'Název příchutě / varianty',
      type: 'string',
      group: 'variant',
      description: 'Např. „Čokoláda“, „Vanilka“, „Bez příchutě“.',
      hidden: ({document}) => !isCategory(document as DocWithCategory, PHYSICAL),
      validation: (Rule) =>
        Rule.custom((value, ctx) =>
          (ctx.document as {variantGroup?: string})?.variantGroup && !value
            ? 'Vyplňte název příchutě, když je produkt ve skupině'
            : true,
        ),
    }),
    defineField({
      name: 'packLabel',
      title: 'Balení',
      type: 'string',
      group: 'variant',
      description: 'Např. „500 g“ nebo „1 kg“. Každá kombinace příchuť × balení je samostatný produkt ve stejné skupině.',
      hidden: ({document}) => !isCategory(document as DocWithCategory, PHYSICAL),
    }),
    defineField({
      name: 'variantColor',
      title: 'Barva příchutě',
      type: 'string',
      group: 'variant',
      description: 'Barevná tečka u příchutě na webu.',
      options: {
        list: [
          {title: 'Čokoládová', value: '#6b4423'},
          {title: 'Vanilková', value: '#f3dc8a'},
          {title: 'Karamelová', value: '#c98a3b'},
          {title: 'Jahodová', value: '#e46b7a'},
          {title: 'Banánová', value: '#f5e27a'},
          {title: 'Kokosová', value: '#efe7da'},
          {title: 'Pistáciová', value: '#a8c686'},
          {title: 'Kávová', value: '#8a5a3c'},
          {title: 'Bílá / bez příchutě', value: '#ffffff'},
        ],
      },
      hidden: ({document}) => !isCategory(document as DocWithCategory, PHYSICAL),
    }),
    defineField({
      name: 'netWeight',
      title: 'Čisté množství (g)',
      type: 'number',
      group: 'variant',
      description: 'Pro výpočet ceny za 100 g.',
      hidden: ({document}) => !isCategory(document as DocWithCategory, PHYSICAL),
    }),
    defineField({
      name: 'servings',
      title: 'Počet porcí v balení',
      type: 'number',
      group: 'variant',
      hidden: ({document}) => !isCategory(document as DocWithCategory, PHYSICAL),
    }),
    defineField({
      name: 'foodInfo',
      title: 'Informace o potravině',
      type: 'object',
      group: 'food',
      description:
        'Povinné údaje u potravin a doplňků stravy – musí být na webu před nákupem. Opište z etikety od výrobce.',
      hidden: ({document}) => !isCategory(document as DocWithCategory, PHYSICAL),
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'enabled',
          title: 'Produkt je potravina nebo doplněk stravy',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'isSupplement',
          title: 'Doplněk stravy',
          type: 'boolean',
          initialValue: false,
          description: 'Na webu se doplní povinná upozornění pro doplňky stravy.',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'ingredients',
          title: 'Složení',
          type: 'array',
          description: 'Alergeny označte tučně (Ctrl/Cmd + B).',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{title: 'Odstavec', value: 'normal'}],
              lists: [],
              marks: {decorators: [{title: 'Tučně', value: 'strong'}], annotations: []},
            }),
          ],
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'allergens',
          title: 'Alergeny (souhrn)',
          type: 'string',
          description: 'Např. „Alergeny: mléko. Může obsahovat stopy sóji.“',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'servingSize',
          title: 'Velikost porce',
          type: 'string',
          description: 'Např. „30 g“.',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'nutrition',
          title: 'Nutriční hodnoty',
          type: 'array',
          hidden: ({parent}) => !parent?.enabled,
          initialValue: [
            'Energetická hodnota',
            'Tuky',
            'z toho nasycené mastné kyseliny',
            'Sacharidy',
            'z toho cukry',
            'Bílkoviny',
            'Sůl',
          ].map((label, i) => ({_type: 'nutritionRow', _key: `row${i}`, label})),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'nutritionRow',
              title: 'Řádek',
              fields: [
                defineField({name: 'label', title: 'Položka', type: 'string'}),
                defineField({name: 'per100', title: 'Na 100 g', type: 'string', description: 'Např. „1 600 kJ / 380 kcal“ nebo „75 g“.'}),
                defineField({name: 'perServing', title: 'Na porci', type: 'string'}),
              ],
              preview: {
                select: {title: 'label', per100: 'per100', perServing: 'perServing'},
                prepare: ({title, per100, perServing}) => ({
                  title,
                  subtitle: [per100, perServing].filter(Boolean).join(' · '),
                }),
              },
            }),
          ],
        }),
        defineField({
          name: 'usage',
          title: 'Doporučené dávkování a příprava',
          type: 'text',
          rows: 3,
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'storage',
          title: 'Skladování',
          type: 'string',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'producer',
          title: 'Výrobce / distributor a adresa',
          type: 'text',
          rows: 2,
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'bestBefore',
          title: 'Minimální trvanlivost',
          type: 'string',
          description: 'Např. „Uvedena na spodní straně balení.“',
          hidden: ({parent}) => !parent?.enabled,
        }),
        defineField({
          name: 'origin',
          title: 'Země původu',
          type: 'string',
          hidden: ({parent}) => !parent?.enabled,
        }),
      ],
    }),
    defineField({
      name: 'ebookFile',
      title: 'Soubor e-booku',
      type: 'file',
      group: 'files',
      description:
        'Soubor (PDF, EPUB…), který zákazník dostane e-mailem po zaplacení.',
      options: {
        accept: '.pdf,.epub,.mobi',
      },
      hidden: ({document}) =>
        document?.category !== 'Ebooky' && document?.category !== 'Ebook + Audio',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio soubor',
      type: 'file',
      group: 'files',
      description: 'Audio, které zákazník dostane e-mailem po zaplacení.',
      options: {
        accept: 'audio/*',
      },
      hidden: ({document}) =>
        document?.category !== 'Audionahrávky' && document?.category !== 'Ebook + Audio',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video soubor',
      type: 'file',
      group: 'files',
      description: 'Video, které zákazník dostane e-mailem po zaplacení.',
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
      description: 'Cena bez slevy – na webu se zobrazí jako přeškrtnutá.',
      hidden: ({document}) => document?.category !== 'Balíčky',
    }),
    defineField({
      name: 'bundleItems',
      title: 'Produkty v balíčku',
      type: 'array',
      group: 'main',
      description: 'Produkty, které balíček obsahuje (alespoň 2).',
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
      title: 'Doporučený produkt',
      description: 'Zobrazí se zvýrazněně nad seznamem produktů. Doporučený může být jen jeden.',
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
            return 'Doporučený může být jen jeden produkt. Nejdřív to vypněte u druhého.'
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
