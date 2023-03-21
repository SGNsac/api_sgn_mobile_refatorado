import { Request, Response } from 'express';
import PlanilhaFornecedoresService from '../../../services/planilhaCompra/datailsPlanilhaCompra/PlanilhaFornecedoresService';

export default class PlanilhaFornecedoresController {
  async handle(request: Request, response: Response) {
    const { url, database } = request.body;
    const userId = request.globalCodigo;
    const { planilhaId } = request.params;

    const planilhaFornecedoresService = new PlanilhaFornecedoresService();

    const planilhaFornecedores = await planilhaFornecedoresService.execute(
      url,
      database,
      userId,
      planilhaId
    );

    return response.status(200).json(planilhaFornecedores);
  }
}
