import moment from 'moment';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CalorieIntakeChart } from '../components/CalorieIntakeChart/CalorieIntakeChart';
import { DashboardCommentsContainer } from '../components/DashboardComments/DashboardComments';
import { DashboardStats } from '../components/DashboardStats/DashboardStats';
import { style } from '../GlobalStyles';
import { myIntakesState } from '../store/atoms/intakeAtoms';
import { currentPageState } from '../store/atoms/pageAtoms';
import { currentUserState } from '../store/atoms/userAtoms';
import { measurementsState } from '../store/atoms/weightAtoms';

const Dashboard = () => {
  const setPage = useSetRecoilState(currentPageState);
  const user = useRecoilValue(currentUserState);
  const intakes = useRecoilValue(myIntakesState(user.id));
  const measurements = useRecoilValue(measurementsState);

  useEffect(() => {
    setPage('Dashboard');
  }, []);

  return (
    <>
      <h2 className="page-header">Welcome back, {user.firstName}</h2>
      <div style={style('column')}>
        <div style={style('row')}>
          <CalorieIntakeChart
            title="calorie"
            data={intakes.map((intake) => intake.calorie).slice(0, 7)}
            labels={intakes.map((intake) => moment(intake.createdAt).format('M/D')).slice(0, 7)}
          />
          <CalorieIntakeChart
            title={'weight' as any}
            data={measurements.map((measurement) => measurement.weight).slice(0, 7)}
            labels={measurements
              .map((measurement) => moment(measurement.createdAt).format('M/D'))
              .slice(0, 7)}
          />
        </div>
        <div style={style('row')}>
          <DashboardStats />
          <DashboardCommentsContainer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
