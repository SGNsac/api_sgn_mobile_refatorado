import { Request, Response } from 'express'
import { ListPedidoService } from '../services/request/ListPedidoService'
import { ListPedidoNumberService } from '../services/request/ListPedidoNumberService'
import { ListPedidoFornService } from '../services/request/ListPedidoFornService'
import { ListPedidoFuncService } from '../services/request/ListPedidoFuncService'
import { ApprovalRequestService } from '../services/request/approvalRequest'
import { GetDetailsRequestServices } from '../services/request/getDetailsRequestServices'
import { selectCerePeitPedi } from '../queries/request'
import { PedidoEstoqueRepository } from '../typeorm/repository/pedidoEstoqueRepositories'
import { validCereFornPedi } from '../services/request/validCereForn'
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
    const { USUA_SENHA_APP, posUsuaCod, pediCod, fornCod, valTotal } = request.body

    const approvalRequestService = new ApprovalRequestService()
    const sql = selectCerePeitPedi(pediCod)
    const sqlExec = await PedidoEstoqueRepository.query(sql)

    for (let i = 0; i < sqlExec.length; i++) {
      const valid = await validCereFornPedi(acessToken, sqlExec[i].CERE_COD, valTotal, fornCod, pediCod)
      if (valid.error === true) {
        return response.status(valid.status).json(valid)
      }
    }

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

    const pedidosTxt:string[] = []
    let status = 200
    let error = false
    for await (const item of arrayPedido) {
      const sql = selectCerePeitPedi(item[1])

      const sqlExec = await PedidoEstoqueRepository.query(sql)

      for (let i = 0; i < sqlExec.length; i++) {
        //  validCereFornPedi - função para validar os parametro
        const valid = await validCereFornPedi(acessToken, sqlExec[i].CERE_COD, item[2], item[3], item[1])

        if (valid.error === true) {
          pedidosTxt.push(valid.message)
          status = 400
          error = true
          break
        }

        if (i === sqlExec.length || valid.error === false) {
          const approvalRequestService = new ApprovalRequestService()
          const approvalRequestExec = await approvalRequestService.execute(acessToken, USUA_SENHA_APP, item[0], item[1])
          pedidosTxt.push(approvalRequestExec.message)
        }
      }
    }

    return response.status(status).json({
      message: pedidosTxt,
      error,
      status
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
