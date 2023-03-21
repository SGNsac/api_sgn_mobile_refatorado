/* eslint-disable @typescript-eslint/no-explicit-any */

import { selectPedidoEstoque1, selectPedidoEstoque2, selectPedidoEstoque3, selectPedidoEstoque4, selectPedidoEstoqueCere1, selectPedidoEstoqueCere2, selectPedidoEstoqueCere3, selectPedidoEstoqueCere4 } from '../../queries/request';
import { selectUsuaCr } from '../../queries/userResultCenter';
import { selectPag2ContrUsuaSmpCrPedCom } from '../../queries/parametrosGerais';
import sql from 'mssql';
import { queryStringConnect } from '../../sql';

export class ListPedidoService {
  public async execute (queryString: string, cod:string, database:string, url:string): Promise<any> {
    try {
      const array: any = [];
      const stringConnect = queryStringConnect(url, database);

      sql.connect(stringConnect);

      const selectPag2ContrUsuaSmpCrPedComQuery = selectPag2ContrUsuaSmpCrPedCom();

      const selectPag2ContrUsuaSmpCrPedComData = await sql.query(selectPag2ContrUsuaSmpCrPedComQuery);

      if (selectPag2ContrUsuaSmpCrPedComData.recordset[0].PAG2_CONTR_USUA_SMP_CR_PED_COM === 'S') {
        const selectUsuaCrQuery = selectUsuaCr(cod);

        const selectUsuaCrDatas = await sql.query(selectUsuaCrQuery);
        const arrayCere: string[] = [];
        let queryStringPese = `
      AND
        PESE_CERE_COD IN(0)
      `;
        let queryStringPeit = `
      AND
        PEIT_CERE_COD IN(0)
      `;

        const selectUsuaCrData = parseInt(selectUsuaCrDatas.recordsets + '');

        if (selectUsuaCrData > 0) {
          // /*const selectUsuaCrData of selectUsuaCrDatas.recordsets[0]
          for (let i = 0; i < selectUsuaCrData; i++) {
            arrayCere.push(selectUsuaCrDatas.recordset[i].USCR_CERE_COD);
            queryStringPese = `
          AND
            PESE_CERE_COD IN(${arrayCere})
          `;
            queryStringPeit = `
          AND
            PEIT_CERE_COD IN(${arrayCere})
          `;
          }
        }

        const sql1 = selectPedidoEstoqueCere1(cod, queryString, queryStringPese, queryStringPeit);
        const sql2 = selectPedidoEstoqueCere2(cod, queryString, queryStringPese, queryStringPeit);
        const sql3 = selectPedidoEstoqueCere3(cod, queryString, queryStringPese, queryStringPeit);
        const sql4 = selectPedidoEstoqueCere4(cod, queryString, queryStringPese, queryStringPeit);

        const listPedido1 = await sql.query(sql1);
        const listPedido2 = await sql.query(sql2);
        const listPedido3 = await sql.query(sql3);
        const listPedido4 = await sql.query(sql4);

        if (listPedido1.recordset.length > 0) {
          listPedido1.recordset.map((pos: any) => array.push(pos));
        }

        if (listPedido2.recordset.length > 0) {
          listPedido2.recordset.map((pos: any) => array.push(pos));
        }

        if (listPedido3.recordset.length > 0) {
          listPedido3.recordset.map((pos: any) => array.push(pos));
        }

        if (listPedido4.recordset.length > 0) {
          listPedido4.recordset.map((pos: any) => array.push(pos));
        }
      } else {
        const sql1 = selectPedidoEstoque1(cod, queryString);
        const sql2 = selectPedidoEstoque2(cod, queryString);
        const sql3 = selectPedidoEstoque3(cod, queryString);
        const sql4 = selectPedidoEstoque4(cod, queryString);

        const listPedido1 = await sql.query(sql1);
        const listPedido2 = await sql.query(sql2);
        const listPedido3 = await sql.query(sql3);
        const listPedido4 = await sql.query(sql4);

        if (listPedido1.recordset.length > 0) {
          listPedido1.recordset.map((pos: any) => array.push(pos));
        }

        if (listPedido2.recordset.length > 0) {
          listPedido2.recordset.map((pos: any) => array.push(pos));
        }

        if (listPedido3.recordset.length > 0) {
          listPedido3.recordset.map((pos: any) => array.push(pos));
        }

        if (listPedido4.recordset.length > 0) {
          listPedido4.recordset.map((pos: any) => array.push(pos));
        }
      }

      return array;
    } catch (e) {
      return e;
    }
  }
}
