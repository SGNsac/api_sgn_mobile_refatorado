import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectItemContServ } from '../../queries/itemServiceContract'

interface Iccs {
  COCS_DT_INICIO:string
  ICCS_DESCONTO: string,
  ICCS_COCS_COD: string,
  ICCS_SERV_COD: string,
  ICCS_QUANTIDADE: string,
  ICCS_VLR_UNIT: string,
  ICCS_UNMA_COD: string,
  ICCS_OBS: string,
  ICCS_VLR_UNIT_ATUAL: string,
  SERV_DESC_TEC:string,
  SERV_DESC: string
}

export class ListDetailsServiceContractServices {
  public async execute (token: string, cod: string): Promise<Iccs[]> {
    const sql = selectItemContServ(cod + '')

    const listDetailsContract = await PedidoEstoqueRepository.query(sql)

    return listDetailsContract
  }
}
