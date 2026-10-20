/**
 * Gives every product without a slug one generated from its title, so it gets a detail page.
 *
 * Dry run:  npx sanity exec scripts/backfill-product-slugs.ts --with-user-token
 * Write:    npx sanity exec scripts/backfill-product-slugs.ts --with-user-token -- --write
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-10-28'})
const write = process.argv.includes('--write')

function slugify(title: string) {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

async function run() {
  const products = await client.fetch<{_id: string; title?: string}[]>(
    `*[_type == "product" && !defined(slug.current)]{_id, title}`,
  )
  const taken = new Set(
    await client.fetch<string[]>(`*[_type == "product" && defined(slug.current)].slug.current`),
  )

  // A draft and its published version are the same product and must share one slug.
  const slugByBaseId = new Map<string, string>()
  const tx = client.transaction()
  for (const product of products) {
    if (!product.title) continue
    const baseId = product._id.replace(/^drafts\./, '')
    let slug = slugByBaseId.get(baseId)
    if (!slug) {
      slug = slugify(product.title)
      for (let n = 2; taken.has(slug); n++) slug = `${slugify(product.title)}-${n}`
      taken.add(slug)
      slugByBaseId.set(baseId, slug)
    }
    console.log(`${product._id}: ${product.title} → /e-shop/${slug}`)
    tx.patch(product._id, (p) => p.set({slug: {_type: 'slug', current: slug}}))
  }

  if (!write) {
    console.log(`\nDry run: ${products.length} products. Re-run with "-- --write" to save.`)
    return
  }
  await tx.commit()
  console.log(`\nSaved slugs for ${products.length} products.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
