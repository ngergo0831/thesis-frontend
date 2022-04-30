import moment from 'moment';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CalorieIntakeChart } from '../components/CalorieIntakeChart/CalorieIntakeChart';
import { DashboardCommentsContainer } from '../components/DashboardComments/DashboardComments';
import { DashboardStats } from '../components/DashboardStats/DashboardStats';
import { DashboardUserInfo } from '../components/DashboardUserInfo/DashboardUserInfo';
import { style } from '../GlobalStyles';
import { myIntakesState } from '../store/atoms/intakeAtoms';
import { currentPageState } from '../store/atoms/pageAtoms';
import { currentUserState } from '../store/atoms/userAtoms';
import { measurementsState } from '../store/atoms/weightAtoms';

export const Dashboard = () => {
  const setPage = useSetRecoilState(currentPageState);
  const user = useRecoilValue(currentUserState);
  const intakes = useRecoilValue(myIntakesState(user.id));
  const measurements = useRecoilValue(measurementsState);

  useEffect(() => {
    setPage('Dashboard');
  }, []);

  return (
    <>
      <h2 className="page-header" style={{ textTransform: 'none' }}>
        Welcome back, {user.firstName}
      </h2>
      <div style={style('column')}>
        <div style={style('row')}>
          <CalorieIntakeChart
            title={'calorie (RI 2000 kcal)' as any}
            data={intakes.map((intake) => intake.calorie).slice(0, 7)}
            labels={intakes.map((intake) => moment(intake.createdAt).format('M/D')).slice(0, 7)}
            dottedData={Array(intakes.length % 7).fill(2000)}
          />
          <CalorieIntakeChart
            title="weight"
            data={measurements.map((measurement) => measurement.weight).slice(0, 7)}
            labels={measurements
              .map((measurement) => moment(measurement.createdAt).format('M/D'))
              .slice(0, 7)}
          />
        </div>
        <div style={style('row')}>
          <div
            style={
              (style('column'),
              {
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between'
              })
            }
          >
            <DashboardUserInfo />
            <DashboardStats />
          </div>
          <DashboardCommentsContainer />
        </div>
      </div>
    </>
  );
};
