import { Button, Input, InputAdornment } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { BoxContainer } from '../../GlobalStyles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createIntake } from '../../api/api';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { intakesState, myIntakesState } from '../../store/atoms/intakeAtoms';
import { currentUserIdState } from '../../store/atoms/userAtoms';

export const CalorieIntakeForm = () => {
  const [calorie, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);

  const userId = useRecoilValue(currentUserIdState);
  const setIntakes = useSetRecoilState(intakesState);

  const handleCreateIntake = (event) => {
    event.preventDefault();
    createIntake(userId, { calorie, fat, carbs, protein }).then((createdIntake) => {
      setIntakes((intakes) => [createdIntake, ...intakes]);
    });
  };
  return (
    <BoxContainer style={{ alignItems: 'flex-start' }}>
      <h3>Add new intake</h3>
      <div style={{ display: 'flex', marginTop: '1rem', fontSize: '0.8rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem'
          }}
        >
          <Input
            type="number"
            endAdornment={<InputAdornment position="end">kcal</InputAdornment>}
            inputProps={{
              min: 0,
              max: 10000,
              style: { textAlign: 'center' }
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 5);
              setCalories(parseInt(e.target.value, 10));
            }}
          />
          <div>Calories</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem'
          }}
        >
          <Input
            type="number"
            endAdornment={<InputAdornment position="end">g</InputAdornment>}
            inputProps={{
              min: 0,
              max: 999,
              style: { textAlign: 'center' }
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 3);
              setFat(parseInt(e.target.value, 10));
            }}
          />
          <div>Fat</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem'
          }}
        >
          <Input
            type="number"
            endAdornment={<InputAdornment position="end">g</InputAdornment>}
            inputProps={{
              min: 0,
              max: 999,
              style: { textAlign: 'center' }
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 3);
              setCarbs(parseInt(e.target.value, 10));
            }}
          />
          <div>Carbs</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem'
          }}
        >
          <Input
            type="number"
            endAdornment={<InputAdornment position="end">g</InputAdornment>}
            inputProps={{
              min: 0,
              max: 999,
              style: { textAlign: 'center' }
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 3);
              setProtein(parseInt(e.target.value, 10));
            }}
          />
          <div>Protein</div>
        </div>
        <Button
          variant="text"
          color="primary"
          endIcon={<AddCircleOutlineIcon />}
          sx={{
            padding: '0.5rem'
          }}
          onClick={handleCreateIntake}
          disabled={
            !calorie ||
            !fat ||
            !carbs ||
            !protein ||
            calorie === 0 ||
            fat === 0 ||
            carbs === 0 ||
            protein === 0
          }
        >
          Add
        </Button>
      </div>
    </BoxContainer>
  );
};
