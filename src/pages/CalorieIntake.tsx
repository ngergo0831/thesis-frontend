import { useRecoilValue } from 'recoil';
import { CalorieIntakeChart } from '../components/CalorieIntakeChart/CalorieIntakeChart';
import { CalorieIntakeForm } from '../components/CalorieIntakeForm/CalorieIntakeForm';
import { CalorieIntakeHistoryTable } from '../components/CalorieIntakeHistoryTable/CalorieIntakeHistoryTable';
import { currentUserIdState } from '../store/atoms/dietAtoms';
import { myIntakesState } from '../store/atoms/intakeAtoms';

const CalorieIntake = () => {
  const currentUserId = useRecoilValue(currentUserIdState);
  const intakes = useRecoilValue(myIntakesState(currentUserId));

  const style = (direction: 'column' | 'row') => ({
    display: 'flex',
    flexDirection: direction,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    width: '100%',
    height: '100%'
  });

  return (
    <>
      <h2 className="page-header" style={{ marginBottom: '1rem' }}>
        Calorie intake
      </h2>
      <div style={style('column')}>
        <div style={style('row')}>
          <div style={(style('column'), { width: '33.3%' })}>
            <CalorieIntakeForm />
            <CalorieIntakeChart label="kcal" />
          </div>
          <div style={(style('column'), { width: '66.6%' })}>
            <CalorieIntakeHistoryTable intakes={intakes} />
          </div>
        </div>
        <div style={style('row')}>
          <CalorieIntakeChart label="fat" />
          <CalorieIntakeChart label="ch" />
          <CalorieIntakeChart label="protein" />
        </div>
      </div>
    </>
  );
};

export default CalorieIntake;
