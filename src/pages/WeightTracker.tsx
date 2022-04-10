import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { getMeasurementsByUserId } from '../api/api';
import { WeightDisplay } from '../components/WeightDisplay/WeightDisplay';

export const WeightTracker = () => {
  const [measurements, setMeasurements] = useState([]);

  const userId = '717996ac-3a0b-4611-a7e7-303656c15819';

  useEffect(() => {
    getMeasurementsByUserId(userId).then(setMeasurements);
  }, []);

  return (
    <Container maxWidth={'md'}>
      <WeightDisplay weight={(measurements[0]?.weight as number) ?? 0} />
    </Container>
  );
};