import axios from 'axios';
import BASE_URL from './config';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  company: string;
  age: string;
  dob: string;
}

export const registerUser = async (data: RegisterData) => {
    const response = await axios.post(
        `${BASE_URL}user-register`,
        data,
        {
        headers: {
            'Content-Type': 'application/json',
        },
        }
    );
    return response.data;
};
