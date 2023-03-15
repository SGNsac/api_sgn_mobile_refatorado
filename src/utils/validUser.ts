import bcrypt from 'bcrypt'
import sql from 'mssql'
import { queryStringConnect } from '../sql'
import { verifyUser } from '../queries/user'

interface IProps {
    codUsua: string;
    url: string;
    database: string;
    senhaApp: string;
    tipo: string;
    valorTotalSoco: number;
}

export const verifyValidUser = async ({ codUsua, url, database, senhaApp, tipo, valorTotalSoco } : IProps) => {
  const verifyUserSiglaSQL = verifyUser(codUsua)

  const stringConnect = queryStringConnect(url, database)

  await sql.connect(stringConnect)

  const resultVerify = await sql.query(verifyUserSiglaSQL)

  if (resultVerify.recordset[0].length <= 0) {
    return ({
      message: 'Úsuario não existente',
      error: true,
      status: 400
    })
  }

  const passwordBD = resultVerify.recordset[0].USUA_SENHA_APP

  const comparePassword = await bcrypt.compare(senhaApp, passwordBD)

  if (!comparePassword) {
    return ({
      message: 'Senha incorreta',
      error: true,
      status: 400
    })
  }

  if (resultVerify.recordset[0].USUA_BLOQ !== 'N') {
    return ({
      message: 'Úsuario bloqueado',
      error: true,
      status: 400
    })
  }

  if (tipo === 'solicitacaoCompra') {
    if (resultVerify.recordset[0].usua_valor_aprov_solic < valorTotalSoco) {
      return ({
        message: 'Úsuario não pode aprovar um valor tão alto',
        error: true,
        status: 401
      })
    }
  }

  return ({
    message: '',
    error: false,
    status: 200
  })
}
