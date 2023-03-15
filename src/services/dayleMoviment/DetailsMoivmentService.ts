import { selectMovimentDetailsData, selectMovimentDetailsDataAndApl } from '../../queries/movDiaria'
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

export class DetailsMoivmentService {
  public async execute (cod: string, data: string, aplicacao: string, url: string, database: string): Promise<IResponse> {
    try {
      const stringConnect = queryStringConnect(url, database)
      sql.connect(stringConnect)

      if (aplicacao === '') {
        const sqlQuery = selectMovimentDetailsData(cod, data)
        const movimentQuery = await sql.query(sqlQuery)

        return ({
          message: movimentQuery.recordset,
          error: false,
          status: 200
        })
      }

      const sqlQuery = selectMovimentDetailsDataAndApl(cod, data, aplicacao)

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
