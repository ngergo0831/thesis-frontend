import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BoxContainer } from '../../GlobalStyles';
import { getDietById, getUserByIdQuery } from '../../store/atoms/dietAtoms';
import { Intake } from '../../types/types';
import { DoughnutChart } from '../DoughnutChart/DoughnutChart';

export const DietDetails = () => {
  const { dietId } = useParams<{ dietId: string }>();
  const diet = useRecoilValue(getDietById(dietId));
  const user = useRecoilValue(getUserByIdQuery(diet.creatorId));
  const userName = user.email.substring(0, user.email.lastIndexOf('@'));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2
          className="page-header"
          style={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
        >
          <div>{`${userName}'s Diet`}</div>
          <div style={{ fontSize: '1rem', marginLeft: '1rem' }}>{`(${diet.likedBy.length ?? 0} ${
            (diet.likedBy.length ?? 0) > 1 ? 'likes' : 'like'
          })`}</div>
        </h2>
        <h2>Save</h2>
      </div>
      <div
        className="page-header"
        style={{ marginTop: '-30px', fontSize: '0.8rem', textTransform: 'none' }}
      >
        Created at {moment(diet.createdAt).format('Do MMM YYYY, HH:mm')}
      </div>
      <div style={{ display: 'flex' }}>
        <BoxContainer style={{ maxWidth: '30%' }}>
          <h3>Intake</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h5 style={{ margin: '2rem 1rem' }}>Total: {diet.intake.calorie} kcal</h5>
            <DoughnutChart data={diet.intake as Intake} />
          </div>
        </BoxContainer>
        <BoxContainer style={{ justifyContent: 'center' }}>Comments</BoxContainer>
      </div>
    </>
  );
};

export const DietDetailsPage = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <DietDetails />
    </Suspense>
  );
};
