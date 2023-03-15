import { selectSoliComp1, selectSoliComp2 } from '../../queries/purchaseOrder'
import sql from 'mssql'
import { queryStringConnect } from '../../sql'

interface IRequestBD {
    SOCO_COD: number,
    SOCO_DTSOLI: string,
    SOCO_OBS: string,
    SOCO_ASSINATURA_1: string,
    SOCO_USUA_COD_ASS_1: number,
    SOCO_NUMERO: string,
    SOCO_QTD_NECE: number,
    SOCO_ALMO_COD: number,
    SOCO_MATE_COD: number,
    ESTO_CUSTO_MEDIO: number,
    valor_total: number,
    ASS: string
}

interface IArrayBD {
  message: {
    SOCO_COD: number,
    SOCO_DTSOLI: string,
    SOCO_OBS: string,
    SOCO_ASSINATURA_1: string,
    SOCO_USUA_COD_ASS_1: number,
    SOCO_NUMERO: string,
    SOCO_QTD_NECE: number,
    SOCO_ALMO_COD: number,
    SOCO_MATE_COD: number,
    ESTO_CUSTO_MEDIO: number,
    valor_total: number,
    ASS: string
  }[] | string;
  error: boolean;
  status: number;
}

export class ListPurchaseOrderService {
  public async execute (cod: string, url: string, database: string, queryString: string): Promise<IArrayBD> {
    try {
      const stringConnect = queryStringConnect(url, database)

      await sql.connect(stringConnect)
      const query2 = selectSoliComp2(cod, queryString)
      const query1 = selectSoliComp1(cod, queryString)

      const listPurchaseOrder1 = await sql.query(query1)
      const listPurchaseOrder2 = await sql.query(query2)

      const orderArray: IRequestBD[] = []

      if (listPurchaseOrder1.recordset.length > 0) {
        listPurchaseOrder1.recordset.map((pos: IRequestBD) => orderArray.push(pos))
      }

      if (listPurchaseOrder2.recordset.length > 0) {
        listPurchaseOrder2.recordset.map((pos: IRequestBD) => orderArray.push(pos))
      }

      return ({
        message: orderArray,
        error: false,
        status: 200
      })
    } catch (e) {
      return ({
        message: `Error = ${e}`,
        error: true,
        status: 400
      })
    }
  }
}
