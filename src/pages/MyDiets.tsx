import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { DietTable } from '../components/DietTable/DietTable';

const MyDiets = () => {
  return (
    <>
      <h2 className="page-header">My diets</h2>
      <Suspense fallback={<CircularProgress />}>
        <DietTable />
      </Suspense>
    </>
  );
};

export default MyDiets;
