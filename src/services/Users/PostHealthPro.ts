import api from "../api";

export type HealthProInput = {
    name: string,
    email: string,
    birthDate: string,
}

export type HealthProThing = HealthProInput & {
    id: number,
}

export const postHealthPro = async (healthPro: HealthProInput): Promise<HealthProThing> => {
    try {
        const response = await api.post("/healthprofessional", healthPro);
        return response.data.data;
    } catch (error) {
        console.error("Error posting health professional:", error);
        throw error;
    }
}