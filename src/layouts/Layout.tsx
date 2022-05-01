import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getDiets, getIntakes, getMeasurementsByUserId, getUsers } from '../api/api';
import { Sidebar } from '../components/Sidebar/Sidebar';
import Topnav from '../components/TopNav/TopNav';
import Routes from '../Routes';
import { dietsState } from '../store/atoms/dietAtoms';
import { intakesState } from '../store/atoms/intakeAtoms';
import { ThemeColor, ThemeMode, themeState } from '../store/atoms/themeAtoms';
import { currentUserIdState, usersState } from '../store/atoms/userAtoms';
import { measurementsState } from '../store/atoms/weightAtoms';

import './layout.css';

const Layout = () => {
  const userId = useRecoilValue(currentUserIdState);
  const setDiets = useSetRecoilState(dietsState);
  const setUsers = useSetRecoilState(usersState);
  const setIntakes = useSetRecoilState(intakesState);
  const setMeasurements = useSetRecoilState(measurementsState);
  const { mode, color } = useRecoilValue(themeState);
  const setThemeState = useSetRecoilState(themeState);

  const [isDataFetched, setIsDataFetched] = useState(false);

  const themeClass = localStorage.getItem('themeMode') as ThemeMode;
  const colorClass = localStorage.getItem('colorMode') as ThemeColor;

  useEffect(() => {
    getDiets().then(setDiets);
    getUsers().then(setUsers);
    getIntakes().then(setIntakes);
    getMeasurementsByUserId(userId).then(setMeasurements);

    if (themeClass) {
      setThemeState((prev) => ({
        ...prev,
        mode: themeClass
      }));
    }

    if (colorClass) {
      setThemeState((prev) => ({
        ...prev,
        color: colorClass
      }));
    }

    setIsDataFetched(true);

    return () => {
      setIsDataFetched(false);
    };
  }, []);

  const theme = createTheme({
    palette: {
      mode: mode.split('-')[2] as any
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route
          render={(props) => (
            <div className={`layout ${mode} ${color}`}>
              <Sidebar {...props} />
              <div className="layout__content">
                <Topnav />
                <div className="layout__content-main">{isDataFetched && <Routes />}</div>
              </div>
            </div>
          )}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Layout;
