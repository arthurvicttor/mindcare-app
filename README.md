# 🧠 MindCare

Plataforma web de saúde mental para agendamento de consultas com terapeutas.

---

## 📋 Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React JS (Vite) |
| Backend | Node.js + Express |
| Banco de dados | PostgreSQL + Prisma |
| Autenticação | JWT |

---

## ⚙️ Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e rodando
- Banco de dados `mindcare` criado

### Criar o banco no pgAdmin 4

```
Servers → PostgreSQL → Databases → botão direito → Create → Database
Nome: mindcare → Save
```

Ou pelo SQL Shell:

```sql
CREATE DATABASE mindcare;
```

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
cd Projeto-de-Bloco-React
```

### 2. Instale as dependências do frontend

```bash
cd frontend
npm install
```

### 3. Instale as dependências do backend

```bash
cd ../backend
npm install
```

### 4. Crie o arquivo `.env` dentro de `backend/`

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/mindcare"
PORT=3000
JWT_SECRET=mindcare_secret_123
```

> ⚠️ Troque `SUA_SENHA` pela senha do seu PostgreSQL local.

### 5. Gere o Prisma Client

```bash
cd backend
npx prisma generate
```

### 6. Rode as migrations

```bash
npx prisma migrate deploy
```

### 7. Crie o admin

**PowerShell:**

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/auth/criar-admin" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"admin@mindcare.com","senha":"123456"}'
```

**Ou pelo console do navegador (com backend rodando):**

```js
fetch('http://localhost:3000/api/auth/criar-admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ "email": "admin@mindcare.com", "senha": "123456" })
}).then(r => r.json()).then(console.log)
```

### 8. Rode o projeto

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

---

## 🌐 Endereços

| O que | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| Admin | http://localhost:5173/admin/login |
| Prisma Studio (opcional) | http://localhost:5555 |

---

## 🔐 Acesso admin

| Campo | Valor |
|---|---|
| Email | admin@mindcare.com |
|  Senha | 123456 |

> ⚠️ Se o banco foi resetado, rode o comando de criar admin novamente.

---

## 📌 Rotas da API

| Método | Rota | Acesso |
|---|---|---|
| POST | `/api/auth/login` | Público |
| POST | `/api/auth/criar-admin` | Público |
| GET | `/api/terapeutas` | Público |
| GET | `/api/terapeutas/:id` | Público |
| GET | `/api/terapeutas/slug/:slug` | Público |
| POST | `/api/terapeutas` | Admin |
| PUT | `/api/terapeutas/:id` | Admin |
| DELETE | `/api/terapeutas/:id` | Admin |
| GET | `/api/agendamentos` | Admin |
| GET | `/api/agendamentos/terapeuta/:id` | Público |
| POST | `/api/agendamentos` | Público |
| DELETE | `/api/agendamentos/:id` | Admin |

---

## 🧪 Rodar os testes

```bash
cd backend
npm test
```

---

## 🗂️ Branches

| Branch | Descrição |
|---|---|
| `main` | Código estável |
| `develop` | Integração entre devs |
| `feat/frontend-crud-terapeutas` | Frontend |
| `feat/backend-setup` | Backend |

---

## ⚠️ Observações importantes

- O arquivo `.env` **não vai pro GitHub** — cada dev cria o seu
- O PostgreSQL roda automaticamente em segundo plano no Windows
- Apenas uma pessoa cria migrations (`npx prisma migrate dev`)
- Os outros devs rodam apenas `npx prisma migrate deploy`
- Sempre rode o backend **antes** do frontend
- Se der erro de token inválido, faça logout e login novamente

---

## 🔄 Atualizar o banco após nova migration

```bash
cd backend
npx prisma migrate deploy
npx prisma generate
npm run dev
```
