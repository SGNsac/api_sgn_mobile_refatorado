import { Request, Response } from 'express'
import { ListScheduleService } from '../services/schedule/listService'

export class ScheduleControllers {
  public async list (request: Request, response: Response): Promise<Response> {
    const { url, database } = request.body
    const listScheduleService = new ListScheduleService()
    const listScheduleServiceExec = await listScheduleService.execute(url, database)
    return response.json(listScheduleServiceExec)
  }
}
