import { BoxContainer } from '../../GlobalStyles';
import { Weight, WeightText } from './WeightDisplayAtoms';

interface WeightDisplayProps {
  weight: number;
}

export const WeightDisplay = ({ weight }: WeightDisplayProps) => {
  return (
    <BoxContainer>
      <Weight>{weight} kg</Weight>
      <WeightText>Current weight</WeightText>
    </BoxContainer>
  );
};
