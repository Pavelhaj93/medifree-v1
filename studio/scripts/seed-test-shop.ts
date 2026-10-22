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
      company: {
        name: 'Medifree s.r.o.',
        address: 'Na Kotli 1176/29, 500 09 Hradec Králové',
        ico: '23153041',
        email: 'info@medifree.cz',
        instagram: 'https://www.instagram.com/medifreecz',
      },
    }),
  )
  tx.patch('siteSettings', (p) =>
    p.setIfMissing({'company.instagram': 'https://www.instagram.com/medifreecz'}),
  )
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
    stockStatus: 'in',
    label: 'Monitorace glykémie',
    description: 'Senzor pro kontinuální monitoraci glykémie a náš průvodce jeho využitím. Testovací produkt.',
    image: image(img(0)),
    gallery: [image(img(1), 'g1'), image(img(2), 'g2')],
    body: [
      block('Balíček obsahuje senzor na 14 dní a tištěného průvodce, jak z naměřených dat vyčíst co nejvíc.', 'b1'),
      block('Testovací produkt pro lokální ověření e-shopu – ne pro prodej.', 'b2'),
    ],
    forWhom: [
      {_key: 'w1', _type: 'audience', title: 'Začátečníkům', text: 'kteří chtějí poprvé vyzkoušet kontinuální monitoraci glykémie.'},
      {_key: 'w2', _type: 'audience', title: 'Zvědavým', text: 'kdo chce zjistit, jak na něj působí konkrétní jídla, spánek a pohyb.'},
      {_key: 'w3', _type: 'audience', title: 'Našim klientům', text: 'jako příprava na individuální konzultaci.'},
    ],
    notSuitableFor: 'pro léčbu diabetu bez dohledu lékaře – senzor slouží k poznání vlastního těla.',
    benefits: [
      {_key: 'b1', _type: 'benefit', highlight: '14 dní', title: 'nepřetržitého měření', text: 'Hodnoty každých pár minut v aplikaci.'},
      {_key: 'b2', _type: 'benefit', highlight: '1×', title: 'průvodce k senzoru', text: 'Jak senzor nasadit a jak číst data.'},
      {_key: 'b3', _type: 'benefit', highlight: '0 Kč', title: 'za podporu', text: 'S nastavením senzoru vám pomůžeme e-mailem.'},
    ],
  })

  tx.createOrReplace({
    _id: 'seed-physical-glucometer',
    _type: 'product',
    title: 'Glukometr se sadou proužků (TEST)',
    slug: {_type: 'slug', current: 'test-glukometr'},
    category: 'Fyzické produkty',
    price: 890,
    stockStatus: 'low',
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
    stockStatus: 'out',
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

  // Protein in 4 flavors (one sold out) – shows the flavor switcher and food information.
  const nutritionRow = (label: string, per100: string, perServing: string, i: number) => ({
    _type: 'nutritionRow',
    _key: `n${i}`,
    label,
    per100,
    perServing,
  })
  const strongBlock = (parts: [string, boolean][], key: string) => ({
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: parts.map(([text, bold], i) => ({_type: 'span', _key: `${key}${i}`, text, marks: bold ? ['strong'] : []})),
  })
  const flavors = [
    {id: 'choco', label: 'Čokoláda', color: '#6b4423', stock: ['in', 'in'], extra: 'kakao 8 %'},
    {id: 'vanilla', label: 'Vanilka', color: '#f3dc8a', stock: ['in', 'low'], extra: 'vanilkové aroma'},
    {id: 'caramel', label: 'Slaný karamel', color: '#c98a3b', stock: ['out', 'out'], extra: 'karamelové aroma, sůl'},
    {id: 'plain', label: 'Bez příchutě', color: '#ffffff', stock: ['in', 'in'], extra: ''},
  ]
  const packs = [
    {id: '500', label: '500 g', grams: 500, servings: 16, price: 690},
    {id: '1000', label: '1 kg', grams: 1000, servings: 33, price: 1190},
  ]
  flavors.forEach((f, i) => {
    packs.forEach((pack, j) => {
      tx.createOrReplace({
        _id: `seed-protein-${f.id}-${pack.id}`,
        _type: 'product',
        title: `Syrovátkový protein – ${f.label}, ${pack.label} (TEST)`,
        slug: {_type: 'slug', current: `test-syrovatkovy-protein-${f.id}-${pack.id}`},
        category: 'Fyzické produkty',
        label: 'Sportovní výživa',
        price: f.id === 'plain' ? pack.price - 100 : pack.price,
        stockStatus: f.stock[j],
        description:
          'Čistý syrovátkový koncentrát s 22 g bílkovin v porci, který doplní snídani nebo jídlo po tréninku. Ukázkový produkt – údaje jsou smyšlené.',
        image: image(img(i)),
        variantGroup: 'Syrovátkový protein (TEST)',
        variantLabel: f.label,
        variantColor: f.color,
        packLabel: pack.label,
        netWeight: pack.grams,
        servings: pack.servings,
        forWhom: [
          {_key: 'w1', _type: 'audience', title: 'Komu chybí bílkoviny ve stravě', text: '– typicky při rostlinném jídelníčku nebo nepravidelném jídle.'},
          {_key: 'w2', _type: 'audience', title: 'Sportujícím', text: 'jako doplnění bílkovin po tréninku pro regeneraci svalů.'},
          {_key: 'w3', _type: 'audience', title: 'Při monitoraci glykémie', text: 'jako sytá svačina s minimem cukru.'},
          {_key: 'w4', _type: 'audience', title: 'Starším lidem', text: 'k udržení svalové hmoty, když klesá chuť k jídlu.'},
        ],
        notSuitableFor: 'při alergii na mléčnou bílkovinu. Při onemocnění ledvin se poraďte s lékařem.',
        benefits: [
          {_key: 'b1', _type: 'benefit', highlight: '22 g', title: 'bílkovin v porci', text: 'Všech 9 esenciálních aminokyselin.'},
          {_key: 'b2', _type: 'benefit', highlight: '1,5 g', title: 'cukru v porci', text: 'Vhodné k režimu se stabilní glykémií.'},
          {_key: 'b3', _type: 'benefit', highlight: `${pack.servings}`, title: 'porcí v balení', text: 'Při 1 porci denně vystačí na dlouho.'},
          {_key: 'b4', _type: 'benefit', highlight: '0', title: 'přidaného cukru', text: 'Bez plnidel a přidaného cukru.'},
        ],
        body: [block('Protein vyráběný z kvalitní syrovátky. Ukázkový text popisu pro testování e-shopu.', 'pb1')],
        foodInfo: {
          enabled: true,
          isSupplement: true,
          ingredients: [
            strongBlock(
              [
                ['syrovátkový proteinový koncentrát (z ', false],
                ['mléka', true],
                [`) 85 %${f.extra ? `, ${f.extra}` : ''}, sladidlo: sukralóza, emulgátor: `, false],
                ['sójový', true],
                [' lecitin', false],
              ],
              'ing',
            ),
          ],
          allergens: 'Alergeny: mléko, sója. Může obsahovat stopy lepku.',
          servingSize: '30 g',
          nutrition: [
            nutritionRow('Energetická hodnota', '1 600 kJ / 380 kcal', '480 kJ / 114 kcal', 0),
            nutritionRow('Tuky', '6 g', '1,8 g', 1),
            nutritionRow('z toho nasycené mastné kyseliny', '3,5 g', '1,1 g', 2),
            nutritionRow('Sacharidy', '7 g', '2,1 g', 3),
            nutritionRow('z toho cukry', '5 g', '1,5 g', 4),
            nutritionRow('Bílkoviny', '75 g', '22,5 g', 5),
            nutritionRow('Sůl', '0,4 g', '0,12 g', 6),
          ],
          usage: '30 g (3 odměrky) smíchejte s 250 ml vody nebo mléka a protřepejte v šejkru. 1 porce denně.',
          storage: 'V suchu a temnu při teplotě do 25 °C. Po otevření spotřebujte do 3 měsíců.',
          producer: 'Ukázkový výrobce s.r.o., Testovací 1, 110 00 Praha',
          origin: 'Česká republika',
          bestBefore: 'Uvedena na spodní straně balení.',
        },
      })
    })
  })

  await tx.commit()
  console.log(`Seeded "${DATASET}": shop + company settings, 3 physical products, protein 4 flavors × 2 packs, 1 voucher (guide: ${cgmGuide.title}).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
