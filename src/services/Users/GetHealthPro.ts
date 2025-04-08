import api from "services/api";

export type HealthPro = {
  id: number;
  name: string;
};

export const getHealthPro = async (): Promise<HealthPro[]> => {
  try {
    const response = await api.get("/healthprofessional");
    return response.data.data;
  } catch (error) {
    console.error("Error getting health professionals:", error);
    throw error;
  }
};