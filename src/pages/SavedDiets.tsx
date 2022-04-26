import { useRecoilValue } from 'recoil';
import { DietTable } from '../components/DietTable/DietTable';
import { currentUserIdState, savedDietsState } from '../store/atoms/dietAtoms';
import { usersState } from '../store/atoms/userAtoms';
import { Diet } from '../types/types';

const SavedDiets = () => {
  const userId = useRecoilValue(currentUserIdState);
  const savedDiets = useRecoilValue(savedDietsState(userId));
  const users = useRecoilValue(usersState);

  const creatorIds = [...Array.from(new Set(savedDiets.map((diet) => diet.creatorId)))];

  const creatorIdToUserName = creatorIds.reduce((acc, creatorId) => {
    const user = users.find(({ id }) => id === creatorId);
    const userName = user?.email.substring(0, user?.email.lastIndexOf('@'));
    acc[creatorId] = userName;
    return acc;
  }, {});

  const creatorIdToUserNameMap = new Map<string, string>(Object.entries(creatorIdToUserName));

  const sortedSavedDietsMap = new Map<[string, string], Diet[]>(
    Array.from(creatorIdToUserNameMap).map((entry) => {
      const diets = savedDiets.filter(({ creatorId }) => creatorId === entry[0]);
      return [entry, diets];
    })
  );

  const generateDietTable = () => {
    return Array.from(sortedSavedDietsMap).map((entry) => {
      const [creatorId, userName] = entry[0];
      const diets = entry[1];
      return (
        <div style={{ marginBottom: '1rem' }} key={creatorId + Math.random()}>
          <DietTable
            key={creatorId + Math.random()}
            diets={diets}
            toolbarText={creatorId === userId ? 'My saved diets' : `${userName}'s diets`}
          />
        </div>
      );
    });
  };

  return (
    <>
      <h2 className="page-header">Saved diets</h2>
      {generateDietTable()}
    </>
  );
};

export default SavedDiets;
