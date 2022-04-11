import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getMeasurementsByUserId = async (userId: string): Promise<any> => {
  const { data } = await api.get(`/measurements/user/${userId}`);
  return data;
};

export const addMeasurement = async (userId: string, weight: number) => {
  const { data } = await api.post('/measurements', { userId, weight });
  return data;
};
