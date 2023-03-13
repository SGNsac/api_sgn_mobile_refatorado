import express from 'express'
import RequestController from '../../controllers/requestController'

export const routerRequest = express.Router()

const request = new RequestController()

routerRequest.get('/', request.list)
routerRequest.get('/numero', request.listNumber)
routerRequest.get('/forn', request.listForn)
routerRequest.get('/func', request.listFunc)
routerRequest.patch('/', request.approvalRequest)
routerRequest.patch('/largeScale', request.approvalLargeScale)
routerRequest.get('/detalhe', request.ListItems)
