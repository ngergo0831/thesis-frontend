import { useSetRecoilState } from 'recoil';
import { currentPageState } from '../store/atoms/pageAtoms';

const MyProfile = () => {
  const setPage = useSetRecoilState(currentPageState);

  setPage('My Profile');
  return <div>MyProfile</div>;
};

export default MyProfile;
