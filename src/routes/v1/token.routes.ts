import express from 'express'
import TokenController from '../../controllers/tokenControllers'
import isAuthenticatedRefresh from '../../middlewares/isAuthenticatedRefresh'

const tokenController = new TokenController()

export const routerToken = express.Router()

routerToken.get('/', isAuthenticatedRefresh, tokenController.generateToken)
