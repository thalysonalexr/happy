import 'dotenv/config'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import '@/services/typeorm'
import path from 'path'

import 'express-async-errors'
import { routing } from '@/routing'
import errorHandler from '@app/errors/handler'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(morgan('dev'))
app.use('/v1', routing)
app.use('/v1/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

export { app }
