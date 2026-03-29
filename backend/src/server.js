const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const terapeutasRoutes = require('./routes/terapeutas')
const agendamentosRoutes = require('./routes/agendamentos')

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Rotas
app.use('/api/auth', authRoutes)
app.use('/api/terapeutas', terapeutasRoutes)
app.use('/api/agendamentos', agendamentosRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'MindCare API rodando! 🧠' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})