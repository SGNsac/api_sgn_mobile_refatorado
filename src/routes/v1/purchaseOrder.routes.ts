import express from 'express'
import { PurchaseOrderController } from '../../controllers/purchaseOrderController'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'

export const routerPurchaseOrder = express.Router()

const purchaseOrderController = new PurchaseOrderController()

routerPurchaseOrder.get('/', isAuthenticatedAcess, purchaseOrderController.list)
routerPurchaseOrder.patch('/', purchaseOrderController.approvalOrderPurchase)
