import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentPageState } from '../store/atoms/pageAtoms';

export const PersonalRecommendations = () => {
  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('Personal Recommendations');
  }, []);

  return <div>Personal</div>;
};
