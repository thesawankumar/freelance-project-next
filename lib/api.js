const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDepartments = async (token) => {
  const response = await api.get('/departments', {
   
  });
  return response.data;
};