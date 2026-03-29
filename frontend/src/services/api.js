const BASE_URL = "http://localhost:3000/api";

export async function getTerapeutas() {
  const response = await fetch(`${BASE_URL}/terapeutas`);
  return response.json();
}

export async function getTerapeutaById(id) {
  const response = await fetch(`${BASE_URL}/terapeutas/${id}`);
  return response.json();
}

export async function createTerapeuta(dados) {
  const response = await fetch(`${BASE_URL}/terapeutas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return response.json();
}

export async function updateTerapeuta(id, dados) {
  const response = await fetch(`${BASE_URL}/terapeutas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return response.json();
}

export async function deleteTerapeuta(id) {
  await fetch(`${BASE_URL}/terapeutas/${id}`, {
    method: "DELETE",
  });
}
