import { selectMovimentFilterData, selectMovimentFilterDataAndApl } from '../../queries/movDiaria'
import sql from 'mssql'
import { queryStringConnect } from '../../sql'

interface IResponse {
  message: {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string,
    GACO_NOME: string
  }[] | string;
  error: boolean;
  status: number;
}

export class FilterDataAndAplMovimentService {
  public async execute (cod: string, dataIni: string, dataFim: string, aplicacao: string, url: string, database: string): Promise<IResponse> {
    try {
      const stringConnect = queryStringConnect(url, database)

      sql.connect(stringConnect)

      if (aplicacao === '') {
        const sqlQuery = selectMovimentFilterData(cod, dataIni, dataFim)

        const movimentQuery = await sql.query(sqlQuery)

        return ({
          message: movimentQuery.recordset,
          error: false,
          status: 200
        })
      }

      const sqlQuery = selectMovimentFilterDataAndApl(cod, dataIni, dataFim, aplicacao)

      const movimentQuery = await sql.query(sqlQuery)

      return ({
        message: movimentQuery.recordset,
        error: false,
        status: 200
      })
    } catch (e) {
      return ({
        message: 'Erro = ' + e,
        error: true,
        status: 400
      })
    }
  }
}
