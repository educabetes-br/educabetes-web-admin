import api from "../api";

export type Links = {
  ketoacidosisLink?: string;
  insulinLink?: string;
};

export const updateLinks = async (links: Links): Promise<void> => {
    try {
      const response = await api.patch("/links", links);
      return response.data.data;
    } catch (error) {
      console.error("Erro ao atualizar os links:", error);
      throw error;
    }
  };