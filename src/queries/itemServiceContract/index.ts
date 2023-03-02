export const selectItemContServ = (cod: string) => {
  return `
    SELECT 
        ICCS_DESCONTO,
        ICCS_COCS_COD,
        ICCS_SERV_COD,
        ICCS_QUANTIDADE,
        ICCS_VLR_UNIT,
        ICCS_UNMA_COD,
        ICCS_OBS,
        ICCS_VLR_UNIT_ATUAL,
        SERV_DESC_TEC,
        SERV_DESC
    FROM
        ITEM_CONTRATO_COMPRA_SERVICO
    INNER JOIN
        CONTRATO_COMPRA_SERVICO
    ON
        COCS_COD = ICCS_COCS_COD
    INNER JOIN
        SERVICOS
    ON
        SERV_COD = ICCS_SERV_COD
    WHERE 
        SERV_COD = ${cod}
  `
}
