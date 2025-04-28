import api from "../api";

export type Admin = {
  id: number;
  name: string;
};

export const getAdmins = async (): Promise<Admin[]> => {
    try {
        const response = await api.get("/admin");
        return response.data.data;
    } catch (error) {
        console.error("Error getting admins:", error);
        throw error;
    }
}