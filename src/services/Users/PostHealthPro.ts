import{ api } from "@services";

export type HealthProInput = {
    name: string,
    email: string,
    birthDate: string,
}

export const postHealthPro = async (healthPro: HealthProInput): Promise<HealthProInput> => {
    try {
        const response = await api.post("/healthprofessional", healthPro);
        return response.data.data;
    } catch (error) {
        console.error("Error posting health professional:", error);
        throw error;
    }
}