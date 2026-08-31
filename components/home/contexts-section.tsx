import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { products } from '@/lib/data/products'
import type { CategoryId, Product } from '@/lib/types'

const CONTEXT_PRODUCT_SLUGS = {
  ground: 'margin',
  field: 'farrow',
  floor: 'croft',
  track: 'weld',
} satisfies Record<CategoryId, string>

const CONTEXT_VISUALS: Record<CategoryId, { bg: string; glow: string }> = {
  ground: {
    bg: '#1B1410',
    glow: 'radial-gradient(ellipse 58% 68% at 46% 36%, #302013 0%, transparent 72%)',
  },
  field: {
    bg: '#121610',
    glow: 'radial-gradient(ellipse 58% 68% at 54% 40%, #202713 0%, transparent 72%)',
  },
  floor: {
    bg: '#1A1611',
    glow: 'radial-gradient(ellipse 58% 68% at 50% 40%, #2A2016 0%, transparent 72%)',
  },
  track: {
    bg: '#111317',
    glow: 'radial-gradient(ellipse 58% 68% at 50% 36%, #171B23 0%, transparent 72%)',
  },
}

const ORDER = ['01', '02', '03', '04']

function formatPrice(cents: number) {
  return `$${Math.round(cents / 100).toLocaleString('en-US')}`
}

function findContextProduct(categoryId: CategoryId): Product | undefined {
  const slug = CONTEXT_PRODUCT_SLUGS[categoryId]

  return products.find(
    (product) => product.category === categoryId && product.slug === slug
  )
}

export function ContextsSection() {
  return (
    <section aria-label="Product contexts">
      <div className="container">
        <div className="flex items-center justify-between py-6 md:py-7 border-b border-[var(--color-border-subtle)]">
          <p className="label-category text-[var(--color-text-muted)]">
            The Contexts
          </p>
          <p className="label-category text-[var(--color-text-muted)] hidden sm:block">
            Ground&nbsp;&nbsp;/&nbsp;&nbsp;Field&nbsp;&nbsp;/&nbsp;&nbsp;Floor&nbsp;&nbsp;/&nbsp;&nbsp;Track
          </p>
        </div>
      </div>

      {categories.map((cat, i) => {
        const imageOnLeft = i % 2 === 0
        const product = findContextProduct(cat.id)

        if (!product) {
          return null
        }

        const visual = CONTEXT_VISUALS[cat.id]
        const num = ORDER[i]
        const categoryHref = `/shop/${cat.slug}`
        const productHref = `/shop/${cat.slug}/${product.slug}`
        const price = formatPrice(product.price)
        const primaryVariant = product.variants[0]

        return (
          <div
            key={cat.id}
            className="flex flex-col md:flex-row md:items-stretch border-b border-[var(--color-border-subtle)]"
          >
            <div
              className={[
                'relative overflow-hidden flex-shrink-0',
                'w-full md:w-[52%]',
                'h-[48vw] min-h-[240px] max-h-[340px] md:h-auto md:max-h-none md:min-h-[360px]',
                'order-1',
                imageOnLeft ? 'md:order-1' : 'md:order-2',
              ].join(' ')}
              style={{ background: visual.bg }}
            >
              <div className="absolute inset-0" style={{ background: visual.glow }} />

              <div className="absolute top-5 left-5 md:top-6 md:left-6 flex items-center gap-3">
                <p className="label-category text-white/30">{num}</p>
                <div className="h-px w-6 bg-white/15" aria-hidden="true" />
                <p className="label-category text-white/40">{cat.name}</p>
              </div>

              <div className="absolute left-5 right-5 bottom-5 md:left-6 md:right-6 md:bottom-6">
                <p className="label-category text-white/30 mb-1.5">
                  {primaryVariant.colorLabel.split('—')[0].trim()}
                </p>
                <Link
                  href={productHref}
                  className="group inline-flex items-baseline gap-2 text-[15px] font-light text-white/70 hover:text-white transition-colors duration-200"
                >
                  <span>{product.name}</span>
                  <span className="text-[13px] text-white/40 group-hover:text-white/65 transition-colors duration-200">
                    {price}
                  </span>
                  <span
                    className="text-white/30 group-hover:translate-x-0.5 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div
              className={[
                'flex-1 flex flex-col justify-center',
                'px-5 py-8 md:px-10 md:py-10 lg:px-16',
                'bg-[var(--color-bg-primary)]',
                'order-2',
                imageOnLeft ? 'md:order-2' : 'md:order-1',
              ].join(' ')}
            >
              <p className="label-category text-[var(--color-text-muted)] mb-3">
                {num} / Context
              </p>

              <h2 className="text-[2rem] md:text-[2.35rem] lg:text-[2.75rem] font-light leading-none tracking-[-0.02em] text-[var(--color-text-primary)] mb-4">
                {cat.name}
              </h2>

              <div
                className="w-6 h-px bg-[var(--color-border-default)] mb-4"
                aria-hidden="true"
              />

              <p className="text-[1rem] text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-[320px]">
                {cat.description}
              </p>

              <div className="border-t border-[var(--color-border-subtle)] pt-5 max-w-[340px]">
                <div className="flex items-baseline justify-between gap-6 mb-2">
                  <Link
                    href={productHref}
                    className="text-[1.25rem] md:text-[1.4rem] font-light leading-none tracking-[-0.01em] text-[var(--color-text-primary)] hover:text-[var(--color-accent-hover)] transition-colors duration-150"
                  >
                    {product.name}
                  </Link>
                  <p className="text-[0.875rem] font-medium text-[var(--color-accent)]">
                    {price}
                  </p>
                </div>
                <p className="text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)] mb-5">
                  {product.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={categoryHref}
                    className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] text-[var(--color-text-primary)] opacity-70 hover:opacity-100 transition-opacity duration-150"
                  >
                    Shop {cat.name}
                    <span
                      className="group-hover:translate-x-0.5 transition-transform duration-150"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href={productHref}
                    className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors duration-150"
                  >
                    View {product.name}
                    <span
                      className="group-hover:translate-x-0.5 transition-transform duration-150"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
