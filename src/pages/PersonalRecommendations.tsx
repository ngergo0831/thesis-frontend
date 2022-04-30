import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentPageState } from '../store/atoms/pageAtoms';

const PersonalRecommendations = () => {
  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('Personal Recommendations');
  }, []);

  return <div>Personal</div>;
};

export default PersonalRecommendations;
