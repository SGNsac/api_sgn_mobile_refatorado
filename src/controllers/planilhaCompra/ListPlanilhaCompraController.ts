import { Request, Response } from 'express';
import ListPlanilhaCompraService from '../../services/planilhaCompra/ListPlanilhaCompraService';

class ListPlanilhaCompraController {
  async handle (request: Request, response: Response) {
    const { url, database } = request.body;
    const userId = request.globalCodigo;

    const listPlanilhaCompraService = new ListPlanilhaCompraService();

    const listPlanilhaCompra = await listPlanilhaCompraService.execute(
      url,
      database,
      userId
    );
    return response.status(200).json(listPlanilhaCompra);
  }
}

export default ListPlanilhaCompraController;
