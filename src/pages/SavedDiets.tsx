import { useRecoilValue } from 'recoil';
import { DietTable } from '../components/DietTable/DietTable';
import { currentUserIdState, savedDietsState } from '../store/atoms/dietAtoms';

const SavedDiets = () => {
  const userId = useRecoilValue(currentUserIdState);
  const savedDiets = useRecoilValue(savedDietsState(userId));

  return (
    <>
      <h2 className="page-header">Saved diets</h2>
      <DietTable diets={savedDiets} />
    </>
  );
};

export default SavedDiets;
