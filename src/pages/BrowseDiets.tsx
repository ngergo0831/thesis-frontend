import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DietTable } from '../components/DietTable/DietTable';
import { othersDietsState } from '../store/atoms/dietAtoms';
import { currentPageState } from '../store/atoms/pageAtoms';
import { currentUserIdState } from '../store/atoms/userAtoms';

const BrowseDiets = () => {
  const userId = useRecoilValue(currentUserIdState);
  const othersDiets = useRecoilValue(othersDietsState(userId));
  const setPage = useSetRecoilState(currentPageState);

  setPage('Browse Diets');

  return <DietTable diets={othersDiets} />;
};

export default BrowseDiets;
