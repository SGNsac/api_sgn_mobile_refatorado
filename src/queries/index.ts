import data1Mes from '../utils/pega1Mes'
import dataAtual from '../utils/pegaDataAtual'

const dataAt = dataAtual()

const dataMesAtras = data1Mes()

export const selectMovimentacao = (login: string) => {
  return `SELECT 
            SUM(MODI_DEBITO) AS DEBITO,
            gaco_nome,
            SUM(MODI_CREDITO) AS CREDITO,
            SUM(MODI_SALDO_ANTES) AS SALDO,
            MODI_DATA AS DATA
          FROM
            USUARIO
          INNER JOIN
            REL_USUARIO_SUBCONTA
          ON
            REUS_USUA_COD = USUA_COD
          INNER JOIN
            SUB_CONTA_CORRENTE
          ON
            SUCC_COD = REUS_SUCC_COD
          INNER JOIN
            MOVIMENTO_DIARIO
          ON
            MODI_SUCC_COD = SUCC_COD
          INNER JOIN
            ALOCACAO_CONTA
          ON
            ALCO_SUCC_COD = SUCC_COD
          INNER JOIN
            GRUPO_ALOC_CONTA
          ON
            ALCO_GACO_COD = GACO_COD
          INNER JOIN
            APLICACAO_CONTA
          ON
            APCO_COD = ALCO_APCO_COD
          WHERE
            USUA_SIGLA ='${login}' 
          AND
            MODI_DATA
          BETWEEN
            '${dataMesAtras}' 
          AND
            '${dataAt}'
          GROUP BY 
            MODI_DATA,
            GACO_NOME 
          ORDER BY 
            MODI_DATA 
          DESC
  `
}

export const selectMovimentacaoAplicacao = (login: string, aplicacao: string) => {
  return `SELECT 
            SUM(MODI_DEBITO) AS DEBITO,
            gaco_nome,
            SUM(MODI_CREDITO) AS CREDITO,
            SUM(MODI_SALDO_ANTES) AS SALDO,
            MODI_DATA AS DATA
          FROM
            USUARIO
          INNER JOIN
            REL_USUARIO_SUBCONTA
          ON
            REUS_USUA_COD = USUA_COD
          INNER JOIN
            SUB_CONTA_CORRENTE
          ON
            SUCC_COD = REUS_SUCC_COD
          INNER JOIN
            MOVIMENTO_DIARIO
          ON
            MODI_SUCC_COD = SUCC_COD
          INNER JOIN
            ALOCACAO_CONTA
          ON
            ALCO_SUCC_COD = SUCC_COD
          INNER JOIN
            GRUPO_ALOC_CONTA
          ON
            ALCO_GACO_COD = GACO_COD
          INNER JOIN
            APLICACAO_CONTA
          ON
            APCO_COD = ALCO_APCO_COD
          WHERE
            USUA_SIGLA ='${login}' 
          AND
            GACO_NOME LIKE '%${aplicacao}%'
          AND
            MODI_DATA
          BETWEEN
            '${dataMesAtras}' 
          AND
            '${dataAt}'
          GROUP BY
            MODI_DATA,
            GACO_NOME
          ORDER BY
            MODI_DATA
          DESC
  `
}

export const selectComboAplicacao = (login: string) => {
  return `SELECT 
            DISTINCT(gaco_nome)
          FROM
            USUARIO
          INNER JOIN
            REL_USUARIO_SUBCONTA
          ON
            REUS_USUA_COD = USUA_COD
          INNER JOIN
            SUB_CONTA_CORRENTE
          ON
            SUCC_COD = REUS_SUCC_COD
          INNER JOIN
            MOVIMENTO_DIARIO
          ON
            MODI_SUCC_COD = SUCC_COD
          INNER JOIN
            ALOCACAO_CONTA
          ON
            ALCO_SUCC_COD = SUCC_COD
          INNER JOIN
            GRUPO_ALOC_CONTA
          ON
            ALCO_GACO_COD = GACO_COD
          INNER JOIN
            APLICACAO_CONTA
          ON
            APCO_COD = ALCO_APCO_COD
          INNER JOIN
            CONTA_CORRENTE
          ON
            SUCC_COCO_COD = COCO_COD
          WHERE
            USUA_SIGLA ='${login}'
  `
}

export const selectMovimentFilterData = (login: string, dataIni: string, dataFim: string) => {
  return `SELECT 
            APCO_NOME,
            MODI_DEBITO,
            MODI_CREDITO,
            MODI_SALDO_ANTES,
            MODI_DATA,
            SUCC_DESC
          FROM
            USUARIO
          INNER JOIN
            REL_USUARIO_SUBCONTA
          ON
            REUS_USUA_COD = USUA_COD
          INNER JOIN
            SUB_CONTA_CORRENTE
          ON
            SUCC_COD = REUS_SUCC_COD
          INNER JOIN
            MOVIMENTO_DIARIO
          ON
            MODI_SUCC_COD = SUCC_COD
          INNER JOIN
            ALOCACAO_CONTA
          ON
            ALCO_SUCC_COD = SUCC_COD
          INNER JOIN
            GRUPO_ALOC_CONTA
          ON
            ALCO_GACO_COD = GACO_COD
          INNER JOIN
            APLICACAO_CONTA
          ON
            APCO_COD = ALCO_APCO_COD
          WHERE
            USUA_SIGLA ='${login}' 
          AND
            MODI_DATA
          BETWEEN
            '${dataIni}' 
          AND
            '${dataFim}'
          `
}

export const selectMovimentFilterDataAndApl = (login: string, dataIni: string, dataFim: string, aplicacao: string) => {
  return `SELECT 
            APCO_NOME,
            MODI_DEBITO,
            MODI_CREDITO,
            MODI_SALDO_ANTES,
            MODI_DATA,
            SUCC_DESC
          FROM
            USUARIO
          INNER JOIN
            REL_USUARIO_SUBCONTA
          ON
            REUS_USUA_COD = USUA_COD
          INNER JOIN
            SUB_CONTA_CORRENTE
          ON
            SUCC_COD = REUS_SUCC_COD
          INNER JOIN
            MOVIMENTO_DIARIO
          ON
            MODI_SUCC_COD = SUCC_COD
          INNER JOIN
            ALOCACAO_CONTA
          ON
            ALCO_SUCC_COD = SUCC_COD
          INNER JOIN
            GRUPO_ALOC_CONTA
          ON
            ALCO_GACO_COD = GACO_COD
          INNER JOIN
            APLICACAO_CONTA
          ON
            APCO_COD = ALCO_APCO_COD
          WHERE
            USUA_SIGLA ='${login}' 
          AND
            MODI_DATA
          BETWEEN
            '${dataIni}' 
          AND
            '${dataFim}'
          AND 
            GACO_NOME LIKE'%${aplicacao}%'
          `
}

export const selectMovimentDetailsDataAndApl = (login: string, data: string, aplicacao: string) => {
  return `SELECT 
            APCO_NOME,
            MODI_DEBITO,
            MODI_CREDITO,
            MODI_SALDO_ANTES,
            MODI_DATA,
            SUCC_DESC
          FROM
            USUARIO
          INNER JOIN
            REL_USUARIO_SUBCONTA
          ON
            REUS_USUA_COD = USUA_COD
          INNER JOIN
            SUB_CONTA_CORRENTE
          ON
            SUCC_COD = REUS_SUCC_COD
          INNER JOIN
            MOVIMENTO_DIARIO
          ON
            MODI_SUCC_COD = SUCC_COD
          INNER JOIN
            ALOCACAO_CONTA
          ON
            ALCO_SUCC_COD = SUCC_COD
          INNER JOIN
            GRUPO_ALOC_CONTA
          ON
            ALCO_GACO_COD = GACO_COD
          INNER JOIN
            APLICACAO_CONTA
          ON
            APCO_COD = ALCO_APCO_COD
          WHERE
            USUA_SIGLA ='${login}' 
          AND
            MODI_DATA = '${data}'
          AND 
            gaco_nome LIKE'%${aplicacao}%'
          `
}

export const selectMovimentDetailsData = (login: string, data: string) => {
  return `SELECT 
            APCO_NOME,
            MODI_DEBITO,
            MODI_CREDITO,
            MODI_SALDO_ANTES,
            MODI_DATA,
            SUCC_DESC
          FROM
            USUARIO
          INNER JOIN
            REL_USUARIO_SUBCONTA
          ON
            REUS_USUA_COD = USUA_COD
          INNER JOIN
            SUB_CONTA_CORRENTE
          ON
            SUCC_COD = REUS_SUCC_COD
          INNER JOIN
            MOVIMENTO_DIARIO
          ON
            MODI_SUCC_COD = SUCC_COD
          INNER JOIN
            ALOCACAO_CONTA
          ON
            ALCO_SUCC_COD = SUCC_COD
          INNER JOIN
            GRUPO_ALOC_CONTA
          ON
            ALCO_GACO_COD = GACO_COD
          INNER JOIN
            APLICACAO_CONTA
          ON
            APCO_COD = ALCO_APCO_COD
          WHERE
            USUA_SIGLA ='${login}' 
          AND
            MODI_DATA = '${data}'
          `
}

export const selectPedidoEstoque1 = (usuaCod: string) => {
  return `
    SELECT
        PEDI_TOTAL_MERC,
        PEDI_OBS,
        PEDI_DESCONTO,
        PEDI_STATUS,
        PEDI_FRETE,
        PEDI_VALOR_APROVADO,
        PEDI_VALOR_TOTAL,
        PEDI_COD,
        PEDI_NUMERO,
        FORN_NOME,
        PEDI_DATA,
        1 AS ASS,
        EMPR_NOME,
        (
          SELECT
            ISNULL(
              SUM(
                ISNULL(PESE_VALOR_UNITARIO,0) 
                  * 
                ISNULL(PESE_QUANTIDADE,0)
                -
                ISNULL(PESE_DESCONTO,0)
              )
            ,0)
          FROM
            PEDIDO_SERVICO
          WHERE
            PESE_PEDI_COD = PEDI_COD
        ) 
        AS  
          VALOR_TOTAL_SERVICO,
        (
          SELECT
            ISNULL(
              SUM(
                ISNULL(peit_valoruni,0) 
                  * 
                ISNULL(peit_qtd,0)
              )
            ,0)
          FROM
            PEDIDO_ITEM
          WHERE
            PEIT_PEDI_COD = PEDI_COD
        ) 
      AS  
        VALOR_TOTAL_ITEM
    FROM
        pedido_estoque
    INNER JOIN
        FORNECEDOR
    ON
        FORN_COD = PEDI_FORN_COD
    INNER JOIN
        EMPRESA
    ON
        EMPR_COD = PEDI_EMPR_COD
    WHERE
        PEDI_TIPO = 'C'
    AND
        PEDI_USUA_COD_ASS_1 =   ${usuaCod}
    AND 
        PEDI_ASSINATURA_1 != 'S'
    ORDER BY
        PEDI_DATA DESC`
}

export const selectPedidoEstoque2 = (usuaCod: string) => {
  return `
    SELECT
        PEDI_TOTAL_MERC,
        PEDI_OBS,
        PEDI_DESCONTO,
        PEDI_STATUS,
        PEDI_FRETE,
        PEDI_VALOR_APROVADO,
        PEDI_VALOR_TOTAL,
        PEDI_COD,
        PEDI_NUMERO,
        FORN_NOME,
        PEDI_DATA,
        2 AS ASS,
        EMPR_NOME
    FROM
        pedido_estoque
    INNER JOIN
        FORNECEDOR
    ON
        FORN_COD = PEDI_FORN_COD
    INNER JOIN
        EMPRESA
    ON
        EMPR_COD = PEDI_EMPR_COD
    WHERE
        PEDI_STATUS = 'N'
    AND
        PEDI_USUA_COD_ASS_2 =   ${usuaCod}
    AND 
        PEDI_ASSINATURA_2 != 'S'
    ORDER BY
        PEDI_DATA DESC`
}

export const selectPedidoEstoque3 = (usuaCod: string) => {
  return `
    SELECT
        PEDI_TOTAL_MERC,
        PEDI_OBS,
        PEDI_DESCONTO,
        PEDI_STATUS,
        PEDI_FRETE,
        PEDI_VALOR_APROVADO,
        PEDI_VALOR_TOTAL,
        PEDI_COD,
        PEDI_NUMERO,
        FORN_NOME,
        PEDI_DATA,
        3 AS ASS,
        EMPR_NOME
    FROM
        pedido_estoque
    INNER JOIN
        FORNECEDOR
    ON
        FORN_COD = PEDI_FORN_COD
    INNER JOIN
        EMPRESA
    ON
        EMPR_COD = PEDI_EMPR_COD
    WHERE
        PEDI_STATUS = 'N'
    AND
        PEDI_USUA_COD_ASS_3 =   ${usuaCod}
    AND 
        PEDI_ASSINATURA_3 != 'S'
    ORDER BY
        PEDI_DATA DESC`
}

export const selectPedidoEstoque4 = (usuaCod: string) => {
  return `
    SELECT
        PEDI_TOTAL_MERC,
        PEDI_OBS,
        PEDI_DESCONTO,
        PEDI_STATUS,
        PEDI_FRETE,
        PEDI_VALOR_APROVADO,
        PEDI_VALOR_TOTAL,
        PEDI_COD,
        PEDI_NUMERO,
        FORN_NOME,
        PEDI_DATA,
        4 AS ASS,
        EMPR_NOME
    FROM
        pedido_estoque
    INNER JOIN
        FORNECEDOR
    ON
        FORN_COD = PEDI_FORN_COD
    INNER JOIN
        EMPRESA
    ON
        EMPR_COD = PEDI_EMPR_COD
    WHERE
        PEDI_STATUS = 'N'
    AND 
        PEDI_USUA_COD_ASS_4 =   ${usuaCod}
    AND 
        PEDI_ASSINATURA_4 != 'S'
    ORDER BY
        PEDI_DATA DESC
    `
}

export const selectPedidosItemServico = (pediCod: string) => {
  return `
    SELECT 
        PEIT_VALORUNI AS VALOR_UNITARIO,
        UNMA_DESC AS DESCRICAO_MEDIDA,
        PEIT_DESCONTO AS DESCONTO ,
        PEIT_QTD AS QUANTIDADE,
        MATE_DESC AS DESCRICAO,
        PEIT_DTENTREGA AS DTENTREGA,
        PEIT_OBS AS OBSERVACAO,
        'PRODUTO' AS TIPO,
        PEIT_PEDI_COD AS CODIGO,
        (PEIT_VALORUNI * PEIT_QTD) AS VALOR_TOTAL,
        CONCAT(CERE_SIGLA, ' - ',CERE_NOME) AS CR,
        ALMO_DESC AS ALMOXARIFADO
    FROM 
        PEDIDO_ITEM
    INNER JOIN 
        UNID_MAT
    ON
        UNMA_COD = PEIT_UNMA_COD
    INNER JOIN
        MATERIAL
    ON
        MATE_COD = PEIT_MATE_COD
    INNER JOIN
        CENTRO_RESULTADO
    ON
        CERE_COD = PEIT_CERE_COD
    INNER JOIN
        ALMOXARIFADO
    ON
        PEIT_ALMO_COD = ALMO_COD
    WHERE 
        PEIT_PEDI_COD = ${pediCod}

    UNION ALL

    SELECT 
        PESE_VALOR_UNITARIO  AS VALOR_UNITARIO,
        UNMA_DESC AS DESCRICAO_MEDIDA,
        PESE_DESCONTO AS DESCONTO,
        PESE_QUANTIDADE AS QUANTIDADE,
        SERV_DESC AS DESCRICAO,
        GETDATE() AS DTENTREGA,
        PESE_OBS AS OBSERVACAO,
        'SERVICO' AS TIPO,
        PESE_PEDI_COD AS CODIGO,
        (PESE_VALOR_UNITARIO * PESE_QUANTIDADE) AS VALOR_TOTAL,
        CONCAT(CERE_SIGLA, ' - ',CERE_NOME) AS CR,
        ALMO_DESC AS ALMOXARIFADO
    FROM 
        PEDIDO_SERVICO
    INNER JOIN 
        UNID_MAT
    ON
        UNMA_COD = PESE_UNMA_COD
    INNER JOIN
        SERVICOS
    ON
        SERV_COD = PESE_SERV_COD
    INNER JOIN
        CENTRO_RESULTADO
    ON
        CERE_COD = PESE_CERE_COD
    INNER JOIN
        ALMOXARIFADO
    ON
        PESE_ALMO_COD = ALMO_COD
    WHERE 
        PESE_PEDI_COD = ${pediCod}
        ORDER BY 
    CODIGO
    `
}

export const searchNumero4 = (usuaCod: string, pediNumero: string) => {
  return `
        SELECT
            PEDI_TOTAL_MERC,
            PEDI_OBS,
            PEDI_DESCONTO,
            PEDI_STATUS,
            PEDI_FRETE,
            PEDI_VALOR_APROVADO,
            PEDI_VALOR_TOTAL,
            PEDI_COD,
            PEDI_NUMERO,
            FORN_NOME,
            PEDI_DATA,
            4 AS ASS,
            EMPR_NOME
        FROM
            pedido_estoque
        INNER JOIN
            FORNECEDOR
        ON
            FORN_COD = PEDI_FORN_COD
        INNER JOIN
            EMPRESA
        ON
            EMPR_COD = PEDI_EMPR_COD
        WHERE
            PEDI_STATUS = 'N'
        AND 
            PEDI_USUA_COD_ASS_4 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_4 != 'S'
        AND
            PEDI_NUMERO = '${pediNumero}'
        ORDER BY
            PEDI_DATA DESC
    `
}

export const searchNumero3 = (usuaCod: string, pediNumero: string) => {
  return `
          SELECT
              PEDI_TOTAL_MERC,
              PEDI_OBS,
              PEDI_DESCONTO,
              PEDI_STATUS,
              PEDI_FRETE,
              PEDI_VALOR_APROVADO,
              PEDI_VALOR_TOTAL,
              PEDI_COD,
              PEDI_NUMERO,
              FORN_NOME,
              PEDI_DATA,
              3 AS ASS,
              EMPR_NOME
          FROM
              pedido_estoque
          INNER JOIN
              FORNECEDOR
          ON
              FORN_COD = PEDI_FORN_COD
          INNER JOIN
              EMPRESA
          ON
              EMPR_COD = PEDI_EMPR_COD
          WHERE
              PEDI_STATUS = 'N'
          AND 
              PEDI_USUA_COD_ASS_3 =   ${usuaCod}
          AND 
              PEDI_ASSINATURA_3 != 'S'
          AND
              PEDI_NUMERO = '${pediNumero}'
          ORDER BY
              PEDI_DATA DESC
      `
}

export const searchNumero2 = (usuaCod: string, pediNumero: string) => {
  return `
          SELECT
              PEDI_TOTAL_MERC,
              PEDI_OBS,
              PEDI_DESCONTO,
              PEDI_STATUS,
              PEDI_FRETE,
              PEDI_VALOR_APROVADO,
              PEDI_VALOR_TOTAL,
              PEDI_COD,
              PEDI_NUMERO,
              FORN_NOME,
              PEDI_DATA,
              2 AS ASS,
              EMPR_NOME
          FROM
              pedido_estoque
          INNER JOIN
              FORNECEDOR
          ON
              FORN_COD = PEDI_FORN_COD
          INNER JOIN
              EMPRESA
          ON
              EMPR_COD = PEDI_EMPR_COD
          WHERE
              PEDI_STATUS = 'N'
          AND 
              PEDI_USUA_COD_ASS_2 =   ${usuaCod}
          AND 
              PEDI_ASSINATURA_2 != 'S'
          AND
              PEDI_NUMERO = '${pediNumero}'
          ORDER BY
              PEDI_DATA DESC
      `
}

export const searchNumero1 = (usuaCod: string, pediNumero: string) => {
  return `
            SELECT
                PEDI_TOTAL_MERC,
                PEDI_OBS,
                PEDI_DESCONTO,
                PEDI_STATUS,
                PEDI_FRETE,
                PEDI_VALOR_APROVADO,
                PEDI_VALOR_TOTAL,
                PEDI_COD,
                PEDI_NUMERO,
                FORN_NOME,
                PEDI_DATA,
                1 AS ASS,
                EMPR_NOME
            FROM
                pedido_estoque
            INNER JOIN
                FORNECEDOR
            ON
                FORN_COD = PEDI_FORN_COD
            INNER JOIN
                EMPRESA
            ON
                EMPR_COD = PEDI_EMPR_COD
            WHERE
                PEDI_STATUS = 'N'
            AND 
                PEDI_USUA_COD_ASS_1 =   ${usuaCod}
            AND 
                PEDI_ASSINATURA_1 != 'S'
            AND
                PEDI_NUMERO = '${pediNumero}'
            ORDER BY
                PEDI_DATA DESC
        `
}

export const searchForn1 = (usuaCod: string, fornNome: string) => {
  return `
              SELECT
                  PEDI_TOTAL_MERC,
                  PEDI_OBS,
                  PEDI_DESCONTO,
                  PEDI_STATUS,
                  PEDI_FRETE,
                  PEDI_VALOR_APROVADO,
                  PEDI_VALOR_TOTAL,
                  PEDI_COD,
                  PEDI_NUMERO,
                  FORN_NOME,
                  PEDI_DATA,
                  1 AS ASS,
                  EMPR_NOME
              FROM
                  pedido_estoque
              INNER JOIN
                  FORNECEDOR
              ON
                  FORN_COD = PEDI_FORN_COD
              INNER JOIN
                  EMPRESA
              ON
                  EMPR_COD = PEDI_EMPR_COD
              WHERE
                  PEDI_STATUS = 'N'
              AND 
                  PEDI_USUA_COD_ASS_1 =   ${usuaCod}
              AND 
                  PEDI_ASSINATURA_1 != 'S'
              AND
                  FORN_NOME LIKE '%${fornNome}%'
              ORDER BY
                  PEDI_DATA DESC
          `
}

export const searchForn2 = (usuaCod: string, fornNome: string) => {
  return `
                SELECT
                    PEDI_TOTAL_MERC,
                    PEDI_OBS,
                    PEDI_DESCONTO,
                    PEDI_STATUS,
                    PEDI_FRETE,
                    PEDI_VALOR_APROVADO,
                    PEDI_VALOR_TOTAL,
                    PEDI_COD,
                    PEDI_NUMERO,
                    FORN_NOME,
                    PEDI_DATA,
                    2 AS ASS,
                    EMPR_NOME
                FROM
                    pedido_estoque
                INNER JOIN
                    FORNECEDOR
                ON
                    FORN_COD = PEDI_FORN_COD
                INNER JOIN
                    EMPRESA
                ON
                    EMPR_COD = PEDI_EMPR_COD
                WHERE
                    PEDI_STATUS = 'N'
                AND 
                    PEDI_USUA_COD_ASS_2 =   ${usuaCod}
                AND 
                    PEDI_ASSINATURA_2 != 'S'
                AND
                    FORN_NOME LIKE '%${fornNome}%'
                ORDER BY
                    PEDI_DATA DESC
            `
}

export const searchForn3 = (usuaCod: string, fornNome: string) => {
  return `
        SELECT
            PEDI_TOTAL_MERC,
            PEDI_OBS,
            PEDI_DESCONTO,
            PEDI_STATUS,
            PEDI_FRETE,
            PEDI_VALOR_APROVADO,
            PEDI_VALOR_TOTAL,
            PEDI_COD,
            PEDI_NUMERO,
            FORN_NOME,
            PEDI_DATA,
            3 AS ASS,
            EMPR_NOME
        FROM
            pedido_estoque
        INNER JOIN
            FORNECEDOR
        ON
            FORN_COD = PEDI_FORN_COD
        INNER JOIN
            EMPRESA
        ON
            EMPR_COD = PEDI_EMPR_COD
        WHERE
            PEDI_STATUS = 'N'
        AND 
            PEDI_USUA_COD_ASS_3 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_3 != 'S'
        AND
            FORN_NOME LIKE '%${fornNome}%'
        ORDER BY
            PEDI_DATA 
        DESC
        `
}

export const searchForn4 = (usuaCod: string, fornNome: string) => {
  return `
          SELECT
              PEDI_TOTAL_MERC,
              PEDI_OBS,
              PEDI_DESCONTO,
              PEDI_STATUS,
              PEDI_FRETE,
              PEDI_VALOR_APROVADO,
              PEDI_VALOR_TOTAL,
              PEDI_COD,
              PEDI_NUMERO,
              FORN_NOME,
              PEDI_DATA,
              4 AS ASS,
              EMPR_NOME
          FROM
              pedido_estoque
          INNER JOIN
              FORNECEDOR
          ON
              FORN_COD = PEDI_FORN_COD
          INNER JOIN
              EMPRESA
          ON
              EMPR_COD = PEDI_EMPR_COD
          WHERE
              PEDI_STATUS = 'N'
          AND 
              PEDI_USUA_COD_ASS_4 =   ${usuaCod}
          AND 
              PEDI_ASSINATURA_4 != 'S'
          AND
              FORN_NOME LIKE '%${fornNome}%'
          ORDER BY
              PEDI_DATA 
          DESC
          `
}

export const searchFunc1 = (usuaCod: string, funcNome: string) => {
  return `
        SELECT
            PEDI_TOTAL_MERC,
            PEDI_OBS,
            PEDI_DESCONTO,
            PEDI_STATUS,
            PEDI_FRETE,
            PEDI_VALOR_APROVADO,
            PEDI_VALOR_TOTAL,
            PEDI_COD,
            PEDI_NUMERO,
            FORN_NOME,
            PEDI_DATA,
            1 AS ASS,
            EMPR_NOME,
            PESS_NOME
        FROM
            pedido_estoque
        INNER JOIN
            FORNECEDOR
        ON
            FORN_COD = PEDI_FORN_COD
        INNER JOIN
            EMPRESA
        ON
            EMPR_COD = PEDI_EMPR_COD
        INNER JOIN
            PESSOAL
        ON
            PESS_COD = PEDI_PESS_COD
        WHERE
            PEDI_STATUS = 'N'
        AND 
            PEDI_USUA_COD_ASS_1 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_1 != 'S'
        AND
            PESS_NOME LIKE '%${funcNome}%'
        ORDER BY
            PEDI_DATA 
        DESC
        `
}

export const searchFunc2 = (usuaCod: string, funcNome: string) => {
  return `
        SELECT
            PEDI_TOTAL_MERC,
            PEDI_OBS,
            PEDI_DESCONTO,
            PEDI_STATUS,
            PEDI_FRETE,
            PEDI_VALOR_APROVADO,
            PEDI_VALOR_TOTAL,
            PEDI_COD,
            PEDI_NUMERO,
            FORN_NOME,
            PEDI_DATA,
            2 AS ASS,
            EMPR_NOME,
            PESS_NOME
        FROM
            pedido_estoque
        INNER JOIN
            FORNECEDOR
        ON
            FORN_COD = PEDI_FORN_COD
        INNER JOIN
            EMPRESA
        ON
            EMPR_COD = PEDI_EMPR_COD
        INNER JOIN
            PESSOAL
        ON
            PESS_COD = PEDI_PESS_COD
        WHERE
            PEDI_STATUS = 'N'
        AND 
            PEDI_USUA_COD_ASS_2 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_2 != 'S'
        AND
            PESS_NOME LIKE '%${funcNome}%'
        ORDER BY
            PEDI_DATA 
        DESC
        `
}

export const searchFunc3 = (usuaCod: string, funcNome: string) => {
  return `
        SELECT
            PEDI_TOTAL_MERC,
            PEDI_OBS,
            PEDI_DESCONTO,
            PEDI_STATUS,
            PEDI_FRETE,
            PEDI_VALOR_APROVADO,
            PEDI_VALOR_TOTAL,
            PEDI_COD,
            PEDI_NUMERO,
            FORN_NOME,
            PEDI_DATA,
            3 AS ASS,
            EMPR_NOME,
            PESS_NOME
        FROM
            pedido_estoque
        INNER JOIN
            FORNECEDOR
        ON
            FORN_COD = PEDI_FORN_COD
        INNER JOIN
            EMPRESA
        ON
            EMPR_COD = PEDI_EMPR_COD
        INNER JOIN
            PESSOAL
        ON
            PESS_COD = PEDI_PESS_COD
        WHERE
            PEDI_STATUS = 'N'
        AND 
            PEDI_USUA_COD_ASS_3 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_3 != 'S'
        AND
            PESS_NOME LIKE '%${funcNome}%'
        ORDER BY
            PEDI_DATA 
        DESC
        `
}

export const searchFunc4 = (usuaCod: string, funcNome: string) => {
  return `
        SELECT
            PEDI_TOTAL_MERC,
            PEDI_OBS,
            PEDI_DESCONTO,
            PEDI_STATUS,
            PEDI_FRETE,
            PEDI_VALOR_APROVADO,
            PEDI_VALOR_TOTAL,
            PEDI_COD,
            PEDI_NUMERO,
            FORN_NOME,
            PEDI_DATA,
            4 AS ASS,
            EMPR_NOME,
            PESS_NOME
        FROM
            pedido_estoque
        INNER JOIN
            FORNECEDOR
        ON
            FORN_COD = PEDI_FORN_COD
        INNER JOIN
            EMPRESA
        ON
            EMPR_COD = PEDI_EMPR_COD
        INNER JOIN
            PESSOAL
        ON
            PESS_COD = PEDI_PESS_COD
        WHERE
            PEDI_STATUS = 'N'
        AND 
            PEDI_USUA_COD_ASS_4 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_4 != 'S'
        AND
            PESS_NOME LIKE '%${funcNome}%'
        ORDER BY
            PEDI_DATA 
        DESC
        `
}

export const updateASS1 = (pediCod: string) => {
  return `
    UPDATE 
        PEDIDO_ESTOQUE
    SET
        PEDI_ASSINATURA_1 = 'S',
        PEDI_DATA_APROVACAO1 = GETDATE()

    WHERE
        PEDI_COD = ${pediCod}
  `
}

export const updateASS2 = (pediCod: string) => {
  return `
      UPDATE 
          PEDIDO_ESTOQUE
      SET
          PEDI_ASSINATURA_2 = 'S'
            PEDI_DATA_APROVACAO2 = GETDATE()
      WHERE
          PEDI_COD = ${pediCod}
    `
}

export const updateASS3 = (pediCod: string) => {
  return `
        UPDATE 
            PEDIDO_ESTOQUE
        SET
            PEDI_ASSINATURA_3 = 'S',
            PEDI_DATA_APROVACAO3 = GETDATE()

        WHERE
            PEDI_COD = ${pediCod}
      `
}

export const updateASS4 = (pediCod: string) => {
  return `
          UPDATE 
              PEDIDO_ESTOQUE
          SET
              PEDI_ASSINATURA_4 = 'S',
              PEDI_DATA_APROVACAO4 = GETDATE()
          WHERE
              PEDI_COD = ${pediCod}
        `
}

export const searchEmprUsua = (usuaCod: string) => {
  return `SELECT 
            DISTINCT (EMPR_COD),
            EMPR_NOME
          FROM 
            EMPRESA
          INNER JOIN
            GRUPO_CR
          ON 
            EMPR_COD = GRCR_EMPR_COD
          INNER JOIN
            CENTRO_RESULTADO
          ON 
            GRCR_COD = CERE_GRCR_COD
          INNER JOIN
            USUARIO_CR
          ON
            CERE_COD = USCR_CERE_COD
          WHERE
            EMPR_IND_BLOQ = 'N'
          AND
            USCR_USUA_COD = ${usuaCod}`
}

export const verifyPassword = (cod: string) => {
  return `
    SELECT 
      USUA_SENHA_APP
    FROM 
      USUARIO
    WHERE
      USUA_COD = ${cod}
  `
}

export const updateASS = (pediCod: string, posCod: string) => {
  return `
    UPDATE 
        PEDIDO_ESTOQUE
    SET
        PEDI_ASSINATURA_${posCod} = 'S',
        PEDI_DATA_APROVACAO${posCod} = GETDATE()

    WHERE
        PEDI_COD = ${pediCod}
  `
}

export const selectSoliComp1 = (usuaCod:number) => {
  return `
    SELECT 
      SOCO_COD,
      SOCO_DTSOLI,
      SOCO_OBS,
      SOCO_ASSINATURA_1,
      SOCO_USUA_COD_ASS_1,
      SOCO_NUMERO,
      SOCO_QTD_NECE,
      SOCO_ALMO_COD,
      SOCO_MATE_COD,
      ESTO_CUSTO_MEDIO,
      (
        SELECT 
          (ISNULL(ESTO_CUSTO_MEDIO,0) * SOCO_QTD_NECE)
      ) as valor_total,
      '1' AS ASS,
      CERE_SIGLA,
      CERE_NOME,
      PESS_NOME,
      SOCO_SERV_COD,
      (
        SELECT
          SERV_DESC
        FROM
          SERVICOS
        WHERE
          SERV_COD = SOCO_SERV_COD
      ) AS SERV_DESC,
      (
        SELECT
          MATE_DESC
        FROM
          MATERIAL
        WHERE
          MATE_COD = SOCO_MATE_COD
      ) MATE_DESC
    FROM
      SOLICITACAO_COMPRA
    INNER JOIN 
      ESTOQUE
    ON
      ESTO_ALMO_COD = SOCO_ALMO_COD
    INNER JOIN 
      CENTRO_RESULTADO
    ON
      CERE_COD = SOCO_CERE_COD
    INNER JOIN 
      PESSOAL
    ON
      PESS_COD = SOCO_PESS_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND 
      SOCO_ASSINATURA_1 != 'S'
    AND 
      SOCO_USUA_COD_ASS_1 = ${usuaCod}
  `
}

export const selectSoliComp2 = (usuaCod: number) => {
  return `
    SELECT 
      SOCO_COD,
      SOCO_DTSOLI,
      SOCO_OBS,
      SOCO_ASSINATURA_2,
      SOCO_USUA_COD_ASS_2,
      SOCO_NUMERO,
      SOCO_QTD_NECE,
      SOCO_ALMO_COD,
      SOCO_MATE_COD,
      ESTO_CUSTO_MEDIO,
      (
        SELECT 
          (ISNULL(ESTO_CUSTO_MEDIO,0) * SOCO_QTD_NECE)
      ) as valor_total,
      '2' AS ASS,
      CERE_SIGLA,
      CERE_NOME,
      PESS_NOME,
      SOCO_SERV_COD,
      (
        SELECT
          SERV_DESC
        FROM
          SERVICOS
        WHERE
          SERV_COD = SOCO_SERV_COD
      ) AS SERV_DESC,
      (
        SELECT
          MATE_DESC
        FROM
          MATERIAL
        WHERE
          MATE_COD = SOCO_MATE_COD
      ) AS MATE_DESC
    FROM
      SOLICITACAO_COMPRA
    INNER JOIN 
      ESTOQUE
    ON
      ESTO_ALMO_COD = SOCO_ALMO_COD
    INNER JOIN 
      CENTRO_RESULTADO
    ON
      CERE_COD = SOCO_CERE_COD
    INNER JOIN 
      PESSOAL
    ON
      PESS_COD = SOCO_PESS_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND 
      SOCO_ASSINATURA_2 != 'S'
    AND 
      SOCO_USUA_COD_ASS_2 = ${usuaCod}
  `
}

export const updateASSSolicitacao = (socoCod: string, posCod: string) => {
  return `
    UPDATE 
        SOLICITACAO_COMPRA
    SET
        SOCO_ASSINATURA_${posCod} = 'S',
        SOCO_DATA_APROVACAO${posCod} = GETDATE()

    WHERE
        SOCO_COD = ${socoCod}
  `
}
