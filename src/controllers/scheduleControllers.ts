import { Request, Response } from 'express'
import { ListScheduleService } from '../services/schedule/listService'

export class ScheduleControllers {
  public async list (request : Request, response : Response): Promise<Response> {
    const listScheduleService = new ListScheduleService()
    const listScheduleServiceExec = await listScheduleService.execute()
    return response.json(listScheduleServiceExec)
  }
}
