import api from "../api";

export type Report = {
  id: number,
  titulo: string,
  linkpdf: string,
  tipo: 'Receita' | 'Laudo',
}

export const getReports = async (): Promise<Report[]> => {
  try {
    const response = await api.get("/reports");
    return response.data.data;
  } catch (error) {
    console.error("Error getting reports:", error);
    throw error;
  }
}