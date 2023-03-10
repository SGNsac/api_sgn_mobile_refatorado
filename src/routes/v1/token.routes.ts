import express from 'express'
import TokenController from '../../controllers/tokenControllers'

const tokenController = new TokenController()

export const routerToken = express.Router()

routerToken.get('/', tokenController.generateToken)
