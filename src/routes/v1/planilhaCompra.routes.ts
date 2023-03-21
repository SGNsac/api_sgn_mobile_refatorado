import { Router } from 'express';
import AprovaPlanilhaCompraController from '../../controllers/planilhaCompra/AprovaPlanilhaCompraController';
import ListPlanilhaCompraController from '../../controllers/planilhaCompra/ListPlanilhaCompraController';

const planilhaCompraRoutes = Router();

planilhaCompraRoutes.get('/', new ListPlanilhaCompraController().handle);

planilhaCompraRoutes.patch('/:planilhaId', new AprovaPlanilhaCompraController().handle);

export default planilhaCompraRoutes;
