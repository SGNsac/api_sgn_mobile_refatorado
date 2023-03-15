/* eslint-disable @typescript-eslint/no-explicit-any */
const dataAtual = () => {
  const date = new Date()

  let data:any

  date.getDate() > 10 ? data = date.getDate() : data = '0' + date.getDate()

  let month: string | number

  date.getMonth() + 1 < 10 ? month = '0' + (date.getMonth() + 1) : month = date.getMonth() + 1

  const dateFormated = date.getFullYear() + '-' + month + '-' + data

  return dateFormated
}

export default dataAtual
