import api from "../api";

export type Report = {
  titulo: string,
  linkpdf: string,
  tipo: 'Receita' | 'Laudo',
}

export const addReport = async (report: Report): Promise<Report> => {
  try {
    const response = await api.post("/reports", report);
    return response.data.data;
  } catch (error) {
    console.error("Error adding report:", error);
    throw error;
  }
}