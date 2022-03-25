import { BrowserRouter, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Topnav from '../components/TopNav/TopNav';
import Routes from '../Routes';

import './layout.css';

const Layout = () => {
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
