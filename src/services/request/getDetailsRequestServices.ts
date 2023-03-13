import { selectPedidosItemServico } from '../../queries/request'
import { queryStringConnect } from '../../sql'
import sql from 'mssql'

export class GetDetailsRequestServices {
  public async execute (PEDI_COD: string, database: string, url: string) {
    const stringConnect = queryStringConnect(url, database)
    console.log('====================================')
    console.log(stringConnect)
    console.log('====================================')
    sql.connect(stringConnect)
    const sqlQuery = selectPedidosItemServico(PEDI_COD)

    const requestItens = await sql.query(sqlQuery)
    return requestItens.recordset
  }
}
