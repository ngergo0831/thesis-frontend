import axios from 'axios';
import { Measurement } from '../types/types';

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

export const modifyMeasurement = async (measurement: Measurement) => {
  const { data } = await api.patch(`/measurements/${measurement.id}`, { ...measurement });
  return data;
};

export const getDietsByUserId = async (userId: string): Promise<any> => {
  const { data } = await api.get(`/diets/user/${userId}`);
  console.log(data);
  return data;
};
