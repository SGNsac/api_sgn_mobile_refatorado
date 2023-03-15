import { selectMovimentacaoAplicacao } from '../../queries/movDiaria'
import sql from 'mssql'
import { queryStringConnect } from '../../sql'
interface IResponse {
  message: {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string
  }[] | string,
  erro: boolean,
  status: number
}

export class FilterAplicacao {
  public async execute (cod: string, aplicacao: string, url: string, database: string): Promise<IResponse> {
    try {
      const stringConnect = queryStringConnect(url, database)

      const sqlQuery = selectMovimentacaoAplicacao(cod, aplicacao)

      sql.connect(stringConnect)

      const movimentQuery = await sql.query(sqlQuery)

      return ({
        message: movimentQuery.recordset,
        erro: true,
        status: 400
      })
    } catch (e) {
      return ({
        message: 'Erro = ' + e,
        erro: true,
        status: 400
      })
    }
  }
}
