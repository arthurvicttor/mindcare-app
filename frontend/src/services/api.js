const BASE_URL = "http://localhost:3000/api";
const IBGE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";

// Auth
export async function loginAdmin(email, senha) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  return response.json();
}

export async function getTerapeutas() {
  const response = await fetch(`${BASE_URL}/terapeutas`);
  return response.json();
}

export async function getTerapeutaById(id) {
  const response = await fetch(`${BASE_URL}/terapeutas/${id}`);
  return response.json();
}

export async function getTerapeutaBySlug(slug) {
  const response = await fetch(`${BASE_URL}/terapeutas/slug/${slug}`);
  return response.json();
}

export async function createTerapeuta(dados, token) {
  const response = await fetch(`${BASE_URL}/terapeutas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  return response.json();
}

export async function updateTerapeuta(id, dados, token) {
  const response = await fetch(`${BASE_URL}/terapeutas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  return response.json();
}

export async function deleteTerapeuta(id, token) {
  await fetch(`${BASE_URL}/terapeutas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// IBGE
export async function getEstados() {
  const response = await fetch(`${IBGE_URL}/estados?orderBy=nome`);
  return response.json();
}

export async function getCidadesPorEstado(uf) {
  const response = await fetch(
    `${IBGE_URL}/estados/${uf}/municipios?orderBy=nome`,
  );
  return response.json();
}

// Agendamentos
export async function getAgendamentosPorTerapeuta(terapeutaId) {
  const response = await fetch(
    `${BASE_URL}/agendamentos/terapeuta/${terapeutaId}`,
  );
  return response.json();
}

export async function createAgendamento(dados) {
  const response = await fetch(`${BASE_URL}/agendamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return response.json();
}
