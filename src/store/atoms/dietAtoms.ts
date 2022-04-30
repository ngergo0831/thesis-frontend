import { atom, selectorFamily } from 'recoil';
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

export const countDietsSavedByOthers = selectorFamily({
  key: 'countDietsSavedByOthers',
  get:
    (userId: string) =>
    ({ get }): number => {
      const diets = get(dietsState);
      return diets.filter(
        ({ savedBy, creatorId }) => creatorId === userId && savedBy.some(({ id }) => id !== userId)
      ).length;
    }
});

export const countDietsLikedByOthers = selectorFamily({
  key: 'countDietsLikedByOthers',
  get:
    (userId: string) =>
    ({ get }): number => {
      const diets = get(dietsState);
      return diets.filter(
        ({ creatorId, likedBy }) => creatorId === userId && likedBy.some(({ id }) => id !== userId)
      ).length;
    }
});

export const countMyLikes = selectorFamily({
  key: 'countMyLikes',
  get:
    (userId: string) =>
    ({ get }): number => {
      const diets = get(dietsState);
      return diets.filter(
        ({ creatorId, likedBy }) => creatorId !== userId && likedBy.some(({ id }) => id === userId)
      ).length;
    }
});
