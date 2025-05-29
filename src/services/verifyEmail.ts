import { api } from '@services';

export const verifyEmail = async (email: string) => {
  try {
    const response = await api.get(`/admin/findbyEmail/${email}`);
    if (response.status === 200) {
      return { exists: true, userName: response.data.data.name, error: null };
    }
    return { exists: false, error: 'Email não encontrado' };
  } catch (error) {
    console.error('Error verifying email:', error);
    return { exists: false, error: 'Erro ao verificar email' };
  }
};
