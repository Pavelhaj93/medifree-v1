import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import * as demo from '../../lib/initialValues'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      description: 'Used both for the <meta> description tag for SEO, and the blog subheader.',
      title: 'Description',
      type: 'array',
      initialValue: demo.description,
      of: [
        // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: 'object',
                name: 'link',
                fields: [
                  {
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
    defineField({
      name: 'company',
      title: 'Firma (patička webu)',
      type: 'object',
      description: 'Údaje o provozovateli – podnikatel je musí mít na webu uvedené.',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'name', title: 'Název firmy', type: 'string', initialValue: 'Medifree s.r.o.'}),
        defineField({
          name: 'address',
          title: 'Sídlo',
          type: 'string',
          initialValue: 'Čistá v Krkonoších e. č. 52, 543 44 Černý Důl',
        }),
        defineField({name: 'ico', title: 'IČO', type: 'string', initialValue: '23153041'}),
        defineField({name: 'email', title: 'E-mail', type: 'string', initialValue: 'info@medifree.cz'}),
        defineField({name: 'phone', title: 'Telefon', type: 'string', description: 'Nepovinné.'}),
        defineField({
          name: 'instagram',
          title: 'Instagram (odkaz)',
          type: 'url',
          initialValue: 'https://www.instagram.com/medifreecz',
        }),
        defineField({
          name: 'registry',
          title: 'Zápis v rejstříku',
          type: 'string',
          description: 'Např. „Spisová značka C 12345 vedená u Krajského soudu v Hradci Králové“.',
        }),
      ],
    }),
    defineField({
      name: 'shop',
      title: 'E-shop',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'dispatchTime',
          title: 'Lhůta odeslání fyzického zboží',
          type: 'string',
          initialValue: 'Odesíláme do 10 pracovních dnů',
          description: 'Zobrazí se na detailu produktu, v košíku a v potvrzení objednávky.',
        }),
        defineField({
          name: 'packetaLabel',
          title: 'Název dopravy',
          type: 'string',
          initialValue: 'Zásilkovna – výdejní místo nebo Z-BOX',
        }),
        defineField({
          name: 'packetaPrice',
          title: 'Cena dopravy Zásilkovnou (Kč)',
          type: 'number',
          initialValue: 89,
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: 'pickupEnabled',
          title: 'Nabízet osobní odběr',
          type: 'boolean',
          initialValue: true,
          description: 'Osobní odběr je zdarma. V košíku si zákazník vybere mezi Zásilkovnou a osobním odběrem.',
        }),
        defineField({
          name: 'pickupLabel',
          title: 'Název osobního odběru',
          type: 'string',
          initialValue: 'Osobní odběr – Krkonoše',
          hidden: ({parent}) => !parent?.pickupEnabled,
        }),
        defineField({
          name: 'pickupAddress',
          title: 'Adresa osobního odběru',
          type: 'string',
          initialValue: 'Čistá v Krkonoších e. č. 52, 543 44 Černý Důl',
          hidden: ({parent}) => !parent?.pickupEnabled,
        }),
        defineField({
          name: 'pickupInfo',
          title: 'Jak probíhá vyzvednutí',
          type: 'text',
          rows: 2,
          initialValue: 'Vyzvednutí je po domluvě. Až bude objednávka připravená, ozveme se vám e-mailem nebo telefonem.',
          description: 'Zobrazí se v košíku a v potvrzení objednávky.',
          hidden: ({parent}) => !parent?.pickupEnabled,
        }),
        defineField({
          name: 'voucherRedeemInfo',
          title: 'Jak uplatnit dárkový poukaz',
          type: 'text',
          rows: 3,
          initialValue:
            'Poukaz uplatníte tak, že nás kontaktujete na info@medifree.cz nebo přes rezervaci na webu a sdělíte kód z poukazu.',
          description: 'Text do e-mailu s poukazem.',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
