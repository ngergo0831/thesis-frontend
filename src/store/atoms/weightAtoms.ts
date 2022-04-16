import { atom } from 'recoil';
import { Measurement } from '../../types/types';

export const measurementsState = atom({
  key: 'measurementsState',
  default: [] as Measurement[]
});
