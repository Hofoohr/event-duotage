import Hero from '../components/Hero'
import bets from '../data/bets.json'
import { participants } from '../lib/tournament'

type Tier = 'low' | 'medium' | 'high'

const tiers: Record<Tier, { label: string; hint: string; badge: string }> = {
  low: {
    label: 'Cote basse',
    hint: 'Challenger, victoire probable',
    badge: 'bg-green-900/40 text-green-300 border-green-600/40',
  },
  medium: {
    label: 'Cote moyenne',
    hint: 'Outsider, victoire possible',
    badge: 'bg-sky-900/40 text-sky-300 border-sky-600/40',
  },
  high: {
    label: 'Cote élevée',
    hint: "Personne n'y croit, haut gain",
    badge: 'bg-orange-900/40 text-orange-300 border-orange-600/40',
  },
}

/** The tier follows the odds, so it can never contradict the displayed value. */
const tierOf = (odds: number): Tier => (odds < 15 ? 'low' : odds < 35 ? 'medium' : 'high')

const kamas = (n: number) => new Intl.NumberFormat('fr-FR').format(n).replace(/[  ]/g, ' ') + ' Kamas'

const rows = bets.betDetails
  .map(b => {
    const team = participants.find(x => x.id === b.teamId)
    const odds = bets.totalPot / b.amount
    return {
      ...b,
      name: team?.displayName ?? b.teamId,
      classes: team?.classes ?? [],
      odds,
      tier: tierOf(odds),
    }
  })
  .sort((a, b) => a.odds - b.odds)

export default function Paris() {
  return (
    <div className="min-h-screen">
      <Hero
        title="Paris du tournoi"
        subtitle="Consultez les cotes actuelles et le détail des paris. Les données sont mises à jour manuellement et ne sont pas interactives."
      >
        <div className="bg-gradient-to-r from-brand-900/60 to-gray-900/60 backdrop-blur-sm rounded-lg px-6 py-4 border border-brand-600/40 inline-block">
          <p className="text-sm text-brand-300 mb-1">Cagnotte totale de paris</p>
          <p className="text-2xl sm:text-3xl font-black text-brand-300">{kamas(bets.totalPot)}</p>
        </div>
      </Hero>

      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
          <p className="text-yellow-300 text-center font-semibold">
            ℹ️ Les cotes et mises sont mises à jour manuellement. Cette page est en lecture seule.
          </p>
        </div>

        {rows.length === 0 ? (
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-10 text-center text-gray-400">
            Aucun pari n'est actuellement renseigné.
          </div>
        ) : (
          <>
            <div className="mb-8 grid gap-3 md:grid-cols-3">
              {(Object.keys(tiers) as Tier[]).map(k => (
                <div key={k} className={`rounded-lg border px-4 py-3 ${tiers[k].badge}`}>
                  <p className="font-bold">{tiers[k].label}</p>
                  <p className="text-sm opacity-80">{tiers[k].hint}</p>
                </div>
              ))}
            </div>
            <div className="relative overflow-x-auto bg-gray-800/30 rounded-lg border border-gray-700">
              <table className="w-full text-left">
                <caption className="sr-only">Cotes et mises par équipe</caption>
                <thead>
                  <tr className="border-b border-gray-700 text-sm uppercase tracking-wider text-gray-400">
                    <th scope="col" className="px-4 sm:px-6 py-4">Équipe</th>
                    <th scope="col" className="px-4 sm:px-6 py-4">Classes</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 text-right">Paris</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 text-right">Cote</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.teamId} className="border-b border-gray-800 last:border-0">
                      <th scope="row" className="px-4 sm:px-6 py-4 font-bold text-white">{r.name}</th>
                      <td className="px-4 sm:px-6 py-4 text-gray-300">{r.classes.join(' + ')}</td>
                      <td className="px-4 sm:px-6 py-4 text-right text-gray-300 whitespace-nowrap">{kamas(r.amount)}</td>
                      <td className="px-4 sm:px-6 py-4 text-right">
                        <span className={`inline-block rounded border px-3 py-1 font-bold whitespace-nowrap ${tiers[r.tier].badge}`}>
                          <span className="sr-only">{tiers[r.tier].label} : </span>x {r.odds.toFixed(2).replace('.', ',')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
