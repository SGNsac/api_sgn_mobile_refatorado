import dotenv from 'dotenv'

dotenv.config()

export const queryStringConnect = (url: string, database: string) => {
  const sqlConfig = {
    user: process.env.USERDB + '',
    password: process.env.PASSWORDDB + '',
    database,
    server: url,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
  return sqlConfig
}
