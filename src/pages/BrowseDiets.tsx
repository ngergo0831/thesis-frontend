import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DietTable } from '../components/DietTable/DietTable';
import { othersDietsState } from '../store/atoms/dietAtoms';
import { currentPageState } from '../store/atoms/pageAtoms';
import { currentUserIdState } from '../store/atoms/userAtoms';

export const BrowseDiets = () => {
  const userId = useRecoilValue(currentUserIdState);
  const othersDiets = useRecoilValue(othersDietsState(userId));
  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('Browse Diets');
  }, []);

  return <DietTable diets={othersDiets} />;
};
