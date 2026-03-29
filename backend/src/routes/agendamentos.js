const express = require('express')
const { PrismaClient } = require('@prisma/client')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
const prisma = new PrismaClient()

//Validação simples de celular (mínimo 10 dígitos)
function celularValido(celular){
    return /^\d{10,11}$/.test(celular.replace(/\D/g, ''))
}

//Validação de nome (só letras e espaços, mínimo 3 caracteres)
function nomeValido(nome){
    return /^[a-zA-ZÀ-ÿ\s]{3,}$/.test(nome.trim())
}

// GET — protegido (admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      include: { terapeuta: true },
      orderBy: { criadoEm: 'desc' }
    })
    res.json(agendamentos)
  } catch {
    res.status(500).json({ message: 'Erro ao buscar agendamentos' })
  }
})

// GET — público
// Retorna agendamentos de um terapeuta específico (para bloquear horários)
router.get('/terapeuta/:id', async (req, res) => {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      where: { terapeutaId: Number(req.params.id) },
      select: {
        data: true,
        horario: true
      }
    })
    res.json(agendamentos)
  } catch {
    res.status(500).json({ message: 'Erro ao buscar agendamentos' })
  }
})


// POST — público (paciente agenda)
router.post('/', async (req, res) => {
  const { nome, celular, motivo, data, horario, terapeutaId } = req.body

  // Validações
  if (!nome || !celular || !motivo || !data || !horario || !terapeutaId) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }

  if (!nomeValido(nome)) {
    return res.status(400).json({ message: 'Nome inválido — use apenas letras' })
  }

  if (!celularValido(celular)) {
    return res.status(400).json({ message: 'Celular inválido — use DDD + número' })
  }

  try {
    // Verifica se o horário já está ocupado
    const horarioOcupado = await prisma.agendamento.findFirst({
      where: {
        terapeutaId: Number(terapeutaId),
        data,
        horario
      }
    })

    if (horarioOcupado) {
      return res.status(409).json({ message: 'Este horário já está ocupado' })
    }

    const agendamento = await prisma.agendamento.create({
      data: {
        nome,
        celular,
        motivo,
        data,
        horario,
        terapeutaId: Number(terapeutaId)
      }
    })

    res.status(201).json(agendamento)
  } catch {
    res.status(500).json({ message: 'Erro ao criar agendamento' })
  }
})

// DELETE — protegido (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.agendamento.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: 'Agendamento cancelado' })
  } catch {
    res.status(500).json({ message: 'Erro ao cancelar agendamento' })
  }
})

module.exports = router