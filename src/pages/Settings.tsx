import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentPageState } from '../store/atoms/pageAtoms';

const Settings = () => {
  const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPage('Settings');
  }, []);

  return <div>Settings</div>;
};

export default Settings;
