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
    id: Math.max(...parkings.map(d => d.id)) + 1,
    ...newParkingEntry
  }
  parkings.push(newParking)
  return newParking
}

const equalsArray = (pathsCurrent: [], pathsFuture: []): boolean => {
  return pathsCurrent.length === pathsFuture.length && pathsFuture.every(function (a, b) { return a === pathsCurrent[b] })
}

export const editParking = (id: number, newParkingEntry: NewParkingEntry): ParkingEntry => {
  const indexForParking = parkings.findIndex(d => d.id === id)
  const pathCurrentImages = JSON.parse(JSON.stringify(parkings.find(d => d.id === id))).map((f: any) => f.images)
  const pathFutureImages = JSON.parse(JSON.stringify(newParkingEntry)).map((f: any) => f.images)
  if (!equalsArray(pathCurrentImages.fileName, pathFutureImages.fileName)) {
    try {
      pathCurrentImages?.path.map((file: fs.PathLike) => fs.unlinkSync(file))
    } catch (e) {
      console.error('Something wrong happened removing the files', e)
    }
  }
  const editParking = {
    ...parkings[indexForParking],
    ...newParkingEntry
  }
  return editParking
}

export const deleteParking = (id: number): ParkingEntry[] => {
  const indexForParking = parkings.findIndex(d => d.id === id)
  const pathImages = JSON.parse(JSON.stringify(parkings.find(d => d.id === id))).map((f: any) => f.images)
  try {
    pathImages?.path.map((file: fs.PathLike) => fs.unlinkSync(file))
  } catch (e) {
    console.error('Something wrong happened removing the files', e)
  }
  parkings.slice(indexForParking, 1)
  return parkings
}
