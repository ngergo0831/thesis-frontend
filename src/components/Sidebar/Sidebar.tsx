import { Link } from 'react-router-dom';
import sidebar_items from '../../assets/JsonData/sidebar_routes.json';
import logo from '../../assets/images/logo.png';

import './sidebar.css';
import { useRecoilValue } from 'recoil';
import { ThemeMode, themeState } from '../../store/atoms/themeAtoms';

const SidebarItem = (props) => {
  const active = props.active ? 'active' : '';

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

export const Sidebar = (props) => {
  const activeItem = sidebar_items.findIndex((item) => item.route === props.location?.pathname);
  const { mode } = useRecoilValue(themeState);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img
          src={logo}
          alt="company logo"
          style={{ filter: `invert(${mode === ThemeMode.Dark ? 1 : 0})` }}
        />
      </div>
      <div
        className={`sidebar__items ${mode === ThemeMode.Dark ? 'sidebar-dark' : 'sidebar-light'}`}
      >
        {sidebar_items.map((item, index) => (
          <Link to={item.route} key={index}>
            <SidebarItem title={item.display_name} icon={item.icon} active={index === activeItem} />
          </Link>
        ))}
      </div>
    </div>
  );
};
