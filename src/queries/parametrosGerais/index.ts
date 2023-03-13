export const selectPag2ContrUsuaSmpCrPedCom = () => {
  return `
    SELECT 
        PAG2_CONTR_USUA_SMP_CR_PED_COM 
    FROM 
        PARAMETROS_GERAIS_2
  `
}

export const selectPageNumAprova = () => {
  return `
    SELECT
      PAG2_NUM_APROVACOES_CONTR,
      PAG2_TODAS_APROVACOES_CONTR
    FROM
      PARAMETROS_GERAIS_2
  `
}

export const selectAprovaPedido = () => {
  return `
    SELECT
      PAGE_NUM_APROVACOES_PEDIDO,
      PAGE_TODAS_APROVACOES_PEDIDO
    FROM
      PARAMETROS_GERAIS
  `
}
