import { atom } from 'recoil';
import { User } from '../../types/types';

export const usersState = atom<User[]>({
  key: 'usersState',
  default: []
});
