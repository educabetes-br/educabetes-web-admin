import { api } from '@services';

export const updatePassword = async (email: string, password: string) => {
  try {
    const response = await api.patch(`/admin/updatePassword/${email}`, {
      newPassword: password
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
