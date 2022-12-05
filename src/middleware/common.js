import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'

export const applyCommonMiddlewares = (app) => {
  app.use(express.json())
  app.use(helmet())
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
  app.use(morgan('common'))
  app.use(bodyParser.json({ limit: '30mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
  app.use(cors())
}
