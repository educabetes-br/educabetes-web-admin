import api from "../api";

export type Patient = {
  id: number;
  name: string;
};

export const getPatients = async (): Promise<Patient[]> => {
  try {
    const response = await api.get("/patient");
    return response.data.data;
  } catch (error) {
    console.error("Erro detalhado:", error);
    throw error;
  }
};