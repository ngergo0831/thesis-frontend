import { useRecoilValue } from 'recoil';
import { DietTable } from '../components/DietTable/DietTable';
import { currentUserIdState, othersDietsState } from '../store/atoms/dietAtoms';

const BrowseDiets = () => {
  const userId = useRecoilValue(currentUserIdState);
  const othersDiets = useRecoilValue(othersDietsState(userId));

  return (
    <>
      <h2 className="page-header">Browse all diets</h2>
      <DietTable diets={othersDiets} />
    </>
  );
};

export default BrowseDiets;
