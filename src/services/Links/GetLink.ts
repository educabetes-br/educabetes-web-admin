import api from "../api";

export type Links = {
  ketoacidosisLink: string;
  insulinLink: string;
};

export const getLinks = async (): Promise<Links> => {
  try {
    const response = await api.get("/links");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os links:", error);
    throw error;
  }
};