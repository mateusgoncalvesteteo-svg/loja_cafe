const API_URL = "http://localhost:3000";

export async function getCafes() {
  try {
    const response = await fetch(`${API_URL}/cafes`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar cafés:", error);
    return [];
  }
}