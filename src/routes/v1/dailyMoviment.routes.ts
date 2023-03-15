import express from 'express'
import DailyMovimentController from '../../controllers/dailyMovimentController'

export const routerDailyMoviment = express.Router()

const DailyMoviment = new DailyMovimentController()

routerDailyMoviment.get('/', DailyMoviment.list)
routerDailyMoviment.get('/cmbAplicacao', DailyMoviment.listCmb)
routerDailyMoviment.get('/aplicacao', DailyMoviment.FilterAplicacaoNome)
routerDailyMoviment.get('/aplicacaoData', DailyMoviment.FilterAplicacaoDataAndApl)
routerDailyMoviment.get('/details/aplicacaoData', DailyMoviment.DetailsAplicacaoDataAndApl)
