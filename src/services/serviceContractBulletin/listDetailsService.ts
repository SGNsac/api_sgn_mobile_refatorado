import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { boletimMedicaoDetalhe } from '../../queries'
interface IBcsi {
    BCSI_SERV_COD: string,
    SERV_DESC: string,
    BCSI_BOCS_COD: string,
    BCSI_QUANTIDADEBOCS_DT_INICIO: string,
    BCSI_VLR_UNIT: string,
}

export class ListDetailsBulletin {
  public async execute (codBcsi: string): Promise<IBcsi[]> {
    const sql = boletimMedicaoDetalhe(codBcsi)

    const listBulletin1 = await PedidoEstoqueRepository.query(sql)

    return listBulletin1
  }
}
