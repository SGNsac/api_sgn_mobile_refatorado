import { Request, Response } from 'express'
import { ServiceContractBulletinService } from '../services/serviceContractBulletin/listServiceContractBulletin'
import { ListDetailsBulletin } from '../services/serviceContractBulletin/listDetailsService'
import { ApprovalBulletinService } from '../services/serviceContractBulletin/approvalService'

interface IBocsArray {
  cod: string;
  pos: string;
}

export class ServiceContractBulletinController {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const serviceContractBulletinService = new ServiceContractBulletinService()

    const result = await serviceContractBulletinService.execute(acessToken, '')

    return response.json(result)
  }

  public async listCodContract (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const serviceContractBulletinService = new ServiceContractBulletinService()

    const { cod } = request.params

    const queryString = `
    AND
      BOCS_COCS_COD = ${cod}
    `

    const result = await serviceContractBulletinService.execute(acessToken, queryString)

    return response.json(result)
  }

  public async listNumberContract (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const serviceContractBulletinService = new ServiceContractBulletinService()

    const { number } = request.params

    const queryString = `
    AND
      BOCS_NUMERO = '${number}'
    `

    const result = await serviceContractBulletinService.execute(acessToken, queryString)

    return response.json(result)
  }

  public async listDetails (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const listDetailsBulletin = new ListDetailsBulletin()

    const { cod } = request.params

    const result = await listDetailsBulletin.execute(cod)

    return response.json(result)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const approvalBulletinService = new ApprovalBulletinService()

    const { password, arrayBoletimC } = request.body

    let msgCocs = ''

    arrayBoletimC.forEach(async (item: IBocsArray[]) => {
      msgCocs = `${msgCocs} ${item[0]}`
      await approvalBulletinService.execute(
        acessToken,
        item[0] + '',
        item[1] + '',
        password
      )
    })

    return response.json(msgCocs)
  }
}
