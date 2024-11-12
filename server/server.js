import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'

import userRoutes from './routes/user.js'
import chatRoutes from './routes/chat.route.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", userRoutes)
app.use("/api/chat", chatRoutes)

const PORT = process.env.PORT || 5000
const URI = process.env.MONGO_URI

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})

