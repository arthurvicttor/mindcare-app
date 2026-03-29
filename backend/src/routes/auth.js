const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body

  try {
    const admin = await prisma.admin.findUnique({ where: { email } })

    if (!admin) {
      return res.status(401).json({ message: 'Email ou senha inválidos' })
    }

    const senhaCorreta = await bcrypt.compare(senha, admin.senha)

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Email ou senha inválidos' })
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    res.json({ token, role: admin.role })

  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

router.post('/criar-admin', async (req, res) => {
  const { email, senha } = req.body

  try {
    const senhaHash = await bcrypt.hash(senha, 10)

    const admin = await prisma.admin.create({
      data: { email, senha: senhaHash }
    })

    res.status(201).json({ message: 'Admin criado!', id: admin.id })

  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar admin' })
  }
})

module.exports = router