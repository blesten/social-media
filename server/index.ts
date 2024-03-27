import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db'
import routers from './routes'

dotenv.config({
  path: 'config/.env'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/v1/users', routers.userRouter)
app.use('/api/v1/posts', routers.postRouter)
app.use('/api/v1/comments', routers.commentRouter)
app.use('/api/v1/saved', routers.savedRouter)

connectDB()
app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))