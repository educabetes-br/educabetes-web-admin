import api from "../api";

export type Report = {
  id: number,
  titulo: string,
  linkpdf: string,
  tipo: 'Receita' | 'Laudo',
}

export const updateReport = async (id: number, data: { titulo: string; linkpdf: string; tipo: "Receita" | "Laudo" }): Promise<Report> => {
  try {
    const response = await api.patch(`/reports/${id}`, data); // Envia os dados atualizados
    return response.data.data;
  } catch (error) {
    console.error("Error updating report:", error);
    throw error;
  }
};
