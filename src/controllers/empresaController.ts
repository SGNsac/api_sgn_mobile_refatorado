import { Request, Response } from 'express'
import AppError from '../errors/AppError'
import { ListCompanyUserService } from '../services/company/ListCompanyUserService'
export default class CompanyController {
  public async list (request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      throw new AppError('Token is missing')
    }
    const [, acessToken] = authHeader.split(' ')

    const listCompanyUserService = new ListCompanyUserService()

    const execute = await listCompanyUserService.execute(acessToken)

    return response.json(execute)
  }
}
