import api from "../api";

export type AdminInput = {
    name: string,
    email: string,
    password: string,
}

export const postAdmin = async (admin: AdminInput): Promise<AdminInput> => {
    try {
        const response = await api.post("/admin", admin);
        return response.data.data;
    } catch (error) {
        console.error("Error posting admin:", error);
        throw error;
    }
}