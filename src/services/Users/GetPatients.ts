import api from "../api";

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

export type Patient = {
  id: number;
  name: string;
  userState: userState;
  userCity: string;
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