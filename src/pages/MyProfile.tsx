import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentPageState } from '../store/atoms/pageAtoms';

export const MyProfile = () => {
  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('My Profile');
  }, []);

  return <div>MyProfile</div>;
};
