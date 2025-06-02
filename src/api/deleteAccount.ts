import axios from 'axios';
import BASE_URL from './config';

interface DeleteAccountData {
  id: string;
}

export const deleteAccount = async (data: DeleteAccountData) => {
  const response = await axios.delete(`${BASE_URL}user-delete`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return response.data;
};

