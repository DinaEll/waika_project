interface Player {
  positon: number
  avatar: string | null | undefined
  name: string
  points: number
}

export const players: Player[] = [
  { positon: 1, avatar: null, name: 'Max_Fox', points: 60_000 },
  { positon: 2, avatar: null, name: 'Kira', points: 59_000 },
  { positon: 3, avatar: null, name: 'Mila Sila', points: 51_000 },
  { positon: 4, avatar: null, name: 'Cat_banan_new_star_wars', points: 29_777 },
  { positon: 500, avatar: null, name: 'Kola Pepe', points: 9_777 },
  { positon: 9_400, avatar: null, name: 'Kola', points: 7 },
]
