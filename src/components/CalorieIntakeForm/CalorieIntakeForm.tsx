import { Button, Input, InputAdornment } from '@mui/material';
import { ChangeEvent } from 'react';
import { BoxContainer } from '../../GlobalStyles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const CalorieIntakeForm = () => {
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
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = e.target.value.slice(0, 5))
            }
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
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = e.target.value.slice(0, 3))
            }
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
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = e.target.value.slice(0, 3))
            }
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
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = e.target.value.slice(0, 3))
            }
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
        >
          Add
        </Button>
      </div>
    </BoxContainer>
  );
};
