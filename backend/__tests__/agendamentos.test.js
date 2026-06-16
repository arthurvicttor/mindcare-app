const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
let token;
let terapeutaId;
let agendamentoId;

beforeAll(async () => {
  await prisma.agendamento.deleteMany();
  await prisma.terapeuta.deleteMany({ where: { crp: "99/888888" } });
  await prisma.admin.deleteMany({ where: { email: "teste@mindcare.com" } });

  await request(app)
    .post("/api/auth/criar-admin")
    .send({ email: "teste@mindcare.com", senha: "123456" });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "teste@mindcare.com", senha: "123456" });

  token = res.body.token;

  const terapeuta = await request(app)
    .post("/api/terapeutas")
    .set("Authorization", `Bearer ${token}`)
    .send({
      nome: "Dr. Agendamento Teste",
      especialidade: "Teste",
      crp: "99/888888",
      descricao: "Teste",
      foto: "",
      avaliacao: 4.0,
      consultas: 0,
      disponivel: true,
      cidade: "São Paulo",
      estado: "SP",
      diasDisponiveis: ["monday"],
      horarios: ["09:00"],
    });

  terapeutaId = terapeuta.body.id;
});

afterAll(async () => {
  await prisma.agendamento.deleteMany();
  await prisma.terapeuta.deleteMany({ where: { crp: "99/888888" } });
  await prisma.admin.deleteMany({ where: { email: "teste@mindcare.com" } });
  await prisma.$disconnect();
});

describe("Agendamentos", () => {
  test("Deve criar agendamento", async () => {
    const res = await request(app).post("/api/agendamentos").send({
      nome: "João Teste",
      celular: "11999999999",
      motivo: "Ansiedade",
      data: "2026-12-01",
      horario: "09:00",
      terapeutaId,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    agendamentoId = res.body.id;
  });

  test("Deve rejeitar agendamento com campos faltando", async () => {
    const res = await request(app)
      .post("/api/agendamentos")
      .send({ nome: "Incompleto" });

    expect(res.status).toBe(400);
  });

  test("Deve rejeitar celular inválido", async () => {
    const res = await request(app).post("/api/agendamentos").send({
      nome: "João Teste",
      celular: "123",
      motivo: "Teste",
      data: "2026-12-01",
      horario: "09:00",
      terapeutaId,
    });

    expect(res.status).toBe(400);
  });

  test("Deve rejeitar horário já ocupado", async () => {
    const res = await request(app).post("/api/agendamentos").send({
      nome: "Maria Teste",
      celular: "11988888888",
      motivo: "Teste",
      data: "2026-12-01",
      horario: "09:00",
      terapeutaId,
    });

    expect(res.status).toBe(409);
  });

  test("Deve buscar agendamentos por terapeuta", async () => {
    const res = await request(app).get(
      `/api/agendamentos/terapeuta/${terapeutaId}`,
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Deve listar agendamentos com token", async () => {
    const res = await request(app)
      .get("/api/agendamentos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  test("Deve cancelar agendamento com token", async () => {
    const res = await request(app)
      .delete(`/api/agendamentos/${agendamentoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
