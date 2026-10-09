import React, { useMemo, useState } from 'react'
import Hero from '../components/Hero'
import config from '../data/config.json'
import { classIcon } from '../lib/classes'
import {
  cellStatus,
  dungeons,
  formatDate,
  levelRange,
  matchesQuery,
  participants,
  rankTeams,
  startsGroup,
  validatedCount,
  type CellStatus,
  type Participant,
} from '../lib/tournament'

const cellStyle: Record<CellStatus, string> = {
  completed: 'bg-green-900/40',
  death: 'bg-red-900/50',
  'in-progress': 'bg-brand-900/40',
  'not-reached': 'bg-gray-800/20',
}

const segmentStyle: Record<CellStatus, string> = {
  completed: 'bg-green-500',
  death: 'bg-red-500',
  'in-progress': 'bg-brand-500 motion-safe:animate-pulse',
  'not-reached': 'bg-gray-700',
}

const statusLabel: Record<CellStatus, string> = {
  completed: 'Validé',
  death: 'Mort',
  'in-progress': 'En cours',
  'not-reached': 'Non atteint',
}

function Status({ p }: { p: Participant }) {
  if (p.status === 'alive') return <p className="text-sm text-green-400 font-semibold">✓ Toujours en vie</p>
  const name = dungeons.find(d => d.id === p.deathStepId)?.name
  return <p className="text-sm text-red-400 font-semibold">✕ Mort face à {name || 'un combat'}</p>
}

function Chips({ p }: { p: Participant }) {
  return (
    <div className="flex flex-wrap gap-1 mb-2">
      {p.members.map(m => (
        <span
          key={m.pseudo}
          className="px-2 py-1 rounded bg-brand-600/20 border border-brand-600/30 text-xs text-brand-300"
        >
          {m.pseudo}
          {m.class ? ` • ${m.class}` : ''}
        </span>
      ))}
      {(p.classes ?? []).map(c => {
        const icon = classIcon(c)
        return (
          <span
            key={c}
            className="flex items-center gap-1 px-2 py-1 rounded bg-gray-700/40 border border-gray-600/40 text-xs text-gray-300"
          >
            {icon && <img src={icon} alt="" width={16} height={16} loading="lazy" className="w-4 h-4 object-contain" />}
            {c}
          </span>
        )
      })}
    </div>
  )
}

function TeamName({ p, open, toggle }: { p: Participant; open: boolean; toggle: () => void }) {
  if (p.dungeonStats.length === 0) return <span className="block font-bold text-white mb-2">{p.displayName}</span>
  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      className="font-bold text-white mb-2 hover:text-brand-400 transition-colors text-left flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
    >
      {p.displayName}
      <span aria-hidden="true" className="text-xs text-gray-500">
        {open ? '▼' : '▶'}
      </span>
    </button>
  )
}

function Stats({ p }: { p: Participant }) {
  return (
    <dl className="mt-3 grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 text-xs text-gray-300">
      {p.dungeonStats.map(s => (
        <React.Fragment key={s.dungeonId}>
          <dt>{dungeons.find(d => d.id === s.dungeonId)?.name ?? s.dungeonId}</dt>
          <dd>{s.turns} tours</dd>
          <dd>{s.damage.toLocaleString('fr-FR')} dégâts</dd>
        </React.Fragment>
      ))}
    </dl>
  )
}

/** Death cell: the rectangle is cut along its diagonal, one class on each side. */
function SplitDeath({ classes }: { classes: [string, string] }) {
  const [first, second] = classes
  const icon = (c: string, position: string) => {
    const src = classIcon(c)
    return src ? (
      <img src={src} alt="" className={`absolute h-9 w-9 object-contain ${position}`} />
    ) : (
      <span aria-hidden="true" className={`absolute text-xs font-bold text-red-200 ${position}`}>{c}</span>
    )
  }
  return (
    <div
      role="img"
      aria-label={`Mort : ${first} et ${second}`}
      title={`${first} / ${second}`}
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(to top right, transparent calc(50% - 1.5px), #f87171 calc(50% - 1.5px), #f87171 calc(50% + 1.5px), transparent calc(50% + 1.5px))',
      }}
    >
      {icon(first, 'left-2 top-2')}
      {icon(second, 'bottom-2 right-2')}
    </div>
  )
}

function Cell({ p, index }: { p: Participant; index: number }) {
  const d = dungeons[index]
  const status = cellStatus(p, d)
  const classes = p.classes ?? []
  const split = status === 'death' && classes.length === 2
  return (
    <td
      className={`${split ? 'relative p-0' : 'px-4 py-4'} text-center min-w-[110px] ${startsGroup(d) ? 'border-l-4 border-l-brand-500' : ''} ${cellStyle[status]}`}
    >
      {status === 'completed' && (
        <>
          <span aria-hidden="true" className="text-3xl text-green-400">✓</span>
          <div className="text-xs text-green-400/80 font-semibold">Validé</div>
        </>
      )}
      {status === 'death' && split && <SplitDeath classes={[classes[0], classes[1]]} />}
      {status === 'death' && !split && (
        <>
          <span aria-hidden="true" className="text-3xl text-red-400">☠</span>
          <div className="text-xs text-red-400/80 font-semibold">Mort</div>
        </>
      )}
      {status === 'in-progress' && (
        <>
          <span aria-hidden="true" className="text-3xl text-brand-400 motion-safe:animate-pulse">◉</span>
          <div className="text-xs text-brand-400/80 font-semibold">En cours</div>
        </>
      )}
      {status === 'not-reached' && (
        <>
          <span aria-hidden="true" className="text-xl text-gray-500">-</span>
          <span className="sr-only">{statusLabel[status]}</span>
        </>
      )}
    </td>
  )
}

export default function Classement() {
  const [q, setQ] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  // Ranks are computed on the whole field, so filtering never changes a team's position.
  const ranked = useMemo(() => rankTeams(participants), [])
  const rows = ranked.filter(r => matchesQuery(r.team, q))
  const toggle = (id: string) =>
    setExpanded(s => {
      const n = new Set(s)
      if (!n.delete(id)) n.add(id)
      return n
    })
  const date = formatDate(config.lastRankingUpdate, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="min-h-screen">
      <Hero
        title="Classement des survivants"
        subtitle="Suivez la progression des équipes. Chaque mort lors d'un duotage fige définitivement le parcours au combat atteint."
      >
        <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg px-6 py-4 border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Classement actuel</p>
            <p className="text-lg font-bold text-white">{date}</p>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg px-6 py-4 border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Épreuve</p>
            <p className="text-lg font-bold text-white">{levelRange}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 backdrop-blur-sm rounded-lg px-6 py-4 border border-yellow-600/30">
            <p className="text-sm text-yellow-300 mb-1">Cashprize actuel</p>
            <p className="text-lg font-bold text-yellow-300">
              ≈ {config.cashPrizeMin} – {config.cashPrizeMax} M kamas
            </p>
          </div>
        </div>
      </Hero>

      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 flex justify-end">
          <label className="w-full sm:w-64">
            <span className="sr-only">Rechercher une équipe, un joueur ou une classe</span>
            <input
              type="search"
              placeholder="Ex: Hof"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-gray-400"
            />
          </label>
        </div>

        {/* Mobile: one card per team */}
        <ol className="md:hidden space-y-4">
          {rows.map(({ team: p, rank }) => {
            const open = expanded.has(p.id)
            return (
              <li key={p.id} className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-gray-400 min-w-[2rem]">{rank}</span>
                  <div className="min-w-0 flex-1">
                    <TeamName p={p} open={open} toggle={() => toggle(p.id)} />
                    <Chips p={p} />
                    <p className="text-sm text-gray-400">
                      {validatedCount(p)}/{dungeons.length} combats validés
                    </p>
                    <Status p={p} />
                    <div className="mt-3 flex gap-0.5" role="img" aria-label={`${validatedCount(p)} combats validés sur ${dungeons.length}`}>
                      {dungeons.map(d => (
                        <span
                          key={d.id}
                          title={`${d.name} — ${statusLabel[cellStatus(p, d)]}`}
                          className={`h-2 flex-1 rounded-sm ${segmentStyle[cellStatus(p, d)]}`}
                        />
                      ))}
                    </div>
                    {open && <Stats p={p} />}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Desktop: full table */}
        <div className="relative hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <caption className="sr-only">Progression des équipes combat par combat</caption>
            <thead>
              <tr className="bg-gray-800/50">
                <th
                  scope="col"
                  className="sticky left-0 z-20 bg-gray-800 px-4 py-3 text-left font-bold text-white border-b-2 border-gray-700 min-w-[240px]"
                >
                  # / Team
                </th>
                {dungeons.map(d => (
                  <th
                    key={d.id}
                    scope="col"
                    className={`px-4 py-3 text-center font-semibold text-sm border-b-2 border-gray-700 whitespace-nowrap min-w-[110px] ${startsGroup(d) ? 'border-l-4 border-l-brand-500' : ''}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={import.meta.env.BASE_URL + d.iconUrl}
                        onError={e => {
                          e.currentTarget.style.visibility = 'hidden'
                        }}
                        alt=""
                        width={48}
                        height={48}
                        loading="lazy"
                        className="w-12 h-12 object-contain"
                      />
                      <span className="text-xs text-gray-300">{d.name}</span>
                      <span className="text-xs text-gray-400">
                        Niv. {d.level}
                        {d.freeOrder ? ' • ordre libre' : ''}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ team: p, rank }) => {
                const open = expanded.has(p.id)
                return (
                  <React.Fragment key={p.id}>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-gray-900 px-4 py-4 border-r border-gray-800 text-left font-normal"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl font-bold text-gray-400 min-w-[2rem]">{rank}</span>
                          <div>
                            <TeamName p={p} open={open} toggle={() => toggle(p.id)} />
                            <Chips p={p} />
                            <p className="text-sm text-gray-400">
                              {validatedCount(p)}/{dungeons.length} combats validés
                            </p>
                            <Status p={p} />
                          </div>
                        </div>
                      </th>
                      {dungeons.map((d, i) => (
                        <Cell key={d.id} p={p} index={i} />
                      ))}
                    </tr>
                    {open && p.dungeonStats.length > 0 && (
                      <tr className="bg-gray-800/50">
                        <th
                          scope="row"
                          className="sticky left-0 z-10 bg-gray-800 px-4 py-3 text-left text-xs font-normal text-gray-400"
                        >
                          Tours / Dégâts
                        </th>
                        {dungeons.map(d => {
                          const s = p.dungeonStats.find(x => x.dungeonId === d.id)
                          return (
                            <td key={d.id} className="px-4 py-3 text-center text-xs text-white">
                              {s ? (
                                <>
                                  {s.turns}
                                  <br />
                                  {s.damage.toLocaleString('fr-FR')}
                                </>
                              ) : (
                                <span className="text-gray-500">-</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            {q.trim() ? 'Aucune équipe ne correspond à votre recherche.' : 'Aucun participant enregistré pour le moment.'}
          </div>
        )}
      </section>
    </div>
  )
}
