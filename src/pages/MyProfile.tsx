import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentPageState } from '../store/atoms/pageAtoms';

const MyProfile = () => {
  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('My Profile');
  }, []);

  return <div>MyProfile</div>;
};

export default MyProfile;
