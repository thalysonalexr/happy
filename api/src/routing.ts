import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { OrphanagesController } from '@controllers/OrphanagesController'

const routing = Router()
const upload = multer(uploadConfig)

routing.post('/orphanages', upload.array('images'), OrphanagesController.store)
routing.get('/orphanages', OrphanagesController.index)
routing.get('/orphanages/:id', OrphanagesController.show)

export { routing }
