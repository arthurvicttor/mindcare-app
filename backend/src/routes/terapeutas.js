const express = require('express')
const { PrismaClient } = require('@prisma/client')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
const prisma = new PrismaClient()

// Validação dos campos do terapeuta
function validarTerapeuta(dados) {
  const { nome, especialidade, crp, descricao } = dados

  if (!nome || !especialidade || !crp || !descricao) {
    return 'Nome, especialidade, CRP e descrição são obrigatórios'
  }

  if (nome.trim().length < 3) {
    return 'Nome deve ter pelo menos 3 caracteres'
  }

  if (!/^\d{2}\/\d{4,6}$/.test(crp)) {
    return 'CRP inválido — formato esperado: 06/123456'
  }

  return null
}

// GET — público
router.get('/', async (req, res) => {
  try {
    const terapeutas = await prisma.terapeuta.findMany()
    res.json(terapeutas)
  } catch {
    res.status(500).json({ message: 'Erro ao buscar terapeutas' })
  }
})

// GET — público
router.get('/:id', async (req, res) => {
  try {
    const terapeuta = await prisma.terapeuta.findUnique({
      where: { id: Number(req.params.id) }
    })

    if (!terapeuta) {
      return res.status(404).json({ message: 'Terapeuta não encontrado' })
    }

    res.json(terapeuta)
  } catch {
    res.status(500).json({ message: 'Erro ao buscar terapeuta' })
  }
})

// POST — protegido (admin)
router.post('/', authMiddleware, async (req, res) => {
  const erro = validarTerapeuta(req.body)
  if (erro) return res.status(400).json({ message: erro })

  try {
    const terapeuta = await prisma.terapeuta.create({ data: req.body })
    res.status(201).json(terapeuta)
  } catch {
    res.status(500).json({ message: 'Erro ao criar terapeuta' })
  }
})

// PUT — protegido (admin)
router.put('/:id', authMiddleware, async (req, res) => {
  const erro = validarTerapeuta(req.body)
  if (erro) return res.status(400).json({ message: erro })

  try {
    const terapeuta = await prisma.terapeuta.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })
    res.json(terapeuta)
  } catch {
    res.status(500).json({ message: 'Erro ao atualizar terapeuta' })
  }
})

// DELETE — protegido (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.terapeuta.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: 'Terapeuta removido com sucesso' })
  } catch {
    res.status(500).json({ message: 'Erro ao remover terapeuta' })
  }
})

module.exports = router