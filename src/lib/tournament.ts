import dungeonsData from '../data/dungeons.json'
import participantsData from '../data/participants.json'
import config from '../data/config.json'

export interface Dungeon {
  id: string
  name: string
  level: number
  order: number
  iconUrl: string
  freeOrder?: boolean
}

export interface Member {
  pseudo: string
  class?: string
}

export interface Participant {
  id: string
  displayName: string
  members: Member[]
  classes?: string[]
  progressStepId: string | null
  status: 'alive' | 'dead'
  deathStepId: string | null
  dungeonStats: { dungeonId: string; turns: number; damage: number }[]
  lastUpdate: string
}

export type CellStatus = 'completed' | 'death' | 'in-progress' | 'not-reached'

export interface DungeonGroup {
  key: string
  title: string
  hint?: string
  dungeons: Dungeon[]
}

export const dungeons = dungeonsData as Dungeon[]
export const participants = participantsData as Participant[]

export const eventStart = new Date(config.eventStart)
export const eventEnd = new Date(config.eventEnd)
export const levelRange = `${dungeons[0].level} → ${dungeons[dungeons.length - 1].level}`

const PARIS = 'Europe/Paris'

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('fr-FR', { timeZone: PARIS, ...opts }).format(new Date(iso))

/** Consecutive dungeons sharing the same level and ordering rule form one group. */
export const dungeonGroups: DungeonGroup[] = dungeons.reduce<DungeonGroup[]>((groups, d) => {
  const key = `${d.level}-${d.freeOrder ? 'free' : 'fixed'}`
  const last = groups[groups.length - 1]
  if (last && last.key === key) {
    last.dungeons.push(d)
    return groups
  }
  groups.push({
    key,
    title: d.freeOrder
      ? `Combats supplémentaires — niveau ${d.level}`
      : `Combats à effectuer au niveau ${d.level}`,
    hint: d.freeOrder
      ? "À partir de cette étape, les combats peuvent être réalisés dans l'ordre que vous voulez :"
      : 'Respectez l’ordre ci-dessous :',
    dungeons: [d],
  })
  return groups
}, [])

/** Orders of the first dungeon of every group but the first: a divider is drawn before them. */
const groupStarts = new Set(dungeonGroups.slice(1).map(g => g.dungeons[0].order))
export const startsGroup = (d: Dungeon) => groupStarts.has(d.order)

/** Order of the dungeon the team is currently on (0 if it has not started). */
export function currentStep(p: Participant): number {
  const d = dungeons.find(x => x.id === p.progressStepId)
  return d ? d.order : 0
}

/** The ranking is split in three tables according to the fight a team is on (dead teams included). */
const orderOf = (id: string) => dungeons.find(d => d.id === id)?.order ?? 0
const nameOf = (order: number) => dungeons.find(d => d.order === order)?.name ?? ''
const lastOrder = dungeons[dungeons.length - 1].order

export interface Tier {
  id: string
  title: string
  /** First and last fight order of the tier (a team that has not started is on order 0). */
  from: number
  to: number
}

export const tiers: Tier[] = [
  { id: 'dantinea', title: 'Dantinéa et au-delà', from: orderOf('danti'), to: lastOrder },
  { id: 'chene-mou', title: 'À partir du Chêne Mou', from: orderOf('chene-mou'), to: orderOf('danti') - 1 },
  { id: 'debut', title: 'Avant le Chêne Mou', from: 0, to: orderOf('chene-mou') - 1 },
]

/** "Chêne Mou → Bworker" */
export const tierRange = (t: Tier) => `${nameOf(Math.max(t.from, 1))} → ${nameOf(t.to)}`

/** The current step is either in progress or the one the team died on: it is not validated. */
export const validatedCount = (p: Participant) => Math.max(currentStep(p) - 1, 0)

export function cellStatus(p: Participant, d: Dungeon): CellStatus {
  const cur = currentStep(p)
  if (cur > d.order) return 'completed'
  if (cur < d.order || cur === 0) return 'not-reached'
  return p.status === 'dead' ? 'death' : 'in-progress'
}

/**
 * Teams stuck on the same step are tied, a living team being ahead of a dead one.
 * Ties share a rank (1, 1, 3…).
 */
export function rankTeams(list: Participant[]) {
  const score = (p: Participant) => currentStep(p) * 2 + (p.status === 'alive' ? 1 : 0)
  const sorted = [...list].sort(
    (a, b) => score(b) - score(a) || a.displayName.localeCompare(b.displayName, 'fr'),
  )
  return sorted.map(team => ({
    team,
    rank: sorted.findIndex(t => score(t) === score(team)) + 1,
  }))
}

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function matchesQuery(p: Participant, query: string) {
  const q = fold(query.trim())
  if (!q) return true
  return [p.displayName, ...p.members.flatMap(m => [m.pseudo, m.class ?? '']), ...(p.classes ?? [])].some(s =>
    fold(s).includes(q),
  )
}

export const inTier = (p: Participant, t: Tier) => {
  const step = currentStep(p)
  return step >= t.from && step <= t.to
}
