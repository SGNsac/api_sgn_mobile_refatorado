import { Request, Response } from 'express'
import { ListServiceContractServices } from '../services/serviceContract/listServiceContractServices'
import { ApprovalServiceContract } from '../services/serviceContract/approvalServiceContract'

interface ICocsArray {
  status: number;
  message: string;
  erro: boolean;
}

export class ServiceContract {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const listServiceContractServices = new ListServiceContractServices()

    const execute = await listServiceContractServices.execute(acessToken)

    return response.json(execute)
  }

  public async approval (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, acessToken] = authHeader.split(' ')

    const { password, arrayCocs } = request.body

    const approvalServiceContract = new ApprovalServiceContract()

    let msgCocs = ''

    arrayCocs.forEach(async (item: ICocsArray[]) => {
      msgCocs = `${msgCocs} ${item[0]}`
      console.log(item)
      await approvalServiceContract.execute(
        acessToken, item[1] + '', item[0] + '', password
      )
    })

    return response.status(200).json({
      message: 'Contratos' + msgCocs + ' aprovados'
    })
  }
}
