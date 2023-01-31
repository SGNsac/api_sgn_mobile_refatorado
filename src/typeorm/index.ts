import { DataSource } from 'typeorm'
import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()
export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.SERVER,
  username: 'sa',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  extra: {
    encrypt: false,
    trustServerCertificate: true
  },
  entities: [
    'C:\\Users\\Reinaldo\\Documents\\api_sgn_mobile_refatorado\\src\\typeorm\\entities\\*.ts'
  ],
  migrations: [
    'C:\\Users\\Reinaldo\\Documents\\api_sgn_mobile_refatorado\\src\\typeorm\\migrations\\*.ts'
  ]
})
