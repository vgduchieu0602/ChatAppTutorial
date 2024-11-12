import express from 'express'
import { createMesssage, getMessage } from '../controllers/messsage.controller.js'

const router = express.Router()

router.post('/', createMesssage)
router.get('/:chatId', getMessage)

export default router