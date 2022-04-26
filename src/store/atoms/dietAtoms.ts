import { atom, selector, selectorFamily } from 'recoil';
import { getDiets, getUserById } from '../../api/api';

export const dietsState = atom({
  key: 'dietState',
  default: []
});

export const getDietsQuery = selector({
  key: 'getDietsQuery',
  get: async () => {
    return getDiets();
  }
});

export const getDietsByUserId = selectorFamily({
  key: 'getDietsByUserId',
  get:
    (userId: string) =>
    ({ get }) => {
      const diets = get(getDietsQuery);
      return diets.filter((diet) => diet.creatorId === userId);
    }
});

export const getDietById = selectorFamily({
  key: 'getDietById',
  get:
    (id: string) =>
    ({ get }) => {
      const diets = get(getDietsQuery);
      return diets.find((diet) => diet.id === id);
    }
});

export const getUserByIdQuery = selectorFamily({
  key: 'getUserByIdQuery',
  get: (id: string) => async () => {
    return getUserById(id);
  }
});
