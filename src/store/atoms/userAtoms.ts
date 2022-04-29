import { atom, selector } from 'recoil';
import { User } from '../../types/types';

export const usersState = atom<User[]>({
  key: 'usersState',
  default: []
});

export const currentUserState = atom<User>({
  key: 'currentUserState',
  default: {} as User
});

export const currentUserIdState = selector<string>({
  key: 'currentUserIdState',
  get: ({ get }) => {
    return get(currentUserState).id;
  }
});

export const currentUserName = selector<string>({
  key: 'currentUserName',
  get: ({ get }) => {
    return get(currentUserState).firstName + ' ' + get(currentUserState).lastName;
  }
});

export const currentUserEmail = selector<string>({
  key: 'currentUserEmail',
  get: ({ get }) => {
    return get(currentUserState).email;
  }
});
