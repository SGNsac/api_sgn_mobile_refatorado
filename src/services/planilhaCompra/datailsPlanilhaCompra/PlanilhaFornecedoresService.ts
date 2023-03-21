import { queryStringConnect } from '../../../sql';
import sql from 'mssql';

export default class PlanilhaFornecedoresService {
  async execute(
    url: string,
    database: string,
    userId: string,
    planilhaId: string
  ) {
    try {
      // conexão com banco
      const stringConnect = queryStringConnect(url, database);

      // executa conexão
      sql.connect(stringConnect);


      const planilhaFornecedores = await sql.query(`
        Select PLAF_COD,
                    PLAF_FORN_COD,
                    FORN_NOME
                    from   fornecedor,
                    planilha_fornecedor
                    where forn_COD = PLaf_forn_COD
                   and    PLAF_PLAC_COD  = ${planilhaId}
                order by FORN_NOME
      `);

      const fornecedor: any[] = [];

      planilhaFornecedores.recordset.map((forn) => {
        fornecedor.push(forn);
      });

      return fornecedor;
    } catch (error) {
      return error;
    }
  }
}
