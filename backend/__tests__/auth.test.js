const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.admin.deleteMany({ where: { email: "teste@mindcare.com" } });
});

afterAll(async () => {
  await prisma.admin.deleteMany({ where: { email: "teste@mindcare.com" } });
  await prisma.$disconnect();
});

describe("Auth", () => {
  test("Deve criar um admin", async () => {
    const res = await request(app)
      .post("/api/auth/criar-admin")
      .send({ email: "teste@mindcare.com", senha: "123456" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("Deve fazer login com credenciais corretas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "teste@mindcare.com", senha: "123456" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Deve rejeitar login com senha errada", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "teste@mindcare.com", senha: "senhaerrada" });

    expect(res.status).toBe(401);
  });
});
