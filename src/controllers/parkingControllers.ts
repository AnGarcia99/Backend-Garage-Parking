/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'
import { handleHttp } from '../utils/errors.handle'
import * as parkingServices from '../services/parkingServices'
import toNewParkingEntry from '../models/utils'

export const getItems = (_req: Request, res: Response) => {
  try {
    res.send(parkingServices.getParkings())
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM', e)
  }
}

export const getItemByMaxTotal = (_req: Request, res: Response) => {
  try {
    res.send(parkingServices.findByMaxTotal())
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM', e)
  }
}

export const getItemByMinTotal = (_req: Request, res: Response) => {
  try {
    res.send(parkingServices.findByMinTotal())
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM', e)
  }
}

export const getItemsByAny = ({ params }: Request, res: Response) => {
  try {
    res.send(parkingServices.findByAny(params))
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM', e)
  }
}

export const getItemsByAmenities = ({ params }: Request, res: Response) => {
  try {
    res.send(parkingServices.findByAmenities(params.param))
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM', e)
  }
}

export const postItem = ({ body, files }: Request, res: Response) => {
  try {
    const imagesArray = JSON.parse(JSON.stringify(files)).map((f: { filename: any, path: any }) => ({ fileName: f.filename, path: f.path }))
    const dataToRegister = {
      address: `${body?.address}`,
      amenities: body.amenities,
      score: body.score,
      price: body.price,
      totalPrice: body.totalPrice,
      type: `${body?.type}`,
      images: imagesArray,
      description: `${body?.description}`
    }
    const newParkingEntry = toNewParkingEntry(dataToRegister)
    const addedParkingEntry = parkingServices.addParking(newParkingEntry)
    res.json(addedParkingEntry)
  } catch (e) {
    handleHttp(res, 'ERROR_POST_ITEM', e)
  }
}

export const putItem = ({ params, body, files }: Request, res: Response) => {
  try {
    const imagesArray = JSON.parse(JSON.stringify(files)).map((f: { filename: any, path: any }) => ({ fileName: f.filename, path: f.path }))
    const dataToRegister = {
      address: `${body?.address}`,
      amenities: body.amenities,
      score: body.score,
      price: body.price,
      totalPrice: body.totalPrice,
      type: `${body?.type}`,
      images: imagesArray,
      description: `${body?.description}`
    }
    const editParkingEntry = toNewParkingEntry(dataToRegister)
    const editedParkingEntry = parkingServices.editParking(+params.id, editParkingEntry)
    res.json(editedParkingEntry)
  } catch (e) {
    handleHttp(res, 'ERROR_PUT_ITEM', e)
  }
}

export const deleteItem = ({ params }: Request, res: Response) => {
  try {
    res.send(parkingServices.deleteParking(+params.id))
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE_ITEM', e)
  }
}
