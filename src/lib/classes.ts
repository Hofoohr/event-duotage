const ids: Record<string, number> = {
  Féca: 1,
  Osamodas: 2,
  Enutrof: 3,
  Sram: 4,
  Xelor: 5,
  Ecaflip: 6,
  Eniripsa: 7,
  Iop: 8,
  Crâ: 9,
  Sadida: 10,
  Sacrieur: 11,
  Pandawa: 12,
  Roublard: 13,
  Zobal: 14,
  Steameur: 15,
  Eliotrope: 16,
  Huppermage: 17,
  Ouginak: 18,
  Forgelance: 20,
}

export const classIcon = (name: string) =>
  ids[name] ? `${import.meta.env.BASE_URL}classes/${ids[name]}.png` : undefined

/** Illustration files in public/classes, named after the class. */
const portraits: Record<string, string> = {
  Féca: 'feca',
  Osamodas: 'osa',
  Enutrof: 'enu',
  Sram: 'sram',
  Xelor: 'xelor',
  Ecaflip: 'eca',
  Eniripsa: 'eni',
  Iop: 'iop',
  Crâ: 'cra',
  Sadida: 'sadi',
  Sacrieur: 'sacri',
  Pandawa: 'panda',
  Roublard: 'roub',
  Zobal: 'zobal',
  Steameur: 'steamer',
  Eliotrope: 'elio',
  Huppermage: 'hupper',
  Ouginak: 'ougi',
  Forgelance: 'forgelance',
}

export const classPortrait = (name: string) =>
  portraits[name] ? `${import.meta.env.BASE_URL}classes/${portraits[name]}.jpg` : undefined
