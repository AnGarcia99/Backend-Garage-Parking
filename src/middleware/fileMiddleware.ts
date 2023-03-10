/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request } from 'express'
import multer, { diskStorage } from 'multer'

const PATH_STORAGE = './storage'

const storage = diskStorage({
  destination (_req: Request, _file: Express.Multer.File, cb: any) {
    cb(null, PATH_STORAGE)
  },
  filename (_req: Request, file: Express.Multer.File, cb: any) {
    const ext = file.originalname.split('.').pop()
    const fileNameRandom = `image-${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`
    cb(null, fileNameRandom)
  }
})

const multerMiddleware = multer({ storage })

export default multerMiddleware
