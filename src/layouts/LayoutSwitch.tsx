import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getUser } from '../api/api';
import { currentUserState, isUserLoggedInState } from '../store/atoms/userAtoms';
import Layout from './Layout';
import { LoginRouter } from './LoginRouter';

export const LayoutSwitch = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isUserLoggedInState);
  const setUser = useSetRecoilState(currentUserState);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    getUser()
      .then((user) => {
        setIsUserLoggedIn(true);
        setUser(user);
        setIsDataFetched(true);
      })
      .catch(() => {
        setIsUserLoggedIn(false);
        setUser(null);
        setIsDataFetched(true);
      });

    return () => {
      setIsDataFetched(false);
    };
  }, [isUserLoggedIn]);

  return isDataFetched ? isUserLoggedIn ? <Layout /> : <LoginRouter /> : <div>Loading...</div>;
};
