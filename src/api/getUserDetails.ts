import axios from 'axios';
import BASE_URL from './config';

export const getUserDetails = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}user/${userId}`);
  return response.data;
};
