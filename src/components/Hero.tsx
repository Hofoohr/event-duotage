import type { ReactNode } from 'react'

interface HeroProps {
  title: string
  subtitle: string
  children?: ReactNode
}

export default function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-gray-900/95 to-gray-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] bg-[radial-gradient(ellipse_at_top_left,rgba(31,191,174,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(20,145,127,0.16),transparent_55%)]"
      />
      <div className="relative container mx-auto px-4 sm:px-6 pt-28 pb-16 sm:py-24">
        <p className="text-brand-400 font-semibold mb-4 text-sm uppercase tracking-wider">
          DOFUS - EVENT DUOTAGE GÉNÉRATION MIRACLE
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 text-white break-words">{title}</h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-3xl">{subtitle}</p>
        {children}
      </div>
    </header>
  )
}
