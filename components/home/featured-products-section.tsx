'use client'

import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { products } from '@/lib/data/products'
import { useWishlist } from '@/context/wishlist-context'
import type { CategoryId, Product, ProductVariant, WishlistItem } from '@/lib/types'

const CONTEXT_ORDER: CategoryId[] = ['ground', 'field', 'floor', 'track']

const IMAGE_STAGE: Record<CategoryId, { bg: string; glow: string }> = {
  ground: {
    bg: '#1B1410',
    glow: 'radial-gradient(ellipse 54% 64% at 50% 38%, #302013 0%, transparent 72%)',
  },
  field: {
    bg: '#121610',
    glow: 'radial-gradient(ellipse 54% 64% at 52% 40%, #202713 0%, transparent 72%)',
  },
  floor: {
    bg: '#1A1611',
    glow: 'radial-gradient(ellipse 54% 64% at 50% 39%, #2A2016 0%, transparent 72%)',
  },
  track: {
    bg: '#111317',
    glow: 'radial-gradient(ellipse 54% 64% at 50% 37%, #171B23 0%, transparent 72%)',
  },
}

function formatPrice(cents: number) {
  return `$${Math.round(cents / 100).toLocaleString('en-US')}`
}

function getCategoryName(categoryId: CategoryId) {
  return categories.find((category) => category.id === categoryId)?.name ?? categoryId
}

function getFeaturedProducts() {
  return CONTEXT_ORDER
    .map((categoryId) => products.find((product) => product.category === categoryId))
    .filter((product): product is Product => Boolean(product))
}

function getWishlistItem(product: Product, variant: ProductVariant): WishlistItem {
  return {
    productId: product.id,
    variantId: variant.id,
    addedAt: new Date().toISOString(),
    name: product.name,
    price: product.price,
    colorLabel: variant.colorLabel,
    image: variant.images[0],
    slug: product.slug,
    category: product.category,
  }
}

export function FeaturedProductsSection() {
  const { isSaved, toggleItem } = useWishlist()
  const featuredProducts = getFeaturedProducts()

  return (
    <section aria-labelledby="featured-products-heading" className="bg-[var(--color-bg-primary)]">
      <div className="container">
        <div className="flex flex-col gap-3 border-b border-[var(--color-border-subtle)] py-8 md:flex-row md:items-end md:justify-between md:gap-10 md:py-10">
          <div>
            <p className="label-category text-[var(--color-text-muted)] mb-3">
              Featured Products
            </p>
            <h2
              id="featured-products-heading"
              className="max-w-[520px] text-[2rem] font-light leading-[0.95] tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[2.75rem] lg:text-[3.25rem]"
            >
              The four shoes in the system.
            </h2>
          </div>
          <p className="max-w-[280px] text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)] md:pb-1">
            Context explains the need. Product answers it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--color-border-subtle)] sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => {
            const categoryName = getCategoryName(product.category)
            const defaultVariant = product.variants[0]
            const saved = isSaved(product.id, defaultVariant.id)
            const productHref = `/shop/${product.category}/${product.slug}`
            const categoryHref = `/shop/${product.category}`
            const stage = IMAGE_STAGE[product.category]

            return (
              <article
                key={product.id}
                className="group flex flex-col bg-[var(--color-bg-primary)]"
              >
                <Link
                  href={productHref}
                  className="relative block aspect-[4/5] overflow-hidden"
                  style={{ background: stage.bg }}
                  aria-label={`View ${product.name}`}
                >
                  <div className="absolute inset-0" style={{ background: stage.glow }} />
                  <div className="absolute left-4 top-4 md:left-5 md:top-5">
                    <p className="label-category text-white/35">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <p className="absolute inset-x-4 bottom-4 text-[1.65rem] font-light leading-none tracking-[-0.02em] text-white/55 transition-colors duration-200 group-hover:text-white/75 md:inset-x-5 md:bottom-5 md:text-[1.85rem]">
                    {product.name}
                  </p>
                </Link>

                <div className="flex flex-1 flex-col px-4 py-5 md:px-5 md:py-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={categoryHref}
                        className="label-category text-[var(--color-text-muted)] transition-colors duration-150 hover:text-[var(--color-accent)]"
                      >
                        {categoryName}
                      </Link>
                      <h3 className="mt-2 text-[1.35rem] font-light leading-none tracking-[-0.01em] text-[var(--color-text-primary)]">
                        <Link href={productHref} className="transition-colors duration-150 hover:text-[var(--color-accent-hover)]">
                          {product.name}
                        </Link>
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleItem(getWishlistItem(product, defaultVariant))}
                      className={[
                        'flex h-9 w-9 flex-shrink-0 items-center justify-center border transition-colors duration-150',
                        saved
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-text-inverse)]'
                          : 'border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
                      ].join(' ')}
                      aria-pressed={saved}
                      aria-label={`${saved ? 'Remove' : 'Save'} ${product.name} ${defaultVariant.colorLabel}`}
                    >
                      <span aria-hidden="true" className="text-[16px] leading-none">
                        {saved ? '−' : '+'}
                      </span>
                    </button>
                  </div>

                  <p className="mb-5 max-w-[280px] text-[0.8125rem] leading-relaxed text-[var(--color-text-secondary)]">
                    {product.shortDescription}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border-subtle)] pt-4">
                      <p className="text-[0.875rem] font-medium text-[var(--color-accent)]">
                        {formatPrice(product.price)}
                      </p>
                      <div className="flex items-center gap-1.5" aria-label={`${product.name} available colors`}>
                        {product.variants.map((variant) => (
                          <span
                            key={variant.id}
                            className="block h-2.5 w-2.5 border border-[var(--color-border-default)]"
                            style={{ backgroundColor: variant.colorHex }}
                            title={variant.colorLabel}
                          />
                        ))}
                      </div>
                    </div>

                    <Link
                      href={productHref}
                      className="group/link inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] text-[var(--color-text-primary)] opacity-70 transition-opacity duration-150 hover:opacity-100"
                    >
                      View Product
                      <span
                        className="transition-transform duration-150 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
