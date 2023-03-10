/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { routerV1 } from './routes/v1/index.routes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/v1', routerV1)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`RODANDO NA PORTA ${port}`)
})
