import {EventController} from '@controllers/event.controller'
import { wrap } from '@lib/wrapAsync'
import {Router} from 'express'

const router = Router()
const eventController = new EventController()
const eventWrap = wrap(eventController)

router.post('/upload',eventWrap(eventController.uploadImageGetSignedUrl))
router.post('/',eventWrap(eventController.createEvent))


export default router