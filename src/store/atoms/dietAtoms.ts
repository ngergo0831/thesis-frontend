import { atom } from 'recoil';
import { Diet } from '../../types/types';

export const myDietsState = atom({
  key: 'myDietsState',
  default: [] as Diet[]
});
