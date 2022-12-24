import express from 'express'
import * as parkingControllers from '../controllers/parkingControllers'
import fileMiddleware from '../middleware/fileMiddleware'

const router = express.Router()

router.get('/', parkingControllers.getItems)
router.get('/maxtotal/', parkingControllers.getItemByMaxTotal)
router.get('/mintotal/', parkingControllers.getItemByMinTotal)
router.get('/any/:param', parkingControllers.getItemsByAny)
router.get('/amenities/:param', parkingControllers.getItemsByAmenities)
router.post('/add/', fileMiddleware.array('images'), parkingControllers.postItem)
router.put('/edit/:id', fileMiddleware.array('images'), parkingControllers.putItem)
router.delete('/delete/:id', parkingControllers.deleteItem)

export default router
