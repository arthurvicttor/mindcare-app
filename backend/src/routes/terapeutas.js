const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const prisma = new PrismaClient();

function gerarSlug(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function validarTerapeuta(dados) {
  const { nome, especialidade, crp, descricao, cidade, estado } = dados;

  if (!nome || !especialidade || !crp || !descricao || !cidade || !estado) {
    return "Todos os campos são obrigatórios";
  }

  if (nome.trim().length < 3) {
    return "Nome deve ter pelo menos 3 caracteres";
  }

  if (!/^\d{2}\/\d{4,6}$/.test(crp)) {
    return "CRP inválido — formato esperado: 06/123456";
  }

  return null;
}

// GET - público
router.get("/", async (req, res) => {
  try {
    const terapeutas = await prisma.terapeuta.findMany();
    res.json(terapeutas);
  } catch {
    res.status(500).json({ message: "Erro ao buscar terapeutas" });
  }
});

// GET /api/terapeutas/slug - público
router.get("/slug/:slug", async (req, res) => {
  try {
    const terapeuta = await prisma.terapeuta.findUnique({
      where: { slug: req.params.slug },
    });

    if (!terapeuta) {
      return res.status(404).json({ message: "Terapeuta não encontrado" });
    }

    res.json(terapeuta);
  } catch {
    res.status(500).json({ message: "Erro ao buscar terapeuta" });
  }
});

// GET - público
router.get("/:id", async (req, res) => {
  try {
    const terapeuta = await prisma.terapeuta.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!terapeuta) {
      return res.status(404).json({ message: "Terapeuta não encontrado" });
    }

    res.json(terapeuta);
  } catch {
    res.status(500).json({ message: "Erro ao buscar terapeuta" });
  }
});

// POST — protegido (admin)
router.post("/", authMiddleware, async (req, res) => {
  const erro = validarTerapeuta(req.body);
  if (erro) return res.status(400).json({ message: erro });

  try {
    const slug = gerarSlug(req.body.nome);
    const terapeuta = await prisma.terapeuta.create({
      data: { ...req.body, slug },
    });
    res.status(201).json(terapeuta);
  } catch {
    res.status(500).json({ message: "Erro ao criar terapeuta" });
  }
});

// PUT — protegido (admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const erro = validarTerapeuta(req.body);
  if (erro) return res.status(400).json({ message: erro });

  try {
    const slug = gerarSlug(req.body.nome);
    const terapeuta = await prisma.terapeuta.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body, slug },
    });
    res.json(terapeuta);
  } catch {
    res.status(500).json({ message: "Erro ao atualizar terapeuta" });
  }
});

// DELETE — protegido (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)

    // Deleta os agendamentos do terapeuta primeiro
    await prisma.agendamento.deleteMany({
      where: { terapeutaId: id }
    })

    // Depois deleta o terapeuta
    await prisma.terapeuta.delete({
      where: { id }
    })

    res.json({ message: 'Terapeuta removido com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover terapeuta' })
  }
})

module.exports = router;
