/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NewParkingEntry, ParkingEntry } from '../interfaces/types'
import parkingData from '../models/db.json'
import fs from 'fs'

const parkings: ParkingEntry[] = parkingData as ParkingEntry[]

export const getParkings = (): ParkingEntry[] => parkings

export const findByMaxTotal = (): ParkingEntry | undefined => {
  const entry = parkings.find(d => Math.max(d.totalPrice))
  return entry
}

export const findByMinTotal = (): ParkingEntry | undefined => {
  const entry = parkings.find(d => Math.min(d.totalPrice))
  return entry
}

export const findByAny = (param: any): ParkingEntry[] | ParkingEntry | undefined => {
  const entry = parkings.filter(d => d === param)
  return entry
}

export const findByAmenities = (amenities: string): ParkingEntry[] | ParkingEntry | undefined => {
  const entry = parkings.filter(d => d.amenities.find(b => b === amenities))
  return entry
}

export const addParking = (newParkingEntry: NewParkingEntry): ParkingEntry => {
  const newParking = {
    id: parkings.length !== 0 ? Math.max(...parkings.map(d => d.id)) + 1 : 1,
    ...newParkingEntry
  }
  parkings.push(newParking)
  const jsonParking = JSON.stringify(parkings)
  fs.writeFileSync('./src/models/db.json', jsonParking, 'utf-8')
  return newParking
}

const equalsArray = (pathsCurrent: any[], pathsFuture: string[]): boolean => {
  return pathsCurrent.length === pathsFuture.length && pathsFuture.every(function (a, b) { return a === pathsCurrent[b] })
}

export const editParking = (id: number, newParkingEntry: NewParkingEntry): ParkingEntry => {
  const indexForParking = parkings.findIndex(d => d.id === id)
  const CurrentImages = parkings.find(d => d.id === id)?.images.map(f => f)
  const FutureImages = newParkingEntry.images
  if (!equalsArray([CurrentImages?.map(f => f.fileName)], FutureImages.map(f => f.fileName))) {
    try {
      CurrentImages?.map(f => f.path).map((file: fs.PathLike) => fs.unlinkSync(file))
    } catch (e) {
      console.error('Something wrong happened removing the files', e)
    }
  }
  const editParking = {
    ...parkings[indexForParking],
    ...newParkingEntry
  }
  const jsonParking = JSON.stringify(editParking)
  fs.writeFileSync('./src/models/db.json', jsonParking, 'utf-8')
  return editParking
}

export const deleteParking = (id: number): ParkingEntry[] => {
  const indexForParking = parkings.findIndex(d => d.id === id)
  const pathImages = parkings.find(d => d.id === id)?.images.map(f => f.path)
  try {
    pathImages?.map((file: fs.PathLike) => fs.unlinkSync(file))
  } catch (e) {
    console.error('Something wrong happened removing the files', e)
  }
  parkings.slice(indexForParking, 1)
  const jsonParking = JSON.stringify(parkings)
  fs.writeFileSync('./src/models/db.json', jsonParking, 'utf-8')
  return parkings
}
