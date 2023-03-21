import { Request, Response } from 'express';
import AprovaPlanilhaCompraService from '../../services/planilhaCompra/AprovaPlanilhaCompraService';

class AprovaPlanilhaCompraController {
  async handle (request: Request, response: Response) {
    const { url, database } = request.body;
    const userId = request.globalCodigo;
    const { planilhaId } = request.params;

    const aprovaPlanilhaCompraService = new AprovaPlanilhaCompraService();

    const aprovaPlanilhaCompra = await aprovaPlanilhaCompraService.execute(
      url,
      database,
      userId,
      planilhaId
    );

    return response.status(200).json(aprovaPlanilhaCompra);
  }
}

export default AprovaPlanilhaCompraController;
