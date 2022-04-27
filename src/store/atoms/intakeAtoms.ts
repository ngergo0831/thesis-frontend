import { atom, selectorFamily } from 'recoil';
import { Intake } from '../../types/types';

export const intakesState = atom<Intake[]>({
  key: 'intakesState',
  default: []
});

export const myIntakesState = selectorFamily<Intake[], string>({
  key: 'myIntakesState',
  get:
    (userId: string) =>
    ({ get }) => {
      const intakes = get(intakesState);
      return intakes.filter((intake) => intake.userId === userId);
    }
});
