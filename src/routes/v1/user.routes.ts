import express from 'express'
import UserController from '../../controllers/userControllers'

export const routerUser = express.Router()

const users = new UserController()

routerUser.patch('/', users.tradePassword)
routerUser.post('/login', users.login)
