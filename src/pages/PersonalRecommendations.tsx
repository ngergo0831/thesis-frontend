import { useSetRecoilState } from 'recoil';
import { currentPageState } from '../store/atoms/pageAtoms';

const PersonalRecommendations = () => {
  const setPage = useSetRecoilState(currentPageState);

  setPage('Personal Recommendations');
  return <div>Personal</div>;
};

export default PersonalRecommendations;
