import {defineArrayMember, defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const ORDER_STATUSES = [
  {title: 'Nová', value: 'new'},
  {title: 'Odesláno', value: 'shipped'},
  {title: 'Vyřízeno', value: 'completed'},
  {title: 'Zrušeno', value: 'cancelled'},
]

const statusTitle = (value?: string) =>
  ORDER_STATUSES.find((s) => s.value === value)?.title ?? value ?? ''

export const order = defineType({
  name: 'order',
  title: 'Objednávka',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Číslo objednávky',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Stav',
      type: 'string',
      initialValue: 'new',
      options: {list: ORDER_STATUSES, layout: 'radio', direction: 'horizontal'},
    }),
    defineField({
      name: 'createdAt',
      title: 'Vytvořeno',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'shippedAt',
      title: 'Odesláno dne',
      type: 'datetime',
      hidden: ({document}) => !document?.shippedAt,
    }),
    defineField({
      name: 'customer',
      title: 'Zákazník',
      type: 'object',
      readOnly: true,
      fields: [
        defineField({name: 'name', title: 'Jméno', type: 'string'}),
        defineField({name: 'email', title: 'E-mail', type: 'string'}),
        defineField({name: 'phone', title: 'Telefon', type: 'string'}),
      ],
    }),
    defineField({
      name: 'shipping',
      title: 'Doprava',
      type: 'object',
      readOnly: true,
      hidden: ({document}) => !(document?.shipping as {method?: string} | undefined)?.method,
      fields: [
        defineField({name: 'method', title: 'Způsob', type: 'string'}),
        defineField({name: 'price', title: 'Cena (Kč)', type: 'number'}),
        defineField({name: 'packetaPointId', title: 'ID výdejního místa', type: 'string'}),
        defineField({name: 'packetaPointName', title: 'Výdejní místo', type: 'string'}),
        defineField({name: 'packetaPointAddress', title: 'Adresa výdejního místa', type: 'string'}),
      ],
    }),
    defineField({
      name: 'items',
      title: 'Položky',
      type: 'array',
      readOnly: true,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'orderItem',
          fields: [
            defineField({name: 'product', title: 'Produkt', type: 'reference', to: [{type: 'product'}], weak: true}),
            defineField({name: 'title', title: 'Název', type: 'string'}),
            defineField({
              name: 'kind',
              title: 'Typ',
              type: 'string',
              options: {
                list: [
                  {title: 'Digitální', value: 'digital'},
                  {title: 'Fyzický', value: 'physical'},
                  {title: 'Dárkový poukaz', value: 'voucher'},
                ],
              },
            }),
            defineField({name: 'quantity', title: 'Počet', type: 'number'}),
            defineField({name: 'unitPrice', title: 'Cena za kus (Kč)', type: 'number'}),
          ],
          preview: {
            select: {title: 'title', quantity: 'quantity', unitPrice: 'unitPrice'},
            prepare: ({title, quantity, unitPrice}) => ({
              title: `${quantity ?? 1}× ${title}`,
              subtitle: unitPrice != null ? `${unitPrice} Kč / ks` : undefined,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'total',
      title: 'Celkem (Kč)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'note',
      title: 'Interní poznámka',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'stripeSessionId',
      title: 'Stripe session',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'livemode',
      title: 'Ostrá objednávka',
      type: 'boolean',
      readOnly: true,
      description: 'Vypnuto = testovací platba ze Stripe test mode.',
    }),
    defineField({
      name: 'emailsSentAt',
      title: 'E-maily odeslány',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  orderings: [
    {title: 'Nejnovější', name: 'createdAtDesc', by: [{field: 'createdAt', direction: 'desc'}]},
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      name: 'customer.name',
      email: 'customer.email',
      status: 'status',
      total: 'total',
      createdAt: 'createdAt',
    },
    prepare({orderNumber, name, email, status, total, createdAt}) {
      const date = createdAt ? new Date(createdAt).toLocaleDateString('cs-CZ') : ''
      return {
        title: `#${orderNumber ?? '?'} – ${name || email || 'bez jména'}`,
        subtitle: [statusTitle(status), total != null ? `${total} Kč` : null, date]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
