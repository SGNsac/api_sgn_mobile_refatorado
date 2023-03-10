export const verifyUser = (cod: string) => {
  return `
    SELECT 
      USUA_SENHA_APP,
      USUA_BLOQ
    FROM 
      USUARIO
    WHERE
      USUA_COD = ${cod}
  `
}

export const verifyUserSigla = (cod: string) => {
  return `
    SELECT 
      USUA_SENHA_APP,
      USUA_BLOQ,
      USUA_COD
    FROM 
      USUARIO
    WHERE
      USUA_SIGLA = '${cod}'
  `
}

export const verifyUserSpecial = (cod : string) => {
  return `
    SELECT 
      USUA_TIPO
    FROM
      USUARIO
    WHERE
      USUA_COD = ${cod}
  `
}

export const updatePassword = (cod: string, password: string) => {
  return `
    UPDATE
      USUARIO
    SET
      USUA_SENHA_APP = '${password}'
    WHERE
      USUA_COD = ${cod}
  `
}
