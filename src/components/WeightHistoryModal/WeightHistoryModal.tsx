import { Modal, Box, Typography, Input, InputAdornment, Button } from '@mui/material';
import moment from 'moment';
import { ChangeEvent } from 'react';
import { Measurement } from '../../types/types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #e0e0e0',
  borderRadius: '20px',
  boxShadow:
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  p: 4
};

interface WeightHistoryModalProps {
  selectedMeasurement: Measurement;
  open: boolean;
  onClose: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  setWeight: (weight: number) => void;
}

export const WeightHistoryModal = ({
  open,
  onClose,
  selectedMeasurement,
  handleCancel,
  handleSave,
  setWeight
}: WeightHistoryModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Modify measurement for {moment(selectedMeasurement.createdAt).format('YYYY-MM-DD HH:mm')}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Previous measurement: {selectedMeasurement.weight} kg
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
          component={'span'}
        >
          New measurement:{' '}
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
            onChange={(e) => setWeight(Number(e.target.value))}
            sx={{ ml: 2, mr: 4 }}
            defaultValue={selectedMeasurement.weight}
          />
        </Typography>
        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddCircleOutlineIcon />}
            onClick={handleSave}
            style={{ marginLeft: 'auto' }}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
