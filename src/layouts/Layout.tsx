import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getDiets, getIntakes, getMeasurementsByUserId, getUsers } from '../api/api';
import { Sidebar } from '../components/Sidebar/Sidebar';
import Topnav from '../components/TopNav/TopNav';
import Routes from '../Routes';
import { dietsState } from '../store/atoms/dietAtoms';
import { intakesState } from '../store/atoms/intakeAtoms';
import { currentUserIdState, usersState } from '../store/atoms/userAtoms';
import { measurementsState } from '../store/atoms/weightAtoms';

import './layout.css';

const Layout = () => {
  const userId = useRecoilValue(currentUserIdState);
  const setDiets = useSetRecoilState(dietsState);
  const setUsers = useSetRecoilState(usersState);
  const setIntakes = useSetRecoilState(intakesState);
  const setMeasurements = useSetRecoilState(measurementsState);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    getDiets().then(setDiets);
    getUsers().then(setUsers);
    getIntakes().then(setIntakes);
    getMeasurementsByUserId(userId).then(setMeasurements);
    setIsDataFetched(true);

    return () => {
      setIsDataFetched(false);
    };
  }, []);

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={'layout'}>
            <Sidebar {...props} />
            <div className="layout__content">
              <Topnav />
              <div className="layout__content-main">{isDataFetched && <Routes />}</div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
