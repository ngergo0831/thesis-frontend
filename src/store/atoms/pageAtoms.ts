import { atom } from 'recoil';

export const currentPageState = atom<string>({
  key: 'currentPageState',
  default: 'Dashboard'
});
