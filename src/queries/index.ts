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
    AND
      PEDI_STATUS != 'AP'
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
        PEDI_USUA_COD_ASS_2 =   ${usuaCod}
    AND 
        PEDI_ASSINATURA_2 != 'S'
    AND 
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'AP'
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
        PEDI_USUA_COD_ASS_3 =   ${usuaCod}
    AND 
        PEDI_ASSINATURA_3 != 'S'
    AND 
      PEDI_ASSINATURA_2 = 'S'
    AND 
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'AP'
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
      PEDI_USUA_COD_ASS_4 =   ${usuaCod}
    AND 
      PEDI_ASSINATURA_4 != 'S'
    AND 
      PEDI_ASSINATURA_3 = 'S'
    AND 
      PEDI_ASSINATURA_2 = 'S'
    AND 
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'AP'
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
            PEDI_STATUS != 'AP'
        AND 
            PEDI_USUA_COD_ASS_4 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_4 != 'S'
        AND 
            PEDI_ASSINATURA_3 = 'S'
        AND 
            PEDI_ASSINATURA_2 = 'S'
        AND 
            PEDI_ASSINATURA_1= 'S'
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
              PEDI_STATUS != 'AP'
          AND 
              PEDI_USUA_COD_ASS_3 =   ${usuaCod}
          AND 
              PEDI_ASSINATURA_3 != 'S'
          AND 
            PEDI_ASSINATURA_2 = 'S'
          AND 
            PEDI_ASSINATURA_1= 'S'
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
              PEDI_STATUS != 'AP'
          AND 
              PEDI_USUA_COD_ASS_2 =   ${usuaCod}
          AND 
              PEDI_ASSINATURA_2 != 'S'

          AND 
            PEDI_ASSINATURA_1= 'S'
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
                PEDI_STATUS != 'AP'
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
                  PEDI_STATUS != 'AP'
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
                    PEDI_STATUS != 'AP'
                AND 
                    PEDI_USUA_COD_ASS_2 =   ${usuaCod}
                AND 
                    PEDI_ASSINATURA_2 != 'S'
                 AND 
                    PEDI_ASSINATURA_1= 'S'
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
            PEDI_STATUS != 'AP'
        AND 
            PEDI_USUA_COD_ASS_3 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_3 != 'S'
        AND 
            PEDI_ASSINATURA_2 = 'S'
        AND 
            PEDI_ASSINATURA_1= 'S'
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
              PEDI_STATUS != 'AP'
          AND 
              PEDI_USUA_COD_ASS_4 =   ${usuaCod}
          AND 
              PEDI_ASSINATURA_4 != 'S'
          AND 
            PEDI_ASSINATURA_3 = 'S'
          AND 
            PEDI_ASSINATURA_2 = 'S'
          AND 
            PEDI_ASSINATURA_1= 'S'
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
            PEDI_STATUS != 'AP'
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
            PEDI_STATUS != 'AP'
        AND 
            PEDI_USUA_COD_ASS_2 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_2 != 'S'
        AND 
            PEDI_ASSINATURA_1= 'S'
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
            PEDI_STATUS != 'AP'
        AND 
            PEDI_USUA_COD_ASS_3 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_3 != 'S'
        AND 
            PEDI_ASSINATURA_2 = 'S'
        AND 
            PEDI_ASSINATURA_1= 'S'
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
            PEDI_STATUS != 'AP'
        AND 
            PEDI_USUA_COD_ASS_4 =   ${usuaCod}
        AND 
            PEDI_ASSINATURA_4 != 'S'
        AND 
            PEDI_ASSINATURA_3 = 'S'
        AND 
            PEDI_ASSINATURA_2 = 'S'
        AND 
            PEDI_ASSINATURA_1= 'S'
        AND
            PESS_NOME LIKE '%${funcNome}%'
        ORDER BY
            PEDI_DATA 
        DESC
        `
}

export const updatePedidoASS = (pediCod: string, pos:string, sqlQuery : string) => {
  return `
    UPDATE 
        PEDIDO_ESTOQUE
    SET
        PEDI_ASSINATURA_${pos} = 'S',
        ${sqlQuery}
        PEDI_DATA_APROVACAO${pos} = GETDATE()

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

export const selectSoliComp1 = (usuaCod: number) => {
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
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
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
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND 
      SOCO_ASSINATURA_1 != 'S'
    AND
      SOCO_STATUS != 'AP'
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
      ) AS MATE_DESC,
      SECO_DESC ,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
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
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND 
      SOCO_ASSINATURA_2 != 'S'
    AND
      SOCO_STATUS != 'AP'
    AND 
      SOCO_ASSINATURA_1 = 'S'
    AND 
      SOCO_USUA_COD_ASS_2 = ${usuaCod}
  `
}

export const selectSoliCompNumero = (usuaCod: number, socoNUMERO: string, pos: string) => {
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
      '${pos}' AS ASS,
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
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
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
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND 
      SOCO_ASSINATURA_${pos} != 'S'
    AND 
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND 
      SOCO_NUMERO = '${socoNUMERO}'
    AND 
      SOCO_STATUS != 'AP'
  `
}

export const selectSoliCompAlmoxarifado = (usuaCod: number, almoDesc: string, pos: string) => {
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
      '${pos}' AS ASS,
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
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
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
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND 
      SOCO_ASSINATURA_${pos} != 'S'
    AND 
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND 
      ALMO_DESC LIKE '%${almoDesc}%'
    AND 
      SOCO_STATUS != 'AP'
  `
}

export const selectSoliCompCR = (usuaCod: number, cereNome: string, pos: string) => {
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
      '${pos}' AS ASS,
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
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
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
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND 
      SOCO_ASSINATURA_${pos} != 'S'
    AND 
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND 
      CERE_NOME LIKE '%${cereNome}%'
    AND 
      SOCO_STATUS != 'AP'
  `
}

export const selectSoliCompSetorCompras = (usuaCod: number, SECO_DESC: string, pos: string) => {
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
      '${pos}' AS ASS,
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
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
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
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND 
      SOCO_ASSINATURA_${pos} != 'S'
    AND 
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND 
      SOCO_STATUS != 'AP'
    AND 
      SECO_DESC LIKE '%${SECO_DESC}%'
  `
}

export const selectSoliCompData = (usuaCod: number, SOCO_DTSOLI: string, pos: string) => {
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
      '${pos}' AS ASS,
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
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
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
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND 
      SOCO_ASSINATURA_${pos} != 'S'
    AND 
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND 
      SOCO_STATUS != 'AP'
    AND 
      SOCO_DTSOLI = '${SOCO_DTSOLI}'
  `
}

export const updateASSSolicitacao = (socoCod: string, posCod: string, sqlQuery: string) => {
  return `
    UPDATE 
        SOLICITACAO_COMPRA
    SET
        SOCO_ASSINATURA_${posCod} = 'S',
        ${sqlQuery}
        SOCO_DATA_APROVACAO${posCod} = GETDATE()

    WHERE
        SOCO_COD = ${socoCod}
  `
}

export const selectServiceContract1 = (usuaCod: string) => {
  return `
    SELECT 
      COCS_DT_INICIO,
      COCS_DT_FIM,
      COCS_FORN_COD,
      COCS_TERC_COD,
      COCS_CERE_COD,
      COCS_SERV_COD,
      COCS_QUANTIDADE,
      COCS_VLR_UNIT,
      COCS_FORMA_PAGAMENTO,
      COCS_PRAZO,
      COCS_EMPR_COD,
      COCS_FILI_COD,
      COCS_DATA_APROVACAO1,
      COCS_DT_CONTRATO,
      COCS_TIPO_MEDICAO,
      SERV_DESC,
      FORN_NOME,
      '1' AS ASS,
      COCS_COD,
      (
        SELECT 
          SUM(ICCS_QUANTIDADE * ICCS_VLR_UNIT)
        FROM
          ITEM_CONTRATO_COMPRA_SERVICO
        WHERE
          ICCS_COCS_COD = COCS_COD     
      ) AS VALOR_TOTAL,
      EMPR_NOME,
      FILI_NOME_FANTASIA                                                            
    FROM
      CONTRATO_COMPRA_SERVICO
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = COCS_FORN_COD
    INNER JOIN
      SERVICOS
    ON
      SERV_COD = COCS_SERV_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = COCS_CERE_COD
        INNER JOIN
      EMPRESA
    ON
      EMPR_COD = COCS_EMPR_COD
    INNER JOIN
      FILIAL
    ON
      FILI_COD = COCS_FILI_COD
    WHERE
      COCS_USUA_COD_ASS_1 = ${usuaCod}
    AND 
      COCS_ASSINATURA_1 != 'S'
    AND
      COCS_STATUS != 'AP'
  `
}

export const selectServiceContract2 = (usuaCod: string) => {
  return `
    SELECT 
      COCS_DT_INICIO,
      COCS_DT_FIM,
      COCS_FORN_COD,
      COCS_TERC_COD,
      COCS_CERE_COD,
      COCS_SERV_COD,
      COCS_QUANTIDADE,
      COCS_VLR_UNIT,
      COCS_FORMA_PAGAMENTO,
      COCS_PRAZO,
      COCS_EMPR_COD,
      COCS_FILI_COD,
      COCS_DATA_APROVACAO1,
      COCS_DT_CONTRATO,
      COCS_TIPO_MEDICAO,
      SERV_DESC,
      FORN_NOME,
      '2' AS ASS,
      COCS_COD,
      (
        SELECT 
          SUM(ICCS_QUANTIDADE * ICCS_VLR_UNIT)
        FROM
          ITEM_CONTRATO_COMPRA_SERVICO
        WHERE
          ICCS_COCS_COD = COCS_COD     
      ) AS VALOR_TOTAL,
      EMPR_NOME,
      FILI_NOME_FANTASIA                                                                
    FROM
      CONTRATO_COMPRA_SERVICO
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = COCS_FORN_COD
    INNER JOIN
      SERVICOS
    ON
      SERV_COD = COCS_SERV_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = COCS_CERE_COD
        INNER JOIN
      EMPRESA
    ON
      EMPR_COD = COCS_EMPR_COD
    INNER JOIN
      FILIAL
    ON
      FILI_COD = COCS_FILI_COD
    WHERE
      COCS_USUA_COD_ASS_2 = ${usuaCod}
    AND 
      COCS_ASSINATURA_2 != 'S'
    AND 
      COCS_ASSINATURA_1 = 'S'
    AND
      COCS_STATUS != 'AP'
  `
}

export const selectServiceContract3 = (usuaCod: string) => {
  return `
    SELECT 
      COCS_DT_INICIO,
      COCS_DT_FIM,
      COCS_FORN_COD,
      COCS_TERC_COD,
      COCS_CERE_COD,
      COCS_SERV_COD,
      COCS_QUANTIDADE,
      COCS_VLR_UNIT,
      COCS_FORMA_PAGAMENTO,
      COCS_PRAZO,
      COCS_EMPR_COD,
      COCS_FILI_COD,
      COCS_DATA_APROVACAO1,
      COCS_DT_CONTRATO,
      COCS_TIPO_MEDICAO,
      SERV_DESC,
      FORN_NOME,
      '3' AS ASS,
      COCS_COD,
      (
        SELECT 
          SUM(ICCS_QUANTIDADE * ICCS_VLR_UNIT)
        FROM
          ITEM_CONTRATO_COMPRA_SERVICO
        WHERE
          ICCS_COCS_COD = COCS_COD     
      ) AS VALOR_TOTAL,
      EMPR_NOME,
      FILI_NOME_FANTASIA                                                               
    FROM
      CONTRATO_COMPRA_SERVICO
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = COCS_FORN_COD
    INNER JOIN
      SERVICOS
    ON
      SERV_COD = COCS_SERV_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = COCS_CERE_COD
          INNER JOIN
      EMPRESA
    ON
      EMPR_COD = COCS_EMPR_COD
    INNER JOIN
      FILIAL
    ON
      FILI_COD = COCS_FILI_COD
    WHERE
      COCS_USUA_COD_ASS_3 = ${usuaCod}
    AND 
      COCS_ASSINATURA_3 != 'S'
    AND 
      COCS_ASSINATURA_1 = 'S'
    AND
      COCS_ASSINATURA_2 = 'S'
    AND
      COCS_STATUS != 'AP'
  `
}
export const selectServiceContract4 = (usuaCod: string) => {
  return `
    SELECT 
      COCS_DT_INICIO,
      COCS_DT_FIM,
      COCS_FORN_COD,
      COCS_TERC_COD,
      COCS_CERE_COD,
      COCS_SERV_COD,
      COCS_QUANTIDADE,
      COCS_VLR_UNIT,
      COCS_FORMA_PAGAMENTO,
      COCS_PRAZO,
      COCS_EMPR_COD,
      COCS_FILI_COD,
      COCS_DATA_APROVACAO1,
      COCS_DT_CONTRATO,
      COCS_TIPO_MEDICAO,
      SERV_DESC,
      FORN_NOME,
      '4' AS ASS,
      COCS_COD,
      (
        SELECT 
          SUM(ICCS_QUANTIDADE * ICCS_VLR_UNIT)
        FROM
          ITEM_CONTRATO_COMPRA_SERVICO
        WHERE
          ICCS_COCS_COD = COCS_COD     
      ) AS VALOR_TOTAL,
      EMPR_NOME,
      FILI_NOME_FANTASIA
    FROM
      CONTRATO_COMPRA_SERVICO
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = COCS_FORN_COD
    INNER JOIN
      SERVICOS
    ON
      SERV_COD = COCS_SERV_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = COCS_CERE_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = COCS_EMPR_COD
    INNER JOIN
      FILIAL
    ON
      FILI_COD = COCS_FILI_COD
    WHERE
      COCS_USUA_COD_ASS_4 = ${usuaCod}
    AND 
      COCS_ASSINATURA_4 != 'S'
    AND 
      COCS_ASSINATURA_1 = 'S'
    AND
      COCS_ASSINATURA_2 = 'S'
    AND
      COCS_ASSINATURA_3 = 'S'
    AND
      COCS_STATUS != 'AP'      
  `
}

export const countNumAprov = (cod: string) => {
  return `
    SELECT
      (
        (
          SELECT
            COUNT(COCS_ASSINATURA_1)
          FROM
            CONTRATO_COMPRA_SERVICO
          WHERE
            COCS_COD = ${cod}
          AND 
            COCS_ASSINATURA_1 = 'S' 
        )
          +
        (
          SELECT
            COUNT(COCS_ASSINATURA_2)
          FROM
            CONTRATO_COMPRA_SERVICO
          WHERE
            COCS_COD = ${cod}
          AND 
            COCS_ASSINATURA_2 = 'S' 
        )
          +
        (
          SELECT
              COUNT(COCS_ASSINATURA_3)
          FROM
              CONTRATO_COMPRA_SERVICO
          WHERE
              COCS_COD = ${cod}
          AND 
            COCS_ASSINATURA_3 = 'S' 
        )
          +
        (
          SELECT
              COUNT(COCS_ASSINATURA_4)
          FROM
              CONTRATO_COMPRA_SERVICO
          WHERE
              COCS_COD = ${cod}
          AND 
            COCS_ASSINATURA_4 = 'S' 
        )
      ) AS NUM
    FROM
      CONTRATO_COMPRA_SERVICO
    WHERE
        COCS_COD = ${cod}
  `
}

export const attContratoCompraServico = (cod: string, ass:string, statusQuery: string) => {
  return `
    UPDATE
      CONTRATO_COMPRA_SERVICO
    SET 
      COCS_ASSINATURA_${ass} = 'S',
      ${statusQuery}
      COCS_DATA_APROVACAO${ass} = GETDATE()
    WHERE
      COCS_COD = ${cod}
  `
}

export const selectBoletim1 = (usuaCod: string) => {
  return `
    SELECT
      BOCS_COD,
      FORN_NOME,
      BOCS_DATA,
      BOCS_DT_INICIO,
      BOCS_DT_FIM,
      BOCS_STATUS,
      BOCS_OBS,
      BOCS_USUA_COD_ASS_1,
      BOCS_ASSINATURA_1,
      BOCS_NUMERO,
      BOCS_DT_VENC,
      '1' AS ASS,
      (
        SELECT
          SUM(BCSI_QUANTIDADE)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) AS QTD,
           (
        SELECT
          SUM(BCSI_VLR_UNIT)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) 
    AS 
      VAL_UNIT
    FROM
      BOLETIM_CONTRATO_SERVICO
    INNER JOIN
      CONTRATO_COMPRA_SERVICO
    ON
      BOCS_COCS_COD =  COCS_COD 
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE 
      BOCS_USUA_COD_ASS_1 = ${usuaCod}
  `
}

export const selectBoletim2 = (usuaCod: string) => {
  return `
    SELECT
      BOCS_COD,
      FORN_NOME,
      BOCS_DATA,
      BOCS_DT_INICIO,
      BOCS_DT_FIM,
      BOCS_STATUS,
      BOCS_OBS,
      BOCS_USUA_COD_ASS_2,
      BOCS_ASSINATURA_2,
      BOCS_NUMERO,
      BOCS_DT_VENC,
      '2' AS ASS,
      (
        SELECT
          SUM(BCSI_QUANTIDADE)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) AS QTD,
           (
        SELECT
          SUM(BCSI_VLR_UNIT)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) 
    AS 
      VAL_UNIT
    FROM
      BOLETIM_CONTRATO_SERVICO
    INNER JOIN
      CONTRATO_COMPRA_SERVICO
    ON
      BOCS_COCS_COD =  COCS_COD 
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE 
      BOCS_USUA_COD_ASS_2 = ${usuaCod}
    AND
      BOCS_ASSINATURA_1 = 'S'
  `
}

export const boletimMedicaoDetalhe = (codigo : string) => {
  return `
    SELECT
      BCSI_SERV_COD,
      SERV_DESC,
      BCSI_BOCS_COD,
      BCSI_QUANTIDADE,
      BCSI_VLR_UNIT
    FROM 
      BOLETIM_CONTRATO_SERVICO_ITENS
    INNER JOIN
      SERVICOS
    ON 
      BCSI_SERV_COD = SERV_COD
    WHERE
      BCSI_BOCS_COD = ${codigo}
  `
}

export const updateBoletim = (pos: string, statusUpdate: string, cod: string) => {
  return `
    UPDATE 
      BOLETIM_CONTRATO_SERVICO
    SET 
      BOCS_ASSINATURA_${pos} = 'S',
      ${statusUpdate}
      BOCS_DATA_APROVACAO${pos} = GETDATE()
    WHERE
      BOCS_COD = ${cod}
  `
}

export const countNumAprovaBoletim = (cod : string) => {
  return `
    SELECT
      (      
        (
        SELECT
          COUNT(BOCS_USUA_COD_ASS_1)
        FROM
          BOLETIM_CONTRATO_SERVICO
        WHERE
          BOCS_COD = ${cod}
        AND 
          BOCS_ASSINATURA_1 = 'S' 
        )
          +
        ( 
          SELECT
            COUNT(BOCS_USUA_COD_ASS_2)
          FROM
            BOLETIM_CONTRATO_SERVICO
          WHERE
            BOCS_COD = ${cod}
          AND
            BOCS_ASSINATURA_2 = 'S'
        )
      ) as NUM
    FROM
      BOLETIM_CONTRATO_SERVICO
    WHERE
      BOCS_COD = ${cod}
  `
}

export const countNumAprovaSoliCompra = (cod: string) => {
  return `
    SELECT
      (      
        (
        SELECT
          COUNT(SOCO_USUA_COD_ASS_1)
        FROM
          SOLICITACAO_COMPRA
        WHERE
          SOCO_COD = ${cod}
        AND 
          SOCO_ASSINATURA_1 = 'S' 
        )
          +
        ( 
          SELECT
            COUNT(SOCO_USUA_COD_ASS_2)
          FROM
            SOLICITACAO_COMPRA
          WHERE
            SOCO_COD = ${cod}
          AND
            SOCO_ASSINATURA_2 = 'S'
        )
      ) as NUM
    FROM
      SOLICITACAO_COMPRA
    WHERE
      SOCO_COD = ${cod}
  `
}

export const countNumAprovaPedido = (cod: string) => {
  return `
    SELECT
      (      
        (
          SELECT
            COUNT(PEDI_USUA_COD_ASS_1)
          FROM
            PEDIDO_ESTOQUE
          WHERE
            PEDI_COD = ${cod}
          AND 
            PEDI_ASSINATURA_1 = 'S' 
        )
          +
        ( 
          SELECT
            COUNT(PEDI_USUA_COD_ASS_2)
          FROM
            PEDIDO_ESTOQUE
          WHERE
            PEDI_COD = ${cod}
          AND 
            PEDI_ASSINATURA_2 = 'S' 
        ) 
          +
        (
          SELECT
            COUNT(PEDI_USUA_COD_ASS_3)
          FROM
            PEDIDO_ESTOQUE
          WHERE
            PEDI_COD = ${cod}
          AND 
            PEDI_ASSINATURA_3 = 'S' 
        )
          +
        (
          SELECT
            COUNT(PEDI_USUA_COD_ASS_4)
          FROM
            PEDIDO_ESTOQUE
          WHERE
            PEDI_COD = ${cod}
          AND 
            PEDI_ASSINATURA_4 = 'S' 
        )
      ) as NUM
    FROM
      PEDIDO_ESTOQUE
    WHERE
      PEDI_COD = ${cod}
  `
}

export const selectPefiPejuPess = () => {
  return `
    SELECT
      PESS_NOME AS NOME,
      PESS_END AS ENDERECO, 
      CIDA_DESC AS CIDADE,
      CIDA_UNFE_SIGLA AS UF,
      PESS_EMAIL AS EMAIL,
      PESS_FONE AS TELEFONE
    FROM 
      PESSOAL
    INNER JOIN 
      CIDADE
    ON
      PESS_CIDA_COD = CIDA_COD 
    WHERE
      PESS_FONE != ''
      
    UNION

    SELECT
      PEFI_NOME AS NOME,
      BAIR_DESC AS ENDERECO, 
      CIDA_DESC AS CIDADE,
      CIDA_UNFE_SIGLA AS UF,
      PEFI_EMAIL AS EMAIL,
      PEFI_TEL AS TELEFONE
    FROM 
      PESSOA_FISICA
    INNER JOIN 
      CIDADE
    ON
      CIDA_COD = PEFI_CIDA_COD
    INNER JOIN
      BAIRRO
    ON
      BAIR_COD = PEFI_BAIR_COD
    WHERE
      PEFI_TEL != ''

    UNION

    SELECT 
      PEJU_RAZAO_SOCIAL AS NOME,
      BAIR_DESC AS ENDERECO, 
      CIDA_DESC AS CIDADE,
      CIDA_UNFE_SIGLA AS UF,
      PEJU_EMAIL AS EMAIL,
      PEJU_TEL AS TELEFONE
    FROM 
      PESSOA_JURIDICA 
    INNER JOIN 
      CIDADE
    ON
      CIDA_COD = PEJU_CIDA_COD
    INNER JOIN
      BAIRRO
    ON
      BAIR_COD = PEJU_BAIR_COD
    WHERE
      PEJU_TEL != ''
  `
}

export const selectAditivoContrato1 = (cod : string, queryString: string) => {
  return `
      SELECT
      ADCS_COD,
      ADCS_QUANTIDADE,
      ADCS_VLR_UNIT,
      ADCS_DESC,
      ADCS_COCS_COD,
      ADCS_APROVADO,
      ADCS_SERV_COD,
      SERV_COD,
      ADCS_DATA_INI,
      ADCS_DATA_FIM,
      ADCS_OBS,
      ADCS_NUMERO,
      (ADCS_QUANTIDADE * ADCS_VLR_UNIT) 
    AS 
      VALOR_TOTAL,
      '1' 
    AS 
      ASS
    FROM
      ADITIVO_CONTRATO_SERVICO
    INNER JOIN 
      SERVICOS
    ON
      SERV_COD = ADCS_SERV_COD
    WHERE
      ADCS_ASSINATURA_1 != 'S'
    AND
      ADCS_USUA_COD_ASS_1 = ${cod}
    ${queryString}
  `
}

export const selectAditivoContrato2 = (cod: string, queryString: string) => {
  return `
      SELECT
      ADCS_COD,
      ADCS_QUANTIDADE,
      ADCS_VLR_UNIT,
      ADCS_DESC,
      ADCS_COCS_COD,
      ADCS_APROVADO,
      ADCS_SERV_COD,
      SERV_COD,
      ADCS_DATA_INI,
      ADCS_DATA_FIM,
      ADCS_OBS,
      ADCS_NUMERO,
      (ADCS_QUANTIDADE * ADCS_VLR_UNIT) 
    AS 
      VALOR_TOTAL,
      '2' 
    AS 
      ASS
    FROM
      ADITIVO_CONTRATO_SERVICO
    INNER JOIN 
      SERVICOS
    ON
      SERV_COD = ADCS_SERV_COD
    WHERE
      ADCS_ASSINATURA_1 = 'S'
    AND
      ADCS_ASSINATURA_2 != 'S'
    AND
      ADCS_USUA_COD_ASS_2 = ${cod}
    ${queryString}
  `
}

export const selectAditivoContrato3 = (cod: string, queryString: string) => {
  return `
      SELECT
      ADCS_COD,
      ADCS_QUANTIDADE,
      ADCS_VLR_UNIT,
      ADCS_DESC,
      ADCS_COCS_COD,
      ADCS_APROVADO,
      ADCS_SERV_COD,
      SERV_COD,
      ADCS_DATA_INI,
      ADCS_DATA_FIM,
      ADCS_OBS,
      ADCS_NUMERO,
      (ADCS_QUANTIDADE * ADCS_VLR_UNIT) 
    AS 
      VALOR_TOTAL,
      '3' 
    AS 
      ASS
    FROM
      ADITIVO_CONTRATO_SERVICO
    INNER JOIN 
      SERVICOS
    ON
      SERV_COD = ADCS_SERV_COD
    WHERE
      ADCS_ASSINATURA_1 = 'S'
    AND
      ADCS_ASSINATURA_2 = 'S'
    AND
      ADCS_ASSINATURA_3 != 'S'
    AND
      ADCS_USUA_COD_ASS_3 = ${cod}
    ${queryString}
  `
}

export const selectAditivoContrato4 = (cod: string, queryString: string) => {
  return `
      SELECT
      ADCS_COD,
      ADCS_QUANTIDADE,
      ADCS_VLR_UNIT,
      ADCS_DESC,
      ADCS_COCS_COD,
      ADCS_APROVADO,
      ADCS_SERV_COD,
      SERV_COD,
      ADCS_DATA_INI,
      ADCS_DATA_FIM,
      ADCS_OBS,
      ADCS_NUMERO,
      (ADCS_QUANTIDADE * ADCS_VLR_UNIT) 
    AS 
      VALOR_TOTAL,
      '4' 
    AS 
      ASS
    FROM
      ADITIVO_CONTRATO_SERVICO
    INNER JOIN 
      SERVICOS
    ON
      SERV_COD = ADCS_SERV_COD
    WHERE
      ADCS_ASSINATURA_1 = 'S'
    AND
      ADCS_ASSINATURA_2 = 'S'
    AND
      ADCS_ASSINATURA_3 = 'S'
    AND
      ADCS_ASSINATURA_4 != 'S'
    AND
      ADCS_USUA_COD_ASS_4 = ${cod}
    ${queryString}
  `
}

export const updateAditivoContrato = (pos:string, cod:string, queryString:string) => {
  return `
    UPDATE 
      ADITIVO_CONTRATO_SERVICO
    SET 
      ADCS_ASSINATURA_${pos} = 'S'
      ${queryString}
    WHERE
      ADCS_COD = ${cod}
  `
}

export const countNumAprovAditivoContrato = (cod: string) => {
  return `
    SELECT
      (
        (
          SELECT
            COUNT(ADCS_ASSINATURA_1)
          FROM
            ADITIVO_CONTRATO_SERVICO
          WHERE
            ADCS_COD = ${cod}
          AND 
            ADCS_ASSINATURA_1 = 'S' 
        )
          +
        (
          SELECT
            COUNT(ADCS_ASSINATURA_2)
          FROM
            ADITIVO_CONTRATO_SERVICO
          WHERE
            ADCS_COD = ${cod}
          AND 
            ADCS_ASSINATURA_2 = 'S' 
        )
          +
        (
          SELECT
              COUNT(ADCS_ASSINATURA_3)
          FROM
              ADITIVO_CONTRATO_SERVICO
          WHERE
              ADCS_COD = ${cod}
          AND 
            ADCS_ASSINATURA_3 = 'S' 
        )
          +
        (
          SELECT
              COUNT(ADCS_ASSINATURA_4)
          FROM
              ADITIVO_CONTRATO_SERVICO
          WHERE
              ADCS_COD = ${cod}
          AND 
            ADCS_ASSINATURA_4 = 'S' 
        )
      ) AS NUM
    FROM
      ADITIVO_CONTRATO_SERVICO
    WHERE
        ADCS_COD = ${cod}
  `
}

export const updatePRCS = (pos: string, cod: string, queryString: string) => {
  return `
    UPDATE 
      PRAZO_CONTRATO_SERVICO 
    SET 
      PRCS_ASSINATURA_${pos} = 'S'
      ${queryString}
    WHERE
      PRCS_COD = ${cod}
  `
}

export const selectPrazoContratoServico1 = (cod: string, queryString : string) => {
  return `
    SELECT
      PRCS_COCS_COD,
      PRCS_COD,
      PRCS_DATA_INI,
      FORN_NOME,
      PRCS_DATA_CADASTRO,
      PRCS_DATA_FIM,
      PRCS_OBS,
      PRCS_NUMERO,
      '1' AS ASS
    FROM
      PRAZO_CONTRATO_SERVICO
    INNER JOIN 
      CONTRATO_COMPRA_SERVICO
    ON
      PRCS_COCS_COD =  COCS_COD
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE
      PRCS_USUA_COD_ASS_1 = ${cod}
    AND
      PRCS_ASSINATURA_1 != 'S'
    ${queryString}
  `
}

export const selectPrazoContratoServico2 = (cod: string, queryString: string) => {
  return `
    SELECT
      PRCS_COCS_COD,
      PRCS_COD,
      PRCS_DATA_INI,
      FORN_NOME,
      PRCS_DATA_CADASTRO,
      PRCS_DATA_FIM,
      PRCS_OBS,
      PRCS_NUMERO,
      '2' AS ASS
    FROM
      PRAZO_CONTRATO_SERVICO
    INNER JOIN 
      CONTRATO_COMPRA_SERVICO
    ON
      PRCS_COCS_COD =  COCS_COD
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE
      PRCS_USUA_COD_ASS_2 = ${cod}
    AND
      PRCS_ASSINATURA_1 = 'S'
    AND
      PRCS_ASSINATURA_2 != 'S'
    ${queryString}
  `
}

export const selectPrazoContratoServico3 = (cod: string, queryString: string) => {
  return `
    SELECT
      PRCS_COCS_COD,
      PRCS_COD,
      PRCS_DATA_INI,
      FORN_NOME,
      PRCS_DATA_CADASTRO,
      PRCS_DATA_FIM,
      PRCS_OBS,
      PRCS_NUMERO,
      '3' AS ASS
    FROM
      PRAZO_CONTRATO_SERVICO
    INNER JOIN 
      CONTRATO_COMPRA_SERVICO
    ON
      PRCS_COCS_COD =  COCS_COD
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE
      PRCS_USUA_COD_ASS_3 = ${cod}
    AND
      PRCS_ASSINATURA_1 = 'S'
    AND
      PRCS_ASSINATURA_2 = 'S'
    AND
      PRCS_ASSINATURA_3 != 'S'     
    ${queryString}
  `
}

export const selectPrazoContratoServico4 = (cod: string, queryString: string) => {
  return `
    SELECT
      PRCS_COCS_COD,
      PRCS_COD,
      PRCS_DATA_INI,
      FORN_NOME,
      PRCS_DATA_CADASTRO,
      PRCS_DATA_FIM,
      PRCS_OBS,
      PRCS_NUMERO,
      '4' AS ASS
    FROM
      PRAZO_CONTRATO_SERVICO
    INNER JOIN 
      CONTRATO_COMPRA_SERVICO
    ON
      PRCS_COCS_COD =  COCS_COD
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE
      PRCS_USUA_COD_ASS_4 = ${cod}
    AND
      PRCS_ASSINATURA_1 = 'S'
    AND
      PRCS_ASSINATURA_2 = 'S'
    AND
      PRCS_ASSINATURA_3 = 'S'      
    AND
      PRCS_ASSINATURA_4 != 'S'
    ${queryString}
  `
}

export const countNumAprovAditivoContratoPR = (cod: string) => {
  return `
    SELECT
      (
        (
          SELECT
            COUNT(PRCS_ASSINATURA_1)
          FROM
            PRAZO_CONTRATO_SERVICO
          WHERE
            PRCS_COD = ${cod}
          AND 
            PRCS_ASSINATURA_1 = 'S' 
        )
          +
        (
          SELECT
            COUNT(PRCS_ASSINATURA_2)
          FROM
            PRAZO_CONTRATO_SERVICO
          WHERE
            PRCS_COD = ${cod}
          AND 
            PRCS_ASSINATURA_2 = 'S' 
        )
          +
        (
          SELECT
              COUNT(PRCS_ASSINATURA_3)
          FROM
              PRAZO_CONTRATO_SERVICO
          WHERE
              PRCS_COD = ${cod}
          AND 
            PRCS_ASSINATURA_3 = 'S' 
        )
          +
        (
          SELECT
              COUNT(PRCS_ASSINATURA_4)
          FROM
              PRAZO_CONTRATO_SERVICO
          WHERE
              PRCS_COD = ${cod}
          AND 
            PRCS_ASSINATURA_4 = 'S' 
        )
      ) AS NUM
    FROM
      PRAZO_CONTRATO_SERVICO
    WHERE
        PRCS_COD = ${cod}
  `
}
