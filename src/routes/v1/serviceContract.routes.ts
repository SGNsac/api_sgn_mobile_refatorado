import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { ServiceContract } from '../../controllers/serviceContract'

export const routerServiceContract = express.Router()

const serviceContract = new ServiceContract()

routerServiceContract.get('/', isAuthenticatedAcess, serviceContract.list)
routerServiceContract.patch('/', isAuthenticatedAcess, serviceContract.approval)
