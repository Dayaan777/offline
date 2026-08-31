'use client'

import Image from 'next/image'
import Link from 'next/link'

// ─── Animation helpers ────────────────────────────────────────────────────────

function fadeUp(delay: number): React.CSSProperties {
  return {
    animation: `offline-fade-up 0.7s cubic-bezier(0.4,0,0.2,1) both`,
    animationDelay: `${delay}s`,
  }
}

function fadeIn(delay: number): React.CSSProperties {
  return {
    animation: `offline-fade-in 1s ease both`,
    animationDelay: `${delay}s`,
  }
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HomeHero() {
  return (
    <section
      aria-label="Hero"
      className="flex flex-col md:flex-row md:h-[min(860px,calc(100svh-60px))] overflow-hidden"
    >

      {/* ── Left — text panel ───────────────────────────────────────────────── */}
      <div
        className="
          order-2 md:order-1
          w-full md:w-[44%] xl:w-[42%]
          flex flex-col justify-center gap-10 md:gap-14
          px-5 py-10
          md:px-14 md:py-12
          lg:px-20
          bg-[var(--color-bg-primary)]
        "
      >

        <div>
          <p
            className="label-category text-[var(--color-text-muted)] mb-6 md:mb-8"
            style={fadeUp(0.05)}
          >
            Contemporary Footwear
          </p>

          <h1
            className="
              font-light leading-[0.9] tracking-[-0.04em]
              text-[var(--color-text-primary)]
              text-[3.5rem] sm:text-[4.5rem] md:text-[4.75rem] lg:text-[5.5rem] xl:text-[6rem]
            "
            style={fadeUp(0.12)}
          >
            <span className="block">Wear</span>
            <span className="block md:pl-[18%] lg:pl-[22%]">it&nbsp;in.</span>
          </h1>
        </div>

        <div>
          <div
            className="w-8 h-px bg-[var(--color-border-default)] mb-6 md:mb-8"
            style={fadeIn(0.3)}
            aria-hidden="true"
          />

          <p
            className="
              text-[1rem] md:text-[1.0625rem]
              text-[var(--color-text-secondary)]
              leading-relaxed
              mb-7 md:mb-8
              max-w-[280px]
            "
            style={fadeUp(0.28)}
          >
            Four products.
            <br />
            Built for the actual day —
            <br />
            not the photograph of it.
          </p>

          <div
            className="flex flex-col sm:flex-row items-start gap-4"
            style={fadeUp(0.38)}
          >
            <Link
              href="/shop"
              className="
                inline-flex items-center
                h-11 px-7
                bg-[var(--color-accent)]
                text-[var(--color-text-inverse)]
                text-[13px] font-medium tracking-[0.06em]
                hover:bg-[var(--color-accent-hover)]
                transition-colors duration-150
                whitespace-nowrap
              "
            >
              Shop new arrivals
            </Link>

            <Link
              href="/brand"
              className="
                inline-flex items-center
                h-11
                text-[13px] font-medium tracking-[0.06em]
                text-[var(--color-text-secondary)]
                hover:text-[var(--color-text-primary)]
                transition-colors duration-150
                whitespace-nowrap
                gap-1.5
              "
            >
              Explore OFFLINE
              <span aria-hidden="true" className="opacity-60">→</span>
            </Link>
          </div>
        </div>

      </div>

      {/* ── Right — image panel ─────────────────────────────────────────────── */}
      <div
        className="
          order-1 md:order-2
          w-full md:w-[56%] xl:w-[58%]
          h-[56vw] min-h-[260px] max-h-[420px] md:h-full md:max-h-none
          relative overflow-hidden
        "
        style={fadeIn(0)}
      >
        <div className="absolute inset-0 bg-[#231B15]">
          <Image
            src="/images/products/margin/off-white/01.png"
            alt="The Margin footwear in off-white"
            fill
            priority
            className="object-cover object-center opacity-90 mix-blend-screen"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
        </div>

        <div
          className="
            absolute bottom-0 left-0
            px-5 py-4 md:px-8 md:py-6
          "
          style={fadeUp(0.55)}
        >
          <p className="label-category text-white/35 mb-1.5">
            Ground — No.01
          </p>
          <Link
            href="/shop/ground/margin"
            className="
              group
              flex items-baseline gap-2.5
              text-[15px] font-light text-white/70
              hover:text-white
              transition-colors duration-200
            "
          >
            <span>The Margin</span>
            <span className="text-[13px] text-white/40 group-hover:text-white/70 transition-colors duration-200">
              $295
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

    </section>
  )
}

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0" style={{ background: '#16120E' }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 52% 38%, #2D1E13 0%, #1A1108 45%, transparent 75%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 35% at 80% 75%, #1E1510 0%, transparent 65%)',
        }}
      />
    </div>
  )
}
