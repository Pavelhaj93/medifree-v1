import {BasketIcon, CogIcon, PackageIcon, TagIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'
import {PRODUCT_CATEGORIES} from '../schemaTypes/templates'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context']
const SHOP_TYPES = ['product', 'material', 'order', 'voucher']

const filteredList = (
  S: StructureBuilder,
  id: string,
  title: string,
  schemaType: string,
  filter: string,
  orderField: string,
  options: {
    params?: Record<string, string>
    direction?: 'asc' | 'desc'
    templates?: ReturnType<StructureBuilder['initialValueTemplateItem']>[]
  } = {},
) =>
  S.listItem()
    .id(id)
    .title(title)
    .schemaType(schemaType)
    .child(() => {
      let list = S.documentTypeList(schemaType)
        .title(title)
        .filter(filter)
        .params(options.params ?? {})
        .apiVersion('2024-10-28')
        .defaultOrdering([{field: orderField, direction: options.direction ?? 'desc'}])
      if (options.templates) list = list.initialValueTemplates(options.templates)
      return list
    })

const products = (S: StructureBuilder) =>
  S.listItem()
    .id('products')
    .title('Produkty')
    .icon(BasketIcon)
    .child(
      S.list()
        .title('Produkty')
        .items([
          S.documentTypeListItem('product').title('Všechny produkty'),
          S.divider(),
          ...PRODUCT_CATEGORIES.map((category, i) =>
            filteredList(
              S,
              `products-category-${i}`,
              category,
              'product',
              '_type == "product" && category == $category',
              'title',
              {
                params: {category},
                direction: 'asc',
                templates: [S.initialValueTemplateItem('product-by-category', {category})],
              },
            ),
          ),
          S.divider(),
          filteredList(S, 'products-uncategorized', 'Bez kategorie', 'product', '_type == "product" && !defined(category)', 'title', {
            direction: 'asc',
          }),
        ]),
    )

const shop = (S: StructureBuilder) =>
  S.listItem()
    .id('eshop')
    .title('E-shop')
    .icon(BasketIcon)
    .child(
      S.list()
        .title('E-shop')
        .items([
          products(S),
          S.documentTypeListItem('material').title('Materiály po zaplacení'),
          S.listItem()
            .id('orders')
            .title('Objednávky')
            .icon(PackageIcon)
            .child(
              S.list()
                .title('Objednávky')
                .items([
                  filteredList(S, 'orders-new', 'Nové', 'order', '_type == "order" && livemode == true && status == "new"', 'createdAt'),
                  filteredList(S, 'orders-shipped', 'Odeslané', 'order', '_type == "order" && livemode == true && status == "shipped"', 'createdAt'),
                  filteredList(S, 'orders-all', 'Všechny', 'order', '_type == "order" && livemode == true', 'createdAt'),
                  S.divider(),
                  filteredList(S, 'orders-test', 'Testovací', 'order', '_type == "order" && livemode != true', 'createdAt'),
                ]),
            ),
          S.listItem()
            .id('vouchers')
            .title('Dárkové poukazy')
            .icon(TagIcon)
            .child(
              S.list()
                .title('Dárkové poukazy')
                .items([
                  filteredList(S, 'vouchers-valid', 'Platné', 'voucher', '_type == "voucher" && livemode == true && status == "valid" && validUntil >= string::split(now(), "T")[0]', 'purchasedAt'),
                  filteredList(S, 'vouchers-redeemed', 'Uplatněné', 'voucher', '_type == "voucher" && livemode == true && status == "redeemed"', 'purchasedAt'),
                  filteredList(S, 'vouchers-expired', 'Propadlé', 'voucher', '_type == "voucher" && livemode == true && status == "valid" && validUntil < string::split(now(), "T")[0]', 'purchasedAt'),
                  filteredList(S, 'vouchers-all', 'Všechny', 'voucher', '_type == "voucher" && livemode == true', 'purchasedAt'),
                  S.divider(),
                  filteredList(S, 'vouchers-test', 'Testovací', 'voucher', '_type == "voucher" && livemode != true', 'purchasedAt'),
                ]),
            ),
        ]),
    )

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      shop(S),
      S.divider(),
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        .filter((listItem: any) => !SHOP_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      // Separator before settings
      S.divider(),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
