import { selectComboAplicacao } from '../../queries/movDiaria'
import sql from 'mssql'
import { queryStringConnect } from '../../sql'

interface IResponse{
  message: string | string[];
  erro: boolean;
  status: number
}

export class GetDailyMovimentComboAplicacaoServices {
  public async execute (cod: string, url: string, database: string): Promise<IResponse> {
    try {
      const stringConnect = queryStringConnect(url, database)
      sql.connect(stringConnect)
      const sqlQuery = selectComboAplicacao(cod)
      const movimentQuery = await sql.query(sqlQuery)
      return ({
        message: movimentQuery.recordset,
        erro: true,
        status: 400
      })
    } catch (e) {
      return ({
        message: '' + e,
        erro: true,
        status: 400
      })
    }
  }
}
