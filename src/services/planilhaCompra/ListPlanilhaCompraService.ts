import { queryStringConnect } from '../../sql';
import sql from 'mssql';

class ListPlanilhaCompraService {
  async execute (
    url: string,
    database: string,
    userId: string
  ) {
    try {
      const stringConnect = queryStringConnect(url, database);

      sql.connect(stringConnect);

      const listPlanilha = await sql.query(
        `SELECT SECO_DESC, PLAC_COD FROM Setor_Compras AS SC
LEFT JOIN PLANILHA_COMPRA AS PC
ON SC.SECO_COD = PC.PLAC_SECO_COD
WHERE PLAC_STATUS = 'A'
            AND
          (PLAC_USUA_COD_ASS_1 = ${userId}
           OR
          PLAC_USUA_COD_ASS_2 = ${userId})`
      );

      return listPlanilha.recordset;
    } catch (error) {
      return error;
    }
  }
}

export default ListPlanilhaCompraService;
