import { BoxContainer } from '../../GlobalStyles';

interface CalorieIntakeChartProps {
  label: 'kcal' | 'fat' | 'ch' | 'protein';
}

export const CalorieIntakeChart = ({ label }: CalorieIntakeChartProps) => {
  return (
    <BoxContainer>
      <h2>Calorie chart {label}</h2>
    </BoxContainer>
  );
};
