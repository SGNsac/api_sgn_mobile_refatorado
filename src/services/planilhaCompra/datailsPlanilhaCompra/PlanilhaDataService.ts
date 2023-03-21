import { queryStringConnect } from '../../../sql';
import sql from 'mssql';

export default class PlanilhaDataService {
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

      const planilhaData = await sql.query(`Select PLAC_COD,
                     PESS_NOME,
                     seco_desc ,
                     plac_status,
                     plac_usua_cod_ass_1,
                     plac_assinatura_1,
                     plac_usua_cod_ass_2,
                     plac_assinatura_2,
                     plac_COD
                     from  Planilha_Compra LEFT OUTER JOIN pessoal ON plac_pess_cod = pess_cod, Setor_Compras
                     where seco_cod = plac_seco_cod
                     and plac_COD = ${planilhaId}`);

      return planilhaData.recordset;
    } catch (error) {
      return error;
    }
  }
}
