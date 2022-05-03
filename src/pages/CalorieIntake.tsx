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

  const dateQuery = (days: number) => moment().clone().subtract(days, 'days').startOf('day');

  const sortedIntakes = intakes.reduce((acc, x) => {
    if (
      acc.find(
        (y) => moment(y.createdAt).format('YYYY/MM/D') === moment(x.createdAt).format('YYYY/MM/D')
      )
    )
      return acc.concat([]);
    const calories = intakes
      .filter(
        (y) => moment(y.createdAt).format('YYYY/MM/D') === moment(x.createdAt).format('YYYY/MM/D')
      )
      .map((y) => y.calorie)
      .reduce((a, b) => a + b, 0);
    return acc.concat([
      {
        createdAt: moment(x.createdAt).format('YYYY/MM/D'),
        calories
      }
    ]);
  }, []);

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
      <div style={style('row')}>
        <CalorieIntakeChart
          title={'Calorie intakes since yesterday' as any}
          data={intakes
            .filter((intake) => moment(intake.createdAt).isAfter(dateQuery(1)))
            .map((intake) => intake.calorie)
            .slice(0, 10)}
          labels={intakes
            .filter((intake) => moment(intake.createdAt).isAfter(dateQuery(1)))
            .map((intake) => moment(intake.createdAt).format('M/D'))
            .slice(0, 10)}
        />
        <CalorieIntakeChart
          title={'Calorie intakes in the last 7 days' as any}
          data={sortedIntakes
            .filter((intake) => moment(intake.createdAt).isAfter(dateQuery(7)))
            .map((intake) => intake.calories)}
          labels={sortedIntakes
            .filter((intake) => moment(intake.createdAt).isAfter(dateQuery(7)))
            .map((intake) => moment(intake.createdAt).format('M/D'))}
        />
        <CalorieIntakeChart
          title={'Calorie intakes in the last 30 days' as any}
          data={sortedIntakes
            .filter((intake) => moment(intake.createdAt).isAfter(dateQuery(30)))
            .map((intake) => intake.calories)}
          labels={sortedIntakes
            .filter((intake) => moment(intake.createdAt).isAfter(dateQuery(30)))
            .map((intake) => moment(intake.createdAt).format('M/D'))}
        />
      </div>
    </div>
  );
};
