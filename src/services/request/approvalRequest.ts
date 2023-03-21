
<<<<<<< HEAD
import bcrypt from 'bcrypt';
import sql from 'mssql';
import { countNumAprovaPedido, updatePedidoASS } from '../../queries/request';
import { verifyUser } from '../../queries/user';
import { queryStringConnect } from '../../sql';
import { selectAprovaPedido } from '../../queries/parametrosGerais';
=======
import sql from 'mssql'
import { countNumAprovaPedido, updatePedidoASS } from '../../queries/request'
import { queryStringConnect } from '../../sql'
import { selectAprovaPedido } from '../../queries/parametrosGerais'
import { verifyValidUser } from '../../utils/validUser'
>>>>>>> e70fb1c2729889d9375ebd0f254585345c65e45f

export class ApprovalRequestService {
  public async execute (
    USUA_SENHA_APP: string,
    posUsuaCod: string,
    pediCod: string,
    pediNumero: string,
    codUsua: string,
    url: string,
    database:string
  )/*: Promise<IResponse> */ {
    try {
<<<<<<< HEAD
      const verifyUserSiglaSQL = verifyUser(codUsua);
=======
      // const verifyUserSiglaSQL = verifyUser(codUsua)
>>>>>>> e70fb1c2729889d9375ebd0f254585345c65e45f

      const stringConnect = queryStringConnect(url, database);

      await sql.connect(stringConnect);

<<<<<<< HEAD
      const resultVerify = await sql.query(verifyUserSiglaSQL);
=======
      const verifyValidUserFunc = await verifyValidUser({ codUsua, url, database, senhaApp: USUA_SENHA_APP, tipo: '', valorTotalSoco: 0 })
>>>>>>> e70fb1c2729889d9375ebd0f254585345c65e45f

      if (verifyValidUserFunc.error === true) {
        return ({
<<<<<<< HEAD
          message: 'Úsuario não existente',
          error: true,
          status: 400
        });
      }

      const passwordBD = resultVerify.recordset[0].USUA_SENHA_APP;

      const comparePassword = await bcrypt.compare(USUA_SENHA_APP, passwordBD);

      if (!comparePassword) {
        return ({
          message: 'Senha incorreta',
          error: true,
          status: 400
        });
=======
          message: verifyValidUserFunc.message,
          error: verifyValidUserFunc.error,
          status: verifyValidUserFunc.status
        })
>>>>>>> e70fb1c2729889d9375ebd0f254585345c65e45f
      }

      let sqlQuery = '';

      const sqlCountNumAprovaPedido = countNumAprovaPedido(pediCod);

      const valCountNumAprovaPedido = await sql.query(sqlCountNumAprovaPedido);

      const selectAprovaPedidoQuery = selectAprovaPedido();

      const valCountNumAprovaPedidoBD = await sql.query(selectAprovaPedidoQuery);

      if (valCountNumAprovaPedidoBD.recordset[0].PAGE_TODAS_APROVACOES_PEDIDO === 'S') {
        if (valCountNumAprovaPedidoBD.recordset[0].PAGE_NUM_APROVACOES_PEDIDO === 1) {
          sqlQuery = 'PEDI_STATUS = \'A\',';
        } else if (valCountNumAprovaPedidoBD.recordset[0].PAGE_NUM_APROVACOES_PEDIDO === 2 && valCountNumAprovaPedido.recordset[0].NUM === 1) {
          sqlQuery = 'PEDI_STATUS = \'A\',';
        } else if (valCountNumAprovaPedidoBD.recordset[0].PAGE_NUM_APROVACOES_PEDIDO === 3 && valCountNumAprovaPedido.recordset[0].NUM === 2) {
          sqlQuery = 'PEDI_STATUS = \'A\',';
        } else if (valCountNumAprovaPedidoBD.recordset[0].PAGE_NUM_APROVACOES_PEDIDO === 4 && valCountNumAprovaPedido.recordset[0].NUM === 3) {
          sqlQuery = 'PEDI_STATUS = \'A\',';
        }
      } else {
        sqlQuery = 'PEDI_STATUS = \'A\',';
      }
      const sqlQueryUpdate = updatePedidoASS(pediCod, posUsuaCod, sqlQuery);

      await sql.query(sqlQueryUpdate);

      return ({
        message: `Pedido ${pediNumero} aprovado com sucesso`,
        error: false,
        status: 200
      });
    } catch (e) {
      return ({
        message: 'Error = ' + e,
        error: true,
        status: 400
      });
    }
  }
}
