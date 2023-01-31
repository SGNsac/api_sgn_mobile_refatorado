import express from 'express'
import routerUser from './user.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../../swagger/swagger.json'
import { routerDailyMoviment } from './dailyMoviment.routes'
import routerRequest from './request.routes'
import routerCompany from './company.routes'
import { routerPurchaseOrder } from './purchaseOrder.routes'
const routerV1 = express.Router()

routerV1.use('/usuario', routerUser)
routerV1.use('/dailyMoviment', routerDailyMoviment)
routerV1.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
routerV1.use('/pedido', routerRequest)
routerV1.use('/empresa', routerCompany)
routerV1.use('/solicitacaoCompra', routerPurchaseOrder)

export default routerV1
