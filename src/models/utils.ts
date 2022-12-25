import { NewParkingEntry, Type } from '../interfaces/types'

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isStringArray = (string: any[]): boolean => {
  return [string].every(i => typeof i === 'string')
}

const isNumber = (number: any): boolean => {
  return isNaN(number)
}

const isType = (param: any): boolean => {
  return Object.values(Type).includes(param)
}

const isImages = (param: any): boolean => {
  return Object.keys(param).length <= 5
}

const parseAddress = (addressFromRequest: any): string => {
  if (!isString(addressFromRequest)) {
    throw new Error('Incorrect or missing Address')
  }

  return addressFromRequest
}

const parseAmenities = (amenitiesFromRequest: any): string[] => {
  if (!isStringArray(amenitiesFromRequest)) {
    throw new Error('Incorrect or missing Amenities')
  }

  return amenitiesFromRequest
}

const parseScore = (scoreFromRequest: any): number => {
  if (isNumber(scoreFromRequest)) {
    throw new Error('Incorrect or missing Score')
  }

  return scoreFromRequest
}

const parsePrice = (priceFromRequest: any): number => {
  if (isNumber(priceFromRequest)) {
    throw new Error('Incorrect or missing Price')
  }

  return priceFromRequest
}

const parseTotalPrice = (totalPriceFromRequest: any): number => {
  if (isNumber(totalPriceFromRequest)) {
    throw new Error('Incorrect or missing Total Price')
  }

  return totalPriceFromRequest
}

const parseType = (typeFromRequest: any): Type => {
  if (!isString(typeFromRequest) || !isType(typeFromRequest)) {
    throw new Error('Incorrect or missing Type')
  }

  return typeFromRequest
}

const parseImages = (imagesFromRequest: any): [{ fileName: string, path: string }] => {
  if (!isImages(imagesFromRequest)) {
    throw new Error('Incorrect or missing Images')
  }

  return imagesFromRequest
}

const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest)) {
    throw new Error('Incorrect or missing Description')
  }

  return descriptionFromRequest
}

const toNewParkingEntry = (object: any): NewParkingEntry => {
  const newParking: NewParkingEntry = {
    address: parseAddress(object.address),
    amenities: parseAmenities(object.amenities),
    score: parseScore(object.score),
    price: parsePrice(object.price),
    totalPrice: parseTotalPrice(object.totalPrice),
    type: parseType(object.type),
    images: parseImages(object.images),
    description: parseDescription(object.description)
  }
  return newParking
}

export default toNewParkingEntry
