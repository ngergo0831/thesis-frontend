import { BoxContainer } from '../../GlobalStyles';
import * as S from './WeightDisplayAtoms';

interface WeightDisplayProps {
  weight: number;
}

export const WeightDisplay = ({ weight }: WeightDisplayProps) => {
  return (
    <BoxContainer>
      <S.Weight>{weight} kg</S.Weight>
      <S.WeightText>Current&nbsp;weight</S.WeightText>
    </BoxContainer>
  );
};
