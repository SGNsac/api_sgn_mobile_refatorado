import { Request, Response } from 'express';
import PlanilhaDataService from '../../../services/planilhaCompra/datailsPlanilhaCompra/PlanilhaDataService';

export default class PlanilhaDataController {
  async handle(request: Request, response: Response) {
    const { url, database } = request.body;
    const userId = request.globalCodigo;
    const { planilhaId } = request.params;


    const planilhaDataService = new PlanilhaDataService();

    const planilhData = await planilhaDataService.execute(
      url,
      database,
      userId,
      planilhaId
    );

    return response.status(200).json(planilhData);

  }
}
