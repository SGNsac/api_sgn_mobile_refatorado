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
    './src/typeorm/entities/*.ts'
  ],
  migrations: [
    './src/typeorm/migrations/*.ts'
  ]
})
