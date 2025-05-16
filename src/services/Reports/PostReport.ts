import{ api } from "@services";

export type ReportInput = {
  titulo: string;
  linkpdf: string;
  tipo: 'Receita' | 'Laudo';
};

export type Report = ReportInput & {
  id: number;
};

export const addReport = async (report: ReportInput): Promise<Report> => {
  try {
    const response = await api.post("/reports", report);
    return response.data.data;
  } catch (error) {
    console.error("Error adding report:", error);
    throw error;
  }
};