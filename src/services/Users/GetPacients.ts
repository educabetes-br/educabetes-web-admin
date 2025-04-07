import api from "services/api";

export type Pacient = {
  id: number;
  name: string;
};

export const getPacients = async (): Promise<Pacient[]> => {
  try {
    const response = await api.get("/pacient");
    return response.data.data;
  } catch (error) {
    console.error("Error getting pacients:", error);
    throw error;
  }
};