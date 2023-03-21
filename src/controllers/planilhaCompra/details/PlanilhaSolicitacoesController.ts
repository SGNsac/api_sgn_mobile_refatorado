import { Request, Response } from 'express';
import PlanilhaSolicitacoesService from '../../../services/planilhaCompra/datailsPlanilhaCompra/PlanilhaSolicitacoesService';

export default class PlanilhaSolicitacoesController {
  async handle(request: Request, response: Response) {
    const { url, database } = request.body;
    const userId = request.globalCodigo;
    const { planilhaId } = request.params;

    const planilhaSolicitacoesService = new PlanilhaSolicitacoesService();

    const planilhaSolicitacoes = await planilhaSolicitacoesService.execute(
      url,
      database,
      userId,
      planilhaId
    );

    return response.status(200).json(planilhaSolicitacoes);
  }
}
