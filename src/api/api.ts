import axios from 'axios';
import { Period } from '../enums/enums';
import { Diet, Intake, Measurement, User } from '../types/types';

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

export const getDietsByUserId = async (userId: string): Promise<Diet[]> => {
  const { data } = await api.get(`/diets/user/${userId}`);
  return data;
};

export const getDietById = async (dietId: string): Promise<Diet> => {
  const { data } = await api.get(`/diets/${dietId}`);
  return data;
};

export const getDiets = async (): Promise<Diet[]> => {
  const { data } = await api.get('/diets');
  return data;
};

export const getUserById = async (userId: string): Promise<User> => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};

export const createComment = async (userId: string, dietId: string, comment: string) => {
  const { data } = await api.post('/comments', { userId, comment, dietId });
  return data;
};

export const likeDiet = async (userId: string, dietId: string) => {
  await api.post(`/diets/${dietId}/like`, { userId });
};

export const saveDiet = async (userId: string, dietId: string) => {
  await api.post(`/diets/${dietId}/save`, { userId });
};

export const getSavedDietsByUserId = async (userId: string): Promise<Diet[]> => {
  const { data } = await api.get(`/users/${userId}/saved-diets`);
  return data;
};

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/users');
  return data;
};

export const getIntakes = async (): Promise<Intake[]> => {
  const { data } = await api.get('/intakes');
  return data;
};

export const createDiet = async (creatorId: string, intakeId: string, period: Period) => {
  await api.post(`/intakes/${intakeId}/create-diet`, { creatorId, period });
};

export const createIntake = async (userId: string, intake: Partial<Intake>) => {
  const { data } = await api.post('/intakes', { userId, ...intake });
  return data;
};
