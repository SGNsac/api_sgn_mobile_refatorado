/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { ListPedidoService } from '../services/request/ListPedidoService'
import { ListPedidoNumberService } from '../services/request/ListPedidoNumberService'
import { ListPedidoFornService } from '../services/request/ListPedidoFornService'
import { ListPedidoFuncService } from '../services/request/ListPedidoFuncService'
import { ApprovalRequestService } from '../services/request/approvalRequest'
import { GetDetailsRequestServices } from '../services/request/getDetailsRequestServices'
export default class DailyMovimentController {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listPedidoService = new ListPedidoService()

    const execute = await listPedidoService.execute(acessToken)

    return response.json(execute)
  }

  public async listNumber (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { numero } = request.params

    const listPedidoNumberService = new ListPedidoNumberService()

    const execute = await listPedidoNumberService.execute(acessToken, numero)

    return response.json(execute)
  }

  public async listForn (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { forn } = request.params

    const listPedidoFornService = new ListPedidoFornService()

    const execute = await listPedidoFornService.execute(acessToken, forn)

    return response.json(execute)
  }

  public async listFunc (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { func } = request.params

    const listPedidoFuncService = new ListPedidoFuncService()

    const execute = await listPedidoFuncService.execute(acessToken, func)

    return response.json(execute)
  }

  public async approvalRequest (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')
    const { USUA_SENHA_APP, posUsuaCod, pediCod } = request.body

    const approvalRequestService = new ApprovalRequestService()

    const approvalRequestExec = await approvalRequestService.execute(acessToken, USUA_SENHA_APP, posUsuaCod, pediCod)

    return response.status(approvalRequestExec.status).json(approvalRequestExec)
  }

  public async approvalLargeScale (request: Request, response: Response) {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }

    const [, acessToken] = authHeader.split(' ')

    const { USUA_SENHA_APP, arrayPedido } = request.body

    let pedidosTxt = ''

    arrayPedido.forEach(async (item: any) => {
      pedidosTxt = `${pedidosTxt} ${item[2]}`

      const approvalRequestService = new ApprovalRequestService()

      await approvalRequestService.execute(acessToken, USUA_SENHA_APP, item[1], item[0])
    })

    return response.status(200).json({
      message: `Pedido ${pedidosTxt} aprovado com sucesso`,
      error: false,
      status: 200
    })
  }

  public async ListItems (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'Token is missing' })
    }
    const { pediCod } = request.params

    const getDetailsRequestServices = new GetDetailsRequestServices()

    const execute = await getDetailsRequestServices.execute(pediCod)

    return response.json(execute)
  }
}
