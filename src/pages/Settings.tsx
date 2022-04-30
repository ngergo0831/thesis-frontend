import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentPageState } from '../store/atoms/pageAtoms';

export const Settings = () => {
  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('Settings');
  }, []);

  return <div>Settings</div>;
};
