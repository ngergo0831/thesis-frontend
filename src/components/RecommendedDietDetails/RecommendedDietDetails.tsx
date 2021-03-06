import { Button } from '@mui/material';
import { BoxContainer } from '../../GlobalStyles';
import { Intake } from '../../types/types';
import { Fastfood, EggAlt, Restaurant, BakeryDining } from '@mui/icons-material';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { intakesState } from '../../store/atoms/intakeAtoms';
import { dietsState } from '../../store/atoms/dietAtoms';
import { currentUserIdState } from '../../store/atoms/userAtoms';
import { createDiet, createIntake } from '../../api/api';
import { Period } from '../../enums/enums';

interface RecommendedDietDetailsProps {
  intake: Partial<Intake>;
  title: string;
}

const flex = () => ({
  display: 'flex',
  alignItems: 'center'
});

export const RecommendedDietDetails = ({ intake, title }: RecommendedDietDetailsProps) => {
  const { calorie, protein, fat, carbs } = intake;
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const userId = useRecoilValue(currentUserIdState);
  const setIntakes = useSetRecoilState(intakesState);
  const setDiets = useSetRecoilState(dietsState);

  const handleSave = async () => {
    const createdIntake = await createIntake(userId, { calorie, fat, carbs, protein });
    setIntakes((intakes) => [createdIntake, ...intakes]);
    const createdDiet = await createDiet(userId, createdIntake.id, Period.Daily);
    setIntakes((_intakes) =>
      _intakes.map((int) => (int.id === createdIntake.id ? { ...int, diet: true } : int))
    );
    setDiets((diets) => [...diets, createdDiet]);
    setAlreadyAdded(true);
  };

  return (
    <BoxContainer>
      <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
      <div
        style={{
          fontSize: '1.1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '80%'
        }}
      >
        <div style={flex()}>
          <Restaurant fontSize="medium" style={{ marginRight: '0.5rem' }} />
          <div>Calories:</div>
          <div style={{ marginLeft: 'auto' }}>{calorie + ' kcal'}</div>
        </div>
        <div style={flex()}>
          <Fastfood fontSize="medium" style={{ marginRight: '0.5rem' }} />
          <div>Fat:</div>
          <div style={{ marginLeft: 'auto' }}>{fat + ' g'}</div>
        </div>
        <div style={flex()}>
          <BakeryDining fontSize="medium" style={{ marginRight: '0.5rem' }} />
          <div>Carbs:</div>
          <div style={{ marginLeft: 'auto' }}>{carbs + ' g'}</div>
        </div>
        <div style={flex()}>
          <EggAlt fontSize="medium" style={{ marginRight: '0.5rem' }} />
          <div> Protein:</div>
          <div style={{ marginLeft: 'auto' }}>{protein + ' g'}</div>
        </div>
      </div>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: '1rem' }}
        disabled={alreadyAdded}
        onClick={handleSave}
      >
        Add to my diets
      </Button>
    </BoxContainer>
  );
};
