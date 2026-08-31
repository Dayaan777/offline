import Link from 'next/link'
import { products } from '@/lib/data/products'
import type { Product } from '@/lib/types'

const PRODUCT_ORDER = ['margin', 'farrow', 'croft', 'weld']

function getMaterialProducts(): Product[] {
  return PRODUCT_ORDER
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product))
}

function getConstructionLabel(product: Product) {
  return product.construction.split('.')[0]
}

export function MaterialsSection() {
  const materialProducts = getMaterialProducts()
  const heroProduct = materialProducts[0]

  return (
    <section
      aria-labelledby="materials-heading"
      className="bg-[var(--color-bg-primary)]"
    >
      <div className="container">
        <div className="grid border-b border-[var(--color-border-subtle)] md:grid-cols-[0.9fr_1.4fr] md:items-stretch">
          <div className="flex flex-col justify-center border-b border-[var(--color-border-subtle)] py-10 md:border-b-0 md:border-r md:py-12 md:pr-10 lg:py-14 lg:pr-16">
            <p className="label-category text-[var(--color-text-muted)] mb-4">
              Materials
            </p>
            <h2
              id="materials-heading"
              className="max-w-[420px] text-[2rem] font-light leading-[0.95] tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[2.75rem] lg:text-[3.25rem]"
            >
              The difference is mostly physical.
            </h2>

            <p className="mt-6 max-w-[360px] text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)] md:text-[1rem]">
              Leather that gives. Suede that marks. Rubber with some honesty in it.
              The materials are chosen for what happens after the box, not before it.
            </p>

            <Link
              href="/brand/materials"
              className="group mt-7 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] text-[var(--color-accent)] transition-colors duration-150 hover:text-[var(--color-accent-hover)]"
            >
              Read Materials
              <span
                className="transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
            <div
              className="relative min-h-[280px] overflow-hidden md:min-h-0"
              style={{ background: '#17130F' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 58% 68% at 48% 36%, #302013 0%, #1B1410 46%, transparent 74%)',
                }}
              />

              <div className="relative flex h-full min-h-[280px] flex-col justify-between px-5 py-6 md:min-h-full md:px-7 md:py-8">
                <p className="label-category text-white/35">
                  Wear over time
                </p>

                <div>
                  <p className="max-w-[280px] text-[2.15rem] font-light leading-[0.95] tracking-[-0.02em] text-white/65 sm:text-[2.6rem] lg:text-[3.1rem]">
                    Crease. Soften. Hold.
                  </p>
                  {heroProduct && (
                    <p className="mt-4 max-w-[280px] text-[0.8125rem] leading-relaxed text-white/40">
                      {heroProduct.materials.upper}. {heroProduct.materials.outsole}.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col border-t border-[var(--color-border-subtle)] md:border-l md:border-t-0">
              {materialProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-1 flex-col justify-center border-b border-[var(--color-border-subtle)] px-5 py-5 last:border-b-0 md:px-6 md:py-5"
                >
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <p className="text-[1.15rem] font-light leading-none tracking-[-0.01em] text-[var(--color-text-primary)]">
                      {product.name}
                    </p>
                    <p className="label-category text-[var(--color-text-muted)]">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-[0.8125rem] leading-relaxed text-[var(--color-text-secondary)]">
                    {product.materials.upper}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-[var(--color-text-muted)]">
                    {getConstructionLabel(product)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
