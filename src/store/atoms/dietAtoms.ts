import { atom, selector, selectorFamily } from 'recoil';
import { getUserById } from '../../api/api';
import { Diet, User } from '../../types/types';

export const dietsState = atom<Diet[]>({
  key: 'dietsState',
  default: []
});

export const myDietsState = selectorFamily({
  key: 'myDietsState',
  get:
    (userId: string) =>
    ({ get }): Diet[] => {
      const diets = get(dietsState);
      return diets.filter(({ creatorId }) => creatorId === userId);
    }
});

export const savedDietsState = selectorFamily({
  key: 'savedDietsState',
  get:
    (userId: string) =>
    ({ get }): Diet[] => {
      const diets = get(dietsState);
      return diets.filter(({ savedBy }) => savedBy.some(({ id }) => id === userId));
    }
});

export const othersDietsState = selectorFamily({
  key: 'othersDietsState',
  get:
    (userId: string) =>
    ({ get }): Diet[] => {
      const diets = get(dietsState);
      return diets.filter(({ creatorId }) => creatorId !== userId);
    }
});

export const currentDietState = selectorFamily({
  key: 'currentDietState',
  get:
    (id) =>
    ({ get }): Diet => {
      const diets = get(dietsState);
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
