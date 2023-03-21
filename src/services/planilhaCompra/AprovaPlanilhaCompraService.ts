import { queryStringConnect } from '../../sql';
import sql from 'mssql';
import { planilhaUsuaCod1, planilhaUsuaCod2, updatePlanilha1, updatePlanilha2 } from '../../queries/planilhaCompra';

class AprovaPlanilhaCompraService {
  async execute (url: string, database: string, userId: string, planilhaId: string) {
    try {
      // conexão com banco
      const stringConnect = queryStringConnect(url, database);

      // executa conexão
      sql.connect(stringConnect);

      const getPlanilhaUsua1 = await sql.query(
        planilhaUsuaCod1(userId, planilhaId)
      );

      // planilha usuario 2
      const getPlanilhaUsua2 = await sql.query(
        planilhaUsuaCod2(userId, planilhaId)
      );

      // parametros
      const paramsAprovacao = await sql.query(`
        SELECT PAG2_NUM_APROVACOES_PLAC, PAG2_TODAS_APROVACOES_PLAC  FROM PARAMETROS_GERAIS_2
      `);


      if (
        paramsAprovacao.recordset[0].PAG2_NUM_APROVACOES_PLAC == 2 &&
        paramsAprovacao.recordset[0].PAG2_TODAS_APROVACOES_PLAC == 'S'
      ) {

        console.log('entrou no if dos paramentros');
        console.log(getPlanilhaUsua1.recordset.length);
        if (getPlanilhaUsua1.recordset.length > 0) {
          console.log('entrou no if dos parame');
          if (getPlanilhaUsua1.recordset[0].PLAC_COD === Number(planilhaId)) {
            console.log('entrou no ');
            await sql.query(updatePlanilha1(userId, planilhaId));
          }
        }


        if (getPlanilhaUsua2.recordset.length > 0) {
          console.log('entrou no if ds');
          if (
            getPlanilhaUsua2.recordset[0].PLAC_COD === Number(planilhaId)
          ) {
            console.log('entrou no if ');
            await sql.query(updatePlanilha2(userId, planilhaId));
          }
        }


        const planilhaUsua = await sql.query(`
          SELECT PLAC_COD,PLAC_ASSINATURA_1,PLAC_ASSINATURA_2 FROM PLANILHA_COMPRA
            WHERE PLAC_STATUS = 'A'
            and PLAC_COD = ${planilhaId} and (PLAC_USUA_COD_ASS_1 = ${userId} OR PLAC_USUA_COD_ASS_2 = ${userId})
        `);
        console.log(planilhaUsua.recordset[0].PLAC_ASSINATURA_1);
        console.log(planilhaUsua.recordset[0].PLAC_ASSINATURA_2);
        if (
          planilhaUsua.recordset[0].PLAC_ASSINATURA_1 === 'S' &&
          planilhaUsua.recordset[0].PLAC_ASSINATURA_2 === 'S'
        ) {
          await sql.query(`UPDATE PLANILHA_COMPRA SET PLAC_STATUS = 'P' WHERE PLAC_COD = ${planilhaId}
            AND
          (PLAC_USUA_COD_ASS_1 = ${userId} or PLAC_USUA_COD_ASS_2 = ${userId})
        `);
        }
      } else {

        if (getPlanilhaUsua1.recordset.length > 0) {
          if (getPlanilhaUsua1.recordset[0].PLAC_COD === Number(planilhaId)) {
            await sql.query(`UPDATE PLANILHA_COMPRA SET PLAC_ASSINATURA_1 = 'S',
            PLAC_DATA_APROVACAO1 = getDate(),  PLAC_STATUS = 'P' WHERE PLAC_USUA_COD_ASS_1 = ${userId}
            and PLAC_COD = ${planilhaId}
        `);
          }
        }

        if (getPlanilhaUsua2.recordset.length > 0) {
          if (getPlanilhaUsua2.recordset[0].PLAC_COD === Number(planilhaId)) {
            await sql.query(`UPDATE PLANILHA_COMPRA SET
            PLAC_ASSINATURA_2 = 'S',
            PLAC_DATA_APROVACAO2 = getDate(),
            PLAC_STATUS = 'P'
              WHERE PLAC_USUA_COD_ASS_2 = ${userId}
                and
              PLAC_COD = ${planilhaId}
        `);
          }
        }

      }

      return {
        message: 'Planilha aprovada com sucesso',
        error: false,
        status: 200,
      };
    } catch (error) {
      return error;
    }
  }
}

export default AprovaPlanilhaCompraService;
