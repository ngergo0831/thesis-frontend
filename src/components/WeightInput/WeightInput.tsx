import { Button, FormControl, Input, InputAdornment, Stack } from '@mui/material';
import { BoxContainer } from '../../GlobalStyles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as S from './WeightInputAtoms';
import { ChangeEvent, useRef, useState } from 'react';
import { addMeasurement } from '../../api/api';

export const WeightInput = ({ userId }: { userId: string }) => {
  const [weight, setWeight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = (event) => {
    event.preventDefault();
    addMeasurement(userId, weight);
  };

  return (
    <BoxContainer>
      <S.WeightInputText>Add measurement</S.WeightInputText>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
        <Stack direction="row" spacing={3}>
          <Input
            type="number"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              min: 40,
              max: 250,
              style: { textAlign: 'center' }
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = e.target.value.slice(0, 3))
            }
            fullWidth
            ref={inputRef}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <Button
            variant="text"
            color="primary"
            endIcon={<AddCircleOutlineIcon />}
            sx={{
              padding: '0.5rem 2rem'
            }}
            onClick={handleSend}
          >
            Add
          </Button>
        </Stack>
      </FormControl>
    </BoxContainer>
  );
};
