import express from 'express'

import {loginUser, registerUser, findUser, getUser} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/find/:userId', findUser)
router.get('/', getUser)

export default router