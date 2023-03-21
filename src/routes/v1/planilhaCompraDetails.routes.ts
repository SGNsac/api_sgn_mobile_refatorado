import { Router } from 'express';
import AprovadoresPlanilhaController from '../../controllers/planilhaCompra/details/AprovadoresPlanilhaController';
import PlanilhaDataController from '../../controllers/planilhaCompra/details/PlanilhaDataController';
import PlanilhaFornecedoresController from '../../controllers/planilhaCompra/details/PlanilhaFornecedoresController';
import PlanilhaSolicitacoesController from '../../controllers/planilhaCompra/details/PlanilhaSolicitacoesController';

const planilhaCompraDeatils = Router();

planilhaCompraDeatils.get(
  '/aprovadores/:planilhaId',
  new AprovadoresPlanilhaController().handle
);

planilhaCompraDeatils.get(
  '/planilhaData/:planilhaId',
  new PlanilhaDataController().handle
);

planilhaCompraDeatils.get(
  '/fornecedores/:planilhaId',
  new PlanilhaFornecedoresController().handle
);

planilhaCompraDeatils.get(
  '/solicitacoes/:planilhaId',
  new PlanilhaSolicitacoesController().handle
);

export default planilhaCompraDeatils;
