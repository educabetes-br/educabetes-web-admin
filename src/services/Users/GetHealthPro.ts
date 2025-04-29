import api from "services/api";

export type userState =
  | "ACRE"
  | "ALAGOAS"
  | "AMAPA"
  | "AMAZONAS"
  | "BAHIA"
  | "CEARA"
  | "DISTRITO_FEDERAL"
  | "ESPIRITO_SANTO"
  | "GOIAS"
  | "MARANHAO"
  | "MATO_GROSSO"
  | "MATO_GROSSO_DO_SUL"
  | "MINAS_GERAIS"
  | "PARA"
  | "PARAIBA"
  | "PARANA"
  | "PERNAMBUCO"
  | "PIAUI"
  | "RIO_DE_JANEIRO"
  | "RIO_GRANDE_DO_NORTE"
  | "RIO_GRANDE_DO_SUL"
  | "RONDONIA"
  | "RORAIMA"
  | "SANTA_CATARINA"
  | "SAO_PAULO"
  | "SERGIPE"
  | "TOCANTINS";

export type HealthPro = {
  id: number;
  name: string;
  userState: userState;
  userCity: string;
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