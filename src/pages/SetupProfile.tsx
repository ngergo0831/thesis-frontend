import { useSetRecoilState } from 'recoil';
import { currentPageState } from '../store/atoms/pageAtoms';

const SetupProfile = () => {
  const setPage = useSetRecoilState(currentPageState);

  setPage('Setup Profile');
  return <div>SetupProfile</div>;
};

export default SetupProfile;
