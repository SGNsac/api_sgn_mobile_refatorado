import { Request, Response } from 'express';
import AprovadoresPlanilhaService from '../../../services/planilhaCompra/datailsPlanilhaCompra/AprovadoresPlanilhaService';

export default class AprovadoresPlanilhaController {
  async handle(request: Request, response: Response) {
    const { url, database } = request.body;
    const userId = request.globalCodigo;
    const { planilhaId } = request.params;

    const aprovadoresPlanilhaService = new AprovadoresPlanilhaService();

    const aprovadoresPlanilha = await aprovadoresPlanilhaService.execute(
      url,
      database,
      userId,
      planilhaId
    );

    return response.status(200).json(aprovadoresPlanilha);
  }
}
