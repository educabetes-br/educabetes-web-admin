import api from "../api";

type DiagnosisTime = "LESS_THAN_6MONTHS" | "BETWEEN_6MONTHS_AND_1YEAR" | "BETWEEN_1YEAR_AND_2YEARS" | "MORE_THAN_2YEARS";

export type PatientInput = {
  name: string,
  email: string,
  birthDate: string,
  diagnosisTime : DiagnosisTime,
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