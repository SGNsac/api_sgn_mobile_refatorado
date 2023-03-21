export const planilhaUsuaCod1 = (userId: string, planilhaId: string) => {

  return `SELECT PLAC_COD,PLAC_ASSINATURA_1 FROM PLANILHA_COMPRA
            WHERE PLAC_STATUS = 'A'
              AND
            PLAC_USUA_COD_ASS_1 = ${userId}
            and PLAC_COD = ${planilhaId} and
              (PLAC_ASSINATURA_1 IS NULL
                OR
              PLAC_ASSINATURA_1 != 'S'
                or
              PLAC_ASSINATURA_1 = '')`;
};


export const planilhaUsuaCod2 = (userId: string, planilhaId: string) => {
  return `SELECT PLAC_COD,PLAC_ASSINATURA_2 FROM PLANILHA_COMPRA
            WHERE PLAC_STATUS = 'A'
              AND
            PLAC_USUA_COD_ASS_2 = ${userId}
            and PLAC_COD = ${planilhaId} and
             (PLAC_ASSINATURA_2 IS NULL
                OR
              PLAC_ASSINATURA_2 != 'S'
                or
              PLAC_ASSINATURA_2 = '')`;
};

export const updatePlanilha1 = (userId: string, planilhaId: string) => {
  return `UPDATE PLANILHA_COMPRA SET PLAC_ASSINATURA_1 = 'S',
            PLAC_DATA_APROVACAO1 = getDate() WHERE PLAC_USUA_COD_ASS_1 = ${userId}
            and PLAC_COD = ${planilhaId}
        `;
};


export const updatePlanilha2 = (userId: string, planilhaId: string) => {
  return `UPDATE PLANILHA_COMPRA SET PLAC_ASSINATURA_2 = 'S',
            PLAC_DATA_APROVACAO2 = getDate() WHERE PLAC_USUA_COD_ASS_2 = ${userId}
            and PLAC_COD = ${planilhaId}
        `;
};
