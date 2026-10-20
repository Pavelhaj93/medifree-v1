/**
 * Fills a sandbox dataset with sample e-shop data for demos and local testing:
 * shop settings, 3 physical products, 1 gift voucher. Re-runnable (fixed _ids, prefix "seed-").
 *
 * Run:    npx sanity exec scripts/seed-test-shop.ts --with-user-token -- --dataset production
 * Remove: npx sanity exec scripts/seed-test-shop.ts --with-user-token -- --dataset production --remove
 */
import {getCliClient} from 'sanity/cli'

// The live site reads this dataset (until the planned switch): never seed demo data into it.
const LIVE_DATASET = 'test'

const datasetArg = process.argv.indexOf('--dataset')
const DATASET = datasetArg > -1 ? process.argv[datasetArg + 1] : undefined
const client = getCliClient({apiVersion: '2024-10-28'}).withConfig({dataset: DATASET})
const remove = process.argv.includes('--remove')

const block = (text: string, key: string) => ({
  _type: 'block',
  _key: key,
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: `${key}s`, text, marks: []}],
})

const image = (ref: string, key?: string) => ({
  _type: 'image',
  ...(key ? {_key: key} : {}),
  asset: {_type: 'reference', _ref: ref},
})

async function run() {
  if (!DATASET) throw new Error('Pass the target dataset: -- --dataset <name>')
  if (DATASET === LIVE_DATASET && !remove) {
    throw new Error(`"${DATASET}" is the live dataset – refusing to add demo data`)
  }

  const seeded = await client.fetch<string[]>(`*[_id match "seed-*"]._id`)
  if (remove) {
    const tx = client.transaction()
    seeded.forEach((id) => tx.delete(id))
    await tx.commit()
    console.log(`Removed ${seeded.length} seeded documents from "${DATASET}".`)
    return
  }

  // Reuse images already in the dataset so we don't upload anything.
  const ebooks = await client.fetch<{_id: string; title: string; img: string}[]>(
    `*[_type == "product" && category == "Ebooky" && defined(image.asset)]{_id, title, "img": image.asset._ref}`,
  )
  if (ebooks.length === 0) throw new Error('No e-book with an image found to reuse')
  const img = (i: number) => ebooks[i % ebooks.length].img
  const cgmGuide = ebooks.find((e) => /glyk/i.test(e.title)) ?? ebooks[0]

  const tx = client.transaction()

  tx.createIfNotExists({_id: 'siteSettings', _type: 'settings', title: 'Medifree'})
  tx.patch('siteSettings', (p) =>
    p.setIfMissing({
      shop: {
        dispatchTime: 'Odesíláme do 10 pracovních dnů',
        packetaLabel: 'Zásilkovna – výdejní místo nebo Z-BOX',
        packetaPrice: 89,
        voucherRedeemInfo:
          'Poukaz uplatníte tak, že nás kontaktujete na info@medifree.cz nebo přes rezervaci na webu a sdělíte kód z poukazu.',
      },
    }),
  )

  tx.createOrReplace({
    _id: 'seed-physical-cgm-bundle',
    _type: 'product',
    title: 'Balíček senzor + průvodce (TEST)',
    slug: {_type: 'slug', current: 'test-balicek-senzor-pruvodce'},
    category: 'Fyzické produkty',
    price: 2490,
    isAvailable: true,
    description: 'Senzor pro kontinuální monitoraci glykémie a náš průvodce jeho využitím. Testovací produkt.',
    image: image(img(0)),
    gallery: [image(img(1), 'g1'), image(img(2), 'g2')],
    body: [
      block('Balíček obsahuje senzor na 14 dní a tištěného průvodce, jak z naměřených dat vyčíst co nejvíc.', 'b1'),
      block('Testovací produkt pro lokální ověření e-shopu – ne pro prodej.', 'b2'),
    ],
  })

  tx.createOrReplace({
    _id: 'seed-physical-glucometer',
    _type: 'product',
    title: 'Glukometr se sadou proužků (TEST)',
    slug: {_type: 'slug', current: 'test-glukometr'},
    category: 'Fyzické produkty',
    price: 890,
    isAvailable: true,
    description: 'Klasický glukometr pro měření glykémie z kapky krve. Testovací produkt.',
    image: image(img(1)),
  })

  tx.createOrReplace({
    _id: 'seed-physical-glasses',
    _type: 'product',
    title: 'Brýle blokující modré světlo (TEST, nedostupné)',
    slug: {_type: 'slug', current: 'test-bryle-modre-svetlo'},
    category: 'Fyzické produkty',
    price: 690,
    isAvailable: false,
    description: 'Ukázka produktu, který momentálně není skladem. Testovací produkt.',
    image: image(img(2)),
  })

  tx.createOrReplace({
    _id: 'seed-voucher-cgm-consultation',
    _type: 'product',
    title: 'Dárkový poukaz – konzultace během monitorace glykémie (TEST)',
    slug: {_type: 'slug', current: 'test-darkovy-poukaz-konzultace'},
    category: 'Dárkové poukazy',
    price: 4900,
    description: 'Darujte individuální konzultaci během kontinuální monitorace glykémie. Testovací cena.',
    image: image(img(3)),
    voucherValidityMonths: 12,
    voucherIncludes: [
      'Vstupní konzultace',
      'Komunikace během funkce senzoru s úpravou režimu',
      'Zhodnocení a doporučení laboratorního vyšetření',
      'Vytvoření dlouhodobého plánu',
      'Přístup k našim průvodcům na e-shopu',
    ].join('\n'),
    voucherGuides: [{_type: 'reference', _ref: cgmGuide._id, _key: 'guide1'}],
  })

  await tx.commit()
  console.log(`Seeded "${DATASET}": shop settings + 3 physical products + 1 voucher (guide: ${cgmGuide.title}).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
