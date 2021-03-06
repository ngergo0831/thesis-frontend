import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DietTable } from '../components/DietTable/DietTable';
import { myDietsState } from '../store/atoms/dietAtoms';
import { currentPageState } from '../store/atoms/pageAtoms';
import { currentUserIdState } from '../store/atoms/userAtoms';

export const MyDiets = () => {
  const userId = useRecoilValue(currentUserIdState);
  const myDiets = useRecoilValue(myDietsState(userId));

  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('My Diets');
  }, []);

  return <DietTable diets={myDiets} />;
};
