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
        className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.25),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.18),transparent_55%)]"
      />
      <div className="relative container mx-auto px-4 sm:px-6 pt-28 pb-16 sm:py-24">
        <p className="text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wider">
          DOFUS - EVENT DUOTAGE GÉNÉRATION MIRACLE
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 text-white break-words">{title}</h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-3xl">{subtitle}</p>
        {children}
      </div>
    </header>
  )
}
