import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

import questionsRouter from './routes/questions.js'
import submissionsRouter from './routes/submissions.js'
import settingsRouter from './routes/settings.js'
import authRouter from './routes/auth.js'
import sectionsRouter from './routes/sections.js'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || true
}))
app.use(express.json())

app.use('/api/questions', questionsRouter)
app.use('/api/submissions', submissionsRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/auth', authRouter)
app.use('/api/sections', sectionsRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))

export default app
