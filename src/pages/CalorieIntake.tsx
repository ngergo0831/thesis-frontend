import moment from 'moment';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CalorieIntakeChart } from '../components/CalorieIntakeChart/CalorieIntakeChart';
import { CalorieIntakeForm } from '../components/CalorieIntakeForm/CalorieIntakeForm';
import { CalorieIntakeHistoryTable } from '../components/CalorieIntakeHistoryTable/CalorieIntakeHistoryTable';
import { currentUserIdState } from '../store/atoms/userAtoms';
import { myIntakesState } from '../store/atoms/intakeAtoms';
import { currentPageState } from '../store/atoms/pageAtoms';
import { style } from '../GlobalStyles';
import { useEffect } from 'react';

export const CalorieIntake = () => {
  const currentUserId = useRecoilValue(currentUserIdState);
  const intakes = useRecoilValue(myIntakesState(currentUserId));

  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('Calorie Intake');
  }, []);

  return (
    <div style={style('column')}>
      <div style={style('row')}>
        <div style={(style('column'), { width: '33.3%' })}>
          <CalorieIntakeForm />
          <CalorieIntakeChart
            title="calorie"
            data={intakes.map((intake) => intake.calorie).slice(0, 7)}
            labels={intakes.map((intake) => moment(intake.createdAt).format('M/D')).slice(0, 7)}
          />
        </div>
        <div style={(style('column'), { width: '66.6%' })}>
          <CalorieIntakeHistoryTable intakes={intakes} />
        </div>
      </div>
      <div style={style('row')}>
        <CalorieIntakeChart
          title="fat"
          data={intakes.map((intake) => intake.fat).slice(0, 7)}
          labels={intakes.map((intake) => moment(intake.createdAt).format('M/D')).slice(0, 7)}
        />
        <CalorieIntakeChart
          title="carbohydrate"
          data={intakes.map((intake) => intake.carbs).slice(0, 7)}
          labels={intakes.map((intake) => moment(intake.createdAt).format('M/D')).slice(0, 7)}
        />
        <CalorieIntakeChart
          title="protein"
          data={intakes.map((intake) => intake.protein).slice(0, 7)}
          labels={intakes.map((intake) => moment(intake.createdAt).format('M/D')).slice(0, 7)}
        />
      </div>
    </div>
  );
};
