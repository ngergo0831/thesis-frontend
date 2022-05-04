import { Container } from '@mui/material';
import { WeightChart } from '../components/WeightChart/WeightChart';
import { WeightDisplay } from '../components/WeightDisplay/WeightDisplay';
import { WeightInput } from '../components/WeightInput/WeightInput';
import { WeightHistoryTable } from '../components/WeightHistoryTable/WeightHistoryTable';
import moment from 'moment';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { measurementsState } from '../store/atoms/weightAtoms';
import { WeightTrackerContainer } from '../components/WeightTrackerContainer/WeightTrackerContainerAtoms';
import { useDevice } from '../hooks/useDevice';
import { currentPageState } from '../store/atoms/pageAtoms';
import { currentUserIdState } from '../store/atoms/userAtoms';
import { useEffect } from 'react';

export const WeightTracker = () => {
  const measurements = useRecoilValue(measurementsState);
  const userId = useRecoilValue(currentUserIdState);
  const { isDESKTOP } = useDevice();

  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('Weight Tracker');
  }, []);

  return (
    <Container
      maxWidth={'md'}
      sx={{
        display: 'flex',
        flexDirection: isDESKTOP ? 'row' : 'column',
        justifyContent: 'center'
      }}
    >
      <WeightTrackerContainer>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <WeightDisplay weight={(measurements[0]?.weight as number) ?? 0} />
          <WeightInput userId={userId} />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <WeightChart
            data={measurements.map((measurement) => measurement.weight).slice(0, 7)}
            labels={measurements
              .map((measurement) => moment(measurement.createdAt).format('M/D'))
              .slice(0, 7)}
          />
        </div>
      </WeightTrackerContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <WeightHistoryTable measurements={measurements} />
      </div>
    </Container>
  );
};
