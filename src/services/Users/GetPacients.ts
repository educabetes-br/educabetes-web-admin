import api from "../api";

export type Pacient = {
  id: number;
  name: string;
};

export const getPacients = async (): Promise<Pacient[]> => {
  try {
    const response = await api.get("/patient");
    return response.data.data;
  } catch (error) {
    console.error("Erro detalhado:", error);
    throw error;
  }
};