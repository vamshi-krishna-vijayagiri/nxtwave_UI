import axios from 'axios';
import BASE_URL from './config';

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await axios.post(
    `${BASE_URL}user-login`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
