import sql from 'mssql';
import { queryStringConnect } from '../../sql';
import { totalFornCerePedido, totalUsuaPedido } from '../../queries/request';
import { selectUsuaCrParametros } from '../../queries/userResultCenter';
import { pegaPeriodo } from '../../utils/pegaPeriodoPedido';
import { selectPag2ContrUsuaSmpCrPedCom } from '../../queries/parametrosGerais';
import { verifyUser } from '../../queries/user';

export const validCereFornPedi = async (codUsua: string, cereCod: string, valTotal: string, fornCod: string, pediCod: string, pediNumero:string, url: string, database: string) => {
  try {
    const verifyUserSQL = verifyUser(codUsua);

    const stringConnect = queryStringConnect(url, database);

    await sql.connect(stringConnect);

    const resultVerify = await sql.query(verifyUserSQL);
    const periodo = pegaPeriodo('PEDI_DATA');

    if (resultVerify.recordset.length < 1) {
      return ({
        message: 'Codigo incorreto',
        error: true,
        status: 400
      });
    }
    const cod = codUsua;

    const sqlUsuarioCr = selectUsuaCrParametros(cod + '', cereCod);
    const selectPag2ContrUsuaSmpCrPedComQuery = selectPag2ContrUsuaSmpCrPedCom();

    const selectPag2ContrUsuaSmpCrPedComData = await sql.query(selectPag2ContrUsuaSmpCrPedComQuery);

    const sqlUsuarioCrData = await sql.query(sqlUsuarioCr);

    let USCR_VLR_MAX_APROV_PED = 0;
    let USCR_VLR_MAX_APROV_PED_FORN = 0;

    if (sqlUsuarioCrData.recordset.length > 0) {
      if (sqlUsuarioCrData.recordset[0].USCR_VLR_MAX_APROV_PED > 0) {
        USCR_VLR_MAX_APROV_PED = sqlUsuarioCrData.recordset[0].USCR_VLR_MAX_APROV_PED;
      }

      if (sqlUsuarioCrData.recordset[0].USCR_VLR_MAX_APROV_PED_FORN > 0) {
        USCR_VLR_MAX_APROV_PED_FORN = sqlUsuarioCrData.recordset[0].USCR_VLR_MAX_APROV_PED_FORN;
      }
    }
    if (selectPag2ContrUsuaSmpCrPedComData.recordset[0].PAG2_CONTR_USUA_SMP_CR_PED_COM === 'S') {
      if (USCR_VLR_MAX_APROV_PED > 0) {
        if (USCR_VLR_MAX_APROV_PED < parseInt(valTotal)) {
          return ({
            message: `Pedido ${pediNumero} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar nesse CR 1`,
            error: true,
            status: 400
          });
        }
      } else {
        if (resultVerify.recordset[0].USUA_VALOR_APROVACAO > 0) {
          if (parseInt(valTotal) > resultVerify.recordset[0].USUA_VALOR_APROVACAO) {
            return ({
              message: `Pedido ${pediNumero} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar`,
              error: true,
              status: 400
            });
          }
        }
      }

      const sqlTotalFornCerePedido = totalFornCerePedido(cereCod, fornCod, periodo);

      if (USCR_VLR_MAX_APROV_PED_FORN > 0) {
        console.log(sqlTotalFornCerePedido);

        const totalFornCerePedidoData = await sql.query(sqlTotalFornCerePedido);

        let totalFornCerePedidoValue = 0;
        for (let i = 0; i < totalFornCerePedidoData.recordset.length; i++) {
          totalFornCerePedidoValue += totalFornCerePedidoData.recordset[i].VALOR;
        }

        totalFornCerePedidoValue += parseInt(valTotal);

        if (USCR_VLR_MAX_APROV_PED_FORN < totalFornCerePedidoValue) {
          return ({
            message: `Pedido ${pediNumero} não poderá ser aprovado poís valor do pedido acima do valor mensal de aprovação para esse fornecedor`,
            error: true,
            status: 400
          });
        }
      } else {
        if (resultVerify.recordset[0].USUA_VALOR_APROVACAO_MENSAL > 0) {
          const sqlTotalUsuaPedido = totalUsuaPedido(cod + '', periodo);

          const totalUsuaPedidoData = await sql.query(sqlTotalUsuaPedido);
          let totalUsuaPedidoValue = 0;
          for (let i = 0; i < totalUsuaPedidoData.recordset.length; i++) {
            totalUsuaPedidoValue += totalUsuaPedidoData.recordset[i].VALOR;
          }
          totalUsuaPedidoValue += parseInt(valTotal);

          if (resultVerify.recordset[0].USUA_VALOR_APROVACAO_MENSAL < totalUsuaPedidoValue) {
            return ({
              message: `Pedido ${pediNumero} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar por mês`,
              error: true,
              status: 400
            });
          }
        }
      }
    } else {
      if (USCR_VLR_MAX_APROV_PED < parseInt(valTotal)) {
        return ({
          message: `Pedido ${pediNumero} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar nesse CR 2`,
          error: true,
          status: 400
        });
      }
      if (resultVerify.recordset[0].USUA_VALOR_APROVACAO_MENSAL > 0 || !resultVerify.recordset[0].USUA_VALOR_APROVACAO_MENSAL) {
        const sqlTotalUsuaPedido = totalUsuaPedido(cod + '', periodo);

        const totalUsuaPedidoData = await sql.query(sqlTotalUsuaPedido);
        let totalUsuaPedidoValue = 0;
        for (let i = 0; i < totalUsuaPedidoData.recordset.length; i++) {
          totalUsuaPedidoValue += totalUsuaPedidoData.recordset[i].VALOR;
        }
        totalUsuaPedidoValue += parseInt(valTotal);

        if (resultVerify.recordset[0].USUA_VALOR_APROVACAO_MENSAL < totalUsuaPedidoValue) {
          return ({
            message: `Pedido ${pediNumero} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar por mês`,
            error: true,
            status: 400
          });
        }
      }
    }

    return ({
      message: `Pedido ${pediNumero} aprovador com sucesso `,
      error: false,
      status: 200
    });
  } catch (e) {
    return ({
      message: e,
      error: true,
      status: 200
    });
  }
};
