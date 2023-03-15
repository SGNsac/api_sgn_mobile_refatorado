import { selectMovimentacao } from '../../queries/movDiaria'
import sql from 'mssql'
import { queryStringConnect } from '../../sql'

interface IResponse {
  message: {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string,
    GACO_NOME: string
  }[] | string,
  erro: boolean,
  status: number
}

export class GetDailyMovimentServices {
  public async execute (cod: string, url: string, database: string): Promise<IResponse | string> {
    try {
      const stringConnect = queryStringConnect(url, database)

      await sql.connect(stringConnect)

      const sqlQuery = selectMovimentacao(cod)

      const usersTableMeta = await sql.query(sqlQuery)

      return ({
        message: usersTableMeta.recordset,
        erro: false,
        status: 200
      })
    } catch (e) {
      return ({
        message: 'Ocorreu um erro' + e,
        erro: true,
        status: 400
      })
    }
  }
}
