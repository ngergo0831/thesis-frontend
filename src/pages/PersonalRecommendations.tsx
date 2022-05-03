import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Input,
  InputAdornment
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RecommendedDietDetails } from '../components/RecommendedDietDetails/RecommendedDietDetails';
import { Gender } from '../enums/enums';
import { BoxContainer, style } from '../GlobalStyles';
import { currentPageState } from '../store/atoms/pageAtoms';
import { themeState } from '../store/atoms/themeAtoms';

const lifeStyleDifficultyMarks = [
  {
    value: 0,
    label: 'Office job'
  },
  {
    value: 100,
    label: 'Physical job'
  }
];

const exerciseTypeMarks = [
  { value: 0, label: "Don't exercise" },
  {
    value: 100,
    label: 'Endurance sports'
  }
];

export const PersonalRecommendations = () => {
  const setPage = useSetRecoilState(currentPageState);
  const { color } = useRecoilValue(themeState);

  const parsedColor = color.split('-')[2];

  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [calorie, setCalorie] = useState(0);

  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState<Gender>(Gender.Female);

  const [pal1, setPal1] = useState(1.8);
  const [pal2, setPal2] = useState(0.25);

  useEffect(() => {
    setPage('Personal Recommendations');
  }, []);

  useEffect(() => {
    if (age && height && weight) {
      const BMR = 10 * weight + 6.25 * height - 5 * age + (gender === Gender.Female ? -161 : 5);
      const PAL = pal1 + pal2;
      const avarageCalorieNeed = Math.round(BMR * PAL * 1.1);

      const fatNeed = Math.round((avarageCalorieNeed * 0.25) / 7);
      const proteinNeed = Math.round(weight * 1.4);
      const carbsNeed = Math.round((avarageCalorieNeed - fatNeed * 7 - proteinNeed * 4) / 4);

      setCalorie(avarageCalorieNeed);
      setFat(fatNeed);
      setProtein(proteinNeed);
      setCarbs(carbsNeed);
    }
  }, [age, height, weight, pal1, pal2, gender]);

  const handlePal1Change = (_event: Event, number: number) => {
    const ratio = 0.012;
    setPal1(1.2 + number * ratio);
  };

  const handlePal2Change = (_event: Event, number: number) => {
    const ratio = 0.005;
    setPal2(number * ratio);
  };

  const calculateDiet = (calorieMultiplier: number, proteinValue: number) => {
    const _calorie = Math.round((calorie || 0) * calorieMultiplier);
    const _protein = Math.round((weight || 0) * proteinValue);
    const _fat = Math.round((_calorie * 0.25) / 7);
    const _carbs = Math.round((_calorie - _fat * 7 - _protein * 4) / 4);

    return {
      calorie: _calorie,
      protein: _protein,
      fat: _fat,
      carbs: _carbs
    };
  };

  return (
    <div style={style('column')}>
      <div style={style('row')}>
        <BoxContainer>
          <h3>Age</h3>
          <Input
            type="number"
            endAdornment={<InputAdornment position="end">years</InputAdornment>}
            inputProps={{
              min: 14,
              max: 99,
              style: { textAlign: 'center' }
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 2);
              setAge(parseInt(e.target.value, 10));
            }}
          />
        </BoxContainer>
        <BoxContainer>
          <h3>Height</h3>
          <Input
            type="number"
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            inputProps={{
              min: 120,
              max: 270,
              style: { textAlign: 'center' }
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 3);
              setHeight(parseInt(e.target.value, 10));
            }}
          />
        </BoxContainer>
        <BoxContainer>
          <h3>Weight</h3>
          <Input
            type="number"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            inputProps={{
              min: 40,
              max: 300,
              style: { textAlign: 'center' }
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 3);
              setWeight(parseInt(e.target.value, 10));
            }}
          />
        </BoxContainer>
        <BoxContainer>
          <FormControl>
            <FormLabel
              id="demo-controlled-radio-buttons-group"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <h3>Gender</h3>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={gender}
              onChange={(e) => setGender(Gender[e.target.value])}
              row
            >
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </BoxContainer>
      </div>
      <div style={style('row')}>
        <BoxContainer>
          <h3 style={{ marginBottom: '1rem' }}>Work environment</h3>
          <Slider
            defaultValue={50}
            aria-label="pal1-slider"
            style={{ color: parsedColor, width: '80%', marginBottom: '1.5rem' }}
            marks={lifeStyleDifficultyMarks}
            onChange={handlePal1Change}
          />
        </BoxContainer>
        <BoxContainer>
          <h3 style={{ marginBottom: '1rem' }}>Workout intensity</h3>
          <Slider
            defaultValue={50}
            aria-label="pal1-slider"
            style={{ color: parsedColor, width: '80%', marginBottom: '1.5rem' }}
            marks={exerciseTypeMarks}
            onChange={handlePal2Change}
          />
        </BoxContainer>
      </div>
      <div style={style('row')}>
        <RecommendedDietDetails intake={calculateDiet(0.8, 2.4)} title={'Weight loss'} />
        <RecommendedDietDetails
          intake={{ protein, fat, carbs, calorie }}
          title={'Weight maintenance'}
        />
        <RecommendedDietDetails intake={calculateDiet(1.1, 2)} title={'Weight gain'} />
      </div>
    </div>
  );
};
