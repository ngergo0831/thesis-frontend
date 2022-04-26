import { useRecoilValue } from 'recoil';
import { DietTable } from '../components/DietTable/DietTable';
import { myDietsState, currentUserIdState } from '../store/atoms/dietAtoms';

const MyDiets = () => {
  const userId = useRecoilValue(currentUserIdState);
  const myDiets = useRecoilValue(myDietsState(userId));

  return (
    <>
      <h2 className="page-header">My diets</h2>
      <DietTable diets={myDiets} />
    </>
  );
};

export default MyDiets;
