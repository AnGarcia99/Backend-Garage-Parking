export enum Type { Publico = 'Público', Privado = 'Privado' }

export interface ParkingEntry {
  id: number
  address: string
  amenities: string[]
  score: number
  price: number
  totalPrice: number
  type: Type
  images: [{ fileName: string, path: string }]
  description: string
}

export type NewParkingEntry = Omit<ParkingEntry, 'id'>
