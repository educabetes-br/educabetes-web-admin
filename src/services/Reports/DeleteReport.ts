import{ api } from "@services";

export type Report = {
  id: number,
  titulo: string,
  linkpdf: string,
  tipo: 'Receita' | 'Laudo',
}

export const deleteReport = async (id: number): Promise<Report> => {
  try {
    const response = await api.delete(`/reports/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
}