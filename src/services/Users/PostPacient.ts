import api from "../api";

type DiagnosisTime = "LESS_THAN_6MONTHS" | "BETWEEN_6MONTHS_AND_1YEAR" | "BETWEEN_1YEAR_AND_2YEARS" | "MORE_THAN_2YEARS";

export type PacientInput = {
  name: string,
  email: string,
  birthDate: string,
  diagnosisTime : DiagnosisTime,
}

export type PacientThing = PacientInput & {
  id: number,
}

export const postPacient = async (patient: PacientInput): Promise<PacientThing> => {
  try {
    const response = await api.post("/patient", patient);
    return response.data.data;
  } catch (error) {
    console.error("Error posting pacient:", error);
    throw error;
  }
}