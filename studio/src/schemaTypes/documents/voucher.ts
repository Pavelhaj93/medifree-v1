import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const voucher = defineType({
  name: 'voucher',
  title: 'Dárkový poukaz',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Kód',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Stav',
      type: 'string',
      initialValue: 'valid',
      options: {
        list: [
          {title: 'Platný', value: 'valid'},
          {title: 'Uplatněný', value: 'redeemed'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'validUntil',
      title: 'Platný do',
      type: 'date',
      readOnly: true,
    }),
    defineField({
      name: 'redeemedAt',
      title: 'Uplatněno dne',
      type: 'datetime',
      hidden: ({document}) => !document?.redeemedAt,
    }),
    defineField({
      name: 'title',
      title: 'Poukaz',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'product',
      title: 'Produkt',
      type: 'reference',
      to: [{type: 'product'}],
      weak: true,
      readOnly: true,
    }),
    defineField({
      name: 'dedication',
      title: 'Věnování',
      type: 'text',
      rows: 2,
      readOnly: true,
    }),
    defineField({
      name: 'buyerName',
      title: 'Kupující',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'buyerEmail',
      title: 'E-mail kupujícího',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'order',
      title: 'Objednávka',
      type: 'reference',
      to: [{type: 'order'}],
      weak: true,
      readOnly: true,
    }),
    defineField({
      name: 'purchasedAt',
      title: 'Zakoupeno',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'livemode',
      title: 'Ostrý poukaz',
      type: 'boolean',
      readOnly: true,
      description: 'Vypnuto = testovací platba ze Stripe test mode.',
    }),
    defineField({
      name: 'note',
      title: 'Interní poznámka',
      type: 'text',
      rows: 3,
      description: 'Např. kdy a s kým proběhla konzultace.',
    }),
  ],
  orderings: [
    {title: 'Nejnovější', name: 'purchasedAtDesc', by: [{field: 'purchasedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {code: 'code', status: 'status', validUntil: 'validUntil', buyerName: 'buyerName'},
    prepare({code, status, validUntil, buyerName}) {
      const expired = status === 'valid' && validUntil && validUntil < new Date().toISOString().slice(0, 10)
      const state = status === 'redeemed' ? 'Uplatněný' : expired ? 'Propadlý' : 'Platný'
      const until = validUntil ? `do ${new Date(validUntil).toLocaleDateString('cs-CZ')}` : ''
      return {title: code, subtitle: [state, until, buyerName].filter(Boolean).join(' · ')}
    },
  },
})
