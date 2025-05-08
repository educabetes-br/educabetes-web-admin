import api from "../api";

export type Links = {
  ketoacidosisLink?: string;
  insulinLink?: string;
};

export const updateLinks = async (links: Links): Promise<void> => {
    try {
      await api.put("/links", links);
    } catch (error) {
      console.error("Erro ao atualizar os links:", error);
      throw error;
    }
  };