import express from 'express'
import morgan from 'morgan'
import appRouter from './routes/index.js'

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use("/api/v1", appRouter)

export default app