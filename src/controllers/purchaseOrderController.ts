import { Request, Response } from 'express'
import { ListPurchaseOrderService } from '../services/purchase_order/listPurchaseOrder'
import { ApprovalPurchaseOrderService } from '../services/purchase_order/approvalPurchaseOrder'

export class PurchaseOrderController {
  public async list (request: Request, response: Response) {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listPurchaseOrderService = new ListPurchaseOrderService()

    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(acessToken)

    response.json(listPurchaseOrderServiceExec)
  }// ApprovalPurchaseOrderService

  public async approvalOrderPurchase (request: Request, response: Response) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

    const approvalPurchaseOrderService = new ApprovalPurchaseOrderService()

    const {
      USUA_SENHA_APP,
      posUsuaCod,
      socoCod,
      valorTotalSoco
    } = request.body

    const approvalPurchaseOrderServiceExec = await approvalPurchaseOrderService.execute(
      acessToken,
      USUA_SENHA_APP,
      posUsuaCod,
      socoCod,
      valorTotalSoco)

    return response.status(approvalPurchaseOrderServiceExec.status).json(approvalPurchaseOrderServiceExec)
  }
}
