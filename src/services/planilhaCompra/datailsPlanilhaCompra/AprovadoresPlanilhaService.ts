import { queryStringConnect } from '../../../sql';
import sql from 'mssql';

export default class AprovadoresPlanilhaService {
  async execute(
    url: string,
    database: string,
    userId: string,
    planilhaId: string
  ) {
    try {
      // conexão com banco
      const stringConnect = queryStringConnect(url, database);

      // executa conexão
      sql.connect(stringConnect);

      const planilhaAprovadores = await sql.query(`Select usua_nome from usuario where usua_cod = ${userId} OR usua_cod = ${userId}`);

      const aprovadores: any[] = [];
      planilhaAprovadores.recordset.map((aprovador) => {
        aprovadores.push(aprovador);
      });

      return aprovadores;
    } catch (error) {
      return error;
    }
  }
}
