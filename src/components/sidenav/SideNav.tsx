import React, { useState, useEffect } from 'react';
import './sidenav.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import selectMenuForUser from '../../functions/SelectMenuForUser';

function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['access-token']);

  const [isWide, setIsWide] = useState<boolean>(window.innerWidth > 1024);
  const [isActive, setIsActive] = useState<string>(location.pathname);

  const userType = 'admin';

  function handleClick(path: string) {
    setIsActive(path);
  } 

  function expandSidenavClick(wide: boolean) {
    setIsWide(wide);
    localStorage.setItem('sidenavWidth', wide ? 'expand' : 'short');
  }

  function logoutAccount() {
    removeCookie('access-token');
    navigate('/signin');
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsWide(window.innerWidth > 1024);
    });
    localStorage.setItem('sidenavWidth', isWide ? 'expand' : 'short');
  }, [isWide]);

  return (
    <div className={`sidenav ${isWide ? '' : 'short'}`}>
      <div
        className={`sidenav-hamburg ${isWide ? '' : 'short'}`}
        onClick={() => { expandSidenavClick(!isWide); }}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        {
          isWide ? <MenuOpenIcon sx={{ fontSize: 40 }} /> : <MenuIcon sx={{ fontSize: 40 }} />
        }
      </div>
      <div className={`sidenav-header ${isWide ? '' : 'short'}`}>
        <div>g.i.m.s.</div>
      </div>
      <div className="sidenav-menu">
        {
          selectMenuForUser(userType).map((data) => (
            <Link
              className={`sidenav-menu-item ${isActive === data.path ? 'active' : ''}`}
              to={data.path}
              onClick={() => { handleClick(data.path); }}
              key={data.name}
            >
              <data.icon className="icon" />
              <div className="name">{data.name}</div>
              <div className="tooltip">{data.name}</div>
            </Link>
          ))
        }
      </div>
      <div className="sidenav-account">
        <div className="account-box">
          <AccountCircleIcon className="account-icon" />
          <div className="account-name">Nik Kunraho Struyf</div>
        </div>
        <div
          className="account-logout"
          onClick={() => { logoutAccount(); }}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <LogoutIcon className="logout-icon" />
          <div className="tooltip">logout</div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
