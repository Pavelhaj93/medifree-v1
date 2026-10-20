import {BasketIcon, CogIcon, PackageIcon, TagIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context']
const SHOP_TYPES = ['product', 'order', 'voucher']

const filteredList = (
  S: StructureBuilder,
  id: string,
  title: string,
  schemaType: string,
  filter: string,
  orderField: string,
) =>
  S.listItem()
    .id(id)
    .title(title)
    .schemaType(schemaType)
    .child(
      S.documentTypeList(schemaType)
        .title(title)
        .filter(filter)
        .apiVersion('2024-10-28')
        .defaultOrdering([{field: orderField, direction: 'desc'}]),
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
          S.documentTypeListItem('product').title('Produkty'),
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
