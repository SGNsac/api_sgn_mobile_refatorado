import { selectPefiPejuPess } from '../../queries/schedule'
import sql from 'mssql'
import { queryStringConnect } from '../../sql'
interface IPessPefiPeju {
    NOME: string;
    ENDE: string;
    EMAIL: string;
    TELEFONE: string;
}

export class ListScheduleService {
  public async execute (url: string, database: string): Promise<IPessPefiPeju[]> {
    const stringConnect = queryStringConnect(url, database)

    await sql.connect(stringConnect)

    const sqlSelectPefiPejuPess = selectPefiPejuPess()

    const listPefiPejuPess = await sql.query(sqlSelectPefiPejuPess)
    return listPefiPejuPess.recordset
  }
}
