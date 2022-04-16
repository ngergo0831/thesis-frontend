import { Container } from '@mui/material';
import { useEffect } from 'react';
import { getMeasurementsByUserId } from '../api/api';
import { WeightChart } from '../components/WeightChart/WeightChart';
import { WeightDisplay } from '../components/WeightDisplay/WeightDisplay';
import { WeightInput } from '../components/WeightInput/WeightInput';
import { WeightHistoryTable } from '../components/WeightHistoryTable/WeightHistoryTable';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { measurementsState } from '../store/atoms/weightAtoms';

export const WeightTracker = () => {
  const [measurements, setMeasurements] = useRecoilState(measurementsState);

  const userId = '717996ac-3a0b-4611-a7e7-303656c15819';

  useEffect(() => {
    getMeasurementsByUserId(userId).then(setMeasurements);
  }, []);

  return (
    <Container maxWidth={'md'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          width: 'fit-content',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <WeightDisplay weight={(measurements[0]?.weight as number) ?? 0} />
          <WeightInput userId={userId} />
        </div>
        {measurements.length && (
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <WeightChart
              data={measurements.map((measurement) => measurement.weight).slice(0, 7)}
              labels={measurements
                .map((measurement) => moment(measurement.createdAt).format('M/D'))
                .slice(0, 7)}
            />
          </div>
        )}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <WeightHistoryTable measurements={measurements} />
        </div>
      </div>
    </Container>
  );
};
