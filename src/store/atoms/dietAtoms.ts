import { atom, selector, selectorFamily } from 'recoil';
import { getUserById } from '../../api/api';
import { Diet, User } from '../../types/types';

export const myDietsState = atom({
  key: 'myDietsState',
  default: [] as Diet[]
});

export const savedDietsState = atom({
  key: 'savedDietsState',
  default: [] as Diet[]
});

export const othersDietsState = atom({
  key: 'othersDietsState',
  default: [] as Diet[]
});

export const currentDietState = selectorFamily({
  key: 'currentDietState',
  get:
    (id) =>
    async ({ get }): Promise<Diet> => {
      const diets = get(myDietsState);
      return diets.find((diet) => diet.id === id);
    }
});

export const currentDietUserQuery = selectorFamily({
  key: 'currentDietUserQuery',
  get: (id: string) => async (): Promise<User> => {
    if (!id) {
      return null;
    }
    return getUserById(id);
  }
});

export const currentUserState = atom({
  key: 'currentUserState',
  default: {} as User
});

export const currentUserIdState = selector({
  key: 'currentUserIdState',
  get: ({ get }) => {
    return get(currentUserState).id;
  }
});
