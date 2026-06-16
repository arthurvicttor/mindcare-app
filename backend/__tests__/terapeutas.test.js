const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
let token;
let terapeutaId;

beforeAll(async () => {
  await prisma.agendamento.deleteMany();
  await prisma.terapeuta.deleteMany({ where: { crp: "99/999999" } });
  await prisma.admin.deleteMany({ where: { email: "teste@mindcare.com" } });

  await request(app)
    .post("/api/auth/criar-admin")
    .send({ email: "teste@mindcare.com", senha: "123456" });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "teste@mindcare.com", senha: "123456" });

  token = res.body.token;
});

afterAll(async () => {
  await prisma.terapeuta.deleteMany({ where: { crp: "99/999999" } });
  await prisma.admin.deleteMany({ where: { email: "teste@mindcare.com" } });
  await prisma.$disconnect();
});

const terapeutaMock = {
  nome: "Dr. Teste Silva",
  especialidade: "Ansiedade",
  crp: "99/999999",
  descricao: "Terapeuta de teste",
  foto: "",
  avaliacao: 4.5,
  consultas: 10,
  disponivel: true,
  cidade: "São Paulo",
  estado: "SP",
  diasDisponiveis: ["monday"],
  horarios: ["09:00"],
};

describe("Terapeutas", () => {
  test("Deve listar terapeutas sem autenticação", async () => {
    const res = await request(app).get("/api/terapeutas");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Deve criar terapeuta com token", async () => {
    const res = await request(app)
      .post("/api/terapeutas")
      .set("Authorization", `Bearer ${token}`)
      .send(terapeutaMock);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.slug).toBe("dr-teste-silva");
    terapeutaId = res.body.id;
  });

  test("Deve rejeitar criação sem token", async () => {
    const res = await request(app).post("/api/terapeutas").send(terapeutaMock);

    expect(res.status).toBe(401);
  });

  test("Deve rejeitar terapeuta sem campos obrigatórios", async () => {
    const res = await request(app)
      .post("/api/terapeutas")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Incompleto" });

    expect(res.status).toBe(400);
  });

  test("Deve buscar terapeuta por slug", async () => {
    const res = await request(app).get("/api/terapeutas/slug/dr-teste-silva");
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Dr. Teste Silva");
  });

  test("Deve editar terapeuta com token", async () => {
    const res = await request(app)
      .put(`/api/terapeutas/${terapeutaId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...terapeutaMock, nome: "Dr. Teste Editado" });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Dr. Teste Editado");
  });

  test("Deve deletar terapeuta com token", async () => {
    const res = await request(app)
      .delete(`/api/terapeutas/${terapeutaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Terapeuta removido com sucesso");
  });
});
