import { Request, Response } from 'express'
import { GetDailyMovimentServices } from '../services/dayleMoviment/GetDailyMovimentServices'
import { GetDailyMovimentComboAplicacaoServices } from '../services/dayleMoviment/GetDailyMovimentComboAplicacaoServices'
import { FilterAplicacao } from '../services/dayleMoviment/FilterAplicacaoService'
import { FilterDataAndAplMovimentService } from '../services/dayleMoviment/FilterDataAndAplMovimentService'
import { DetailsMoivmentService } from '../services/dayleMoviment/DetailsMoivmentService'

export default class DailyMovimentController {
  public async list (request: Request, response: Response): Promise<Response> {
    const { url, database } = request.body
    const getDailyMovimentServices = new GetDailyMovimentServices()
    const execute = await getDailyMovimentServices.execute(
      request.globalCodigo,
      url,
      database
    )

    return response.json(execute)
  }

  public async listCmb (request: Request, response: Response): Promise<Response> {
    const { url, database } = request.body

    const getDailyMovimentComboAplicacaoServices = await new GetDailyMovimentComboAplicacaoServices()

    const execute = await getDailyMovimentComboAplicacaoServices.execute(
      request.globalCodigo,
      url,
      database
    )

    return response.status(execute.status).json(execute)
  }

  public async FilterAplicacaoNome (request: Request, response: Response): Promise<Response> {
    const { aplicacao, url, database } = request.body

    if (!aplicacao) {
      return response.status(400).json({ message: 'Data is missing' })
    }

    const filterAplicacao = await new FilterAplicacao()

    const execute = await filterAplicacao.execute(
      request.globalCodigo,
      aplicacao,
      url,
      database
    )

    return response.status(execute.status).json(execute)
  }

  public async FilterAplicacaoDataAndApl (request: Request, response: Response): Promise<Response> {
    const { aplicacao, dataIni, dataFim, url, database } = request.body

    if (!dataIni || !dataFim) {
      return response.status(400).json({ message: 'Data is missing' })
    }

    const filterDataAndAplMovimentService = new FilterDataAndAplMovimentService()

    const execute = await filterDataAndAplMovimentService.execute(
      request.globalCodigo,
      dataIni,
      dataFim,
      aplicacao,
      url,
      database
    )

    return response.status(execute.status).json(execute)
  }

  public async DetailsAplicacaoDataAndApl (request: Request, response: Response): Promise<Response> {
    const { aplicacao, date, url, database } = request.body

    if (!date) {
      return response.status(400).json({ message: 'Data is missing' })
    }

    const detailsMoivmentService = new DetailsMoivmentService()

    if (!aplicacao) {
      const execute = await detailsMoivmentService.execute(request.globalCodigo, date.toString(), '', url, database)

      return response.json(execute)
    }

    const execute = await detailsMoivmentService.execute(request.globalCodigo, date.toString(), aplicacao.toString(), url, database)

    return response.status(execute.status).json(execute)
  }
}
