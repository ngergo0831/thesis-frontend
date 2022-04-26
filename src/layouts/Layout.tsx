import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { getDietsByUserId, getUserById } from '../api/api';
import { Sidebar } from '../components/Sidebar/Sidebar';
import Topnav from '../components/TopNav/TopNav';
import Routes from '../Routes';
import { currentUserState, myDietsState } from '../store/atoms/dietAtoms';

import './layout.css';

const Layout = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setMyDiets = useSetRecoilState(myDietsState);
  const userId = '8ecaeef8-5cec-479f-83c7-0b3a884df8c0';

  useEffect(() => {
    getUserById(userId).then(setCurrentUser);
    getDietsByUserId(userId).then(setMyDiets);
  }, []);

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={'layout'}>
            <Sidebar {...props} />
            <div className="layout__content">
              <Topnav />
              <div className="layout__content-main">
                <Routes />
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
