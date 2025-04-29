import api from "../api";

export type DiagnosisTime = "LESS_THAN_6MONTHS" | "BETWEEN_6MONTHS_AND_1YEAR" | "BETWEEN_1YEAR_AND_2YEARS" | "MORE_THAN_2YEARS";
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


export type PatientInput = {
  name: string,
  email: string,
  birthDate: string,
  diagnosisTime : DiagnosisTime,
  userState: userState,
  userCity: string,
}

export const postPatient = async (patient: PatientInput): Promise<PatientInput> => {
  try {
    const response = await api.post("/patient", patient);
    return response.data.data;
  } catch (error) {
    console.error("Error posting patient:", error);
    throw error;
  }
}