import React, { useState, useEffect } from 'react';
import './sidenav.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import MenuIcon from '@mui/icons-material/Menu';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import selectMenuForUser from '../../functions/SelectMenuForUser';
import { GetUserProfile } from '../../functions/GetData';

import { useSideNavWidth } from '../../contexts/SideNavWidthContext';
import { useConfirm } from '../../contexts/ConfirmContext';

interface profile {
  username: string,
  role: string
}

function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['access-token']);
  const { sideNavWidth, setSideNavWidth } = useSideNavWidth();
  const { confirm, setConfirm } = useConfirm();

  const [isWide, setIsWide] = useState<boolean>(sideNavWidth === 'expand');
  const [isActive, setIsActive] = useState<string>(location.pathname);

  const [userProfile, setUserProfile] = useState<profile>({
    username: 'username',
    role: 'admin'
  });

  useEffect(() => {
    GetUserProfile(cookies['access-token']).then((res) => {
      setUserProfile({
        username: res.username,
        role: res.role
      });
    });
  }, []);

  function handleClick(path: string) {
    setIsActive(path);
  }

  function expandSidenavClick(wide: boolean) {
    setIsWide(wide);
    setSideNavWidth(wide ? 'expand' : 'short');
  }

  async function logoutAccount() {
    setConfirm({
      active: true,
      message: 'continue sign out ?',
      action: 'logout',
      status: ''
    });
  }

  useEffect(() => {
    if (confirm.status === 'confirm' && confirm.action === 'logout') {
      removeCookie('access-token');
      navigate('/signin');
      setConfirm({
        active: false,
        message: '',
        action: '',
        status: ''
      });
    }
  }, [confirm.status]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsWide(window.innerWidth > 1024);
    });
    setSideNavWidth(isWide ? 'expand' : 'short');
  }, [isWide]);

  return (
    <div className={`sidenav ${isWide ? '' : 'short'}`}>
      {/* -- Expand&Short button -- */}
      <div
        className={`sidenav-hamburg ${isWide ? '' : 'short'}`}
        onClick={() => { expandSidenavClick(!isWide); }}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        {
          isWide
            ? <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 40 }} />
            : <MenuIcon sx={{ fontSize: 40 }} />
        }
      </div>
      {/* -- Header -- */}
      <div className={`sidenav-header ${isWide ? '' : 'short'}`}>
        <div>g.i.m.s.</div>
      </div>
      {/* -- Menu content -- */}
      <div className="sidenav-menu">
        {
          selectMenuForUser(userProfile.role).map((data) => (
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
      {/* -- Account content -- */}
      <div className="sidenav-account">
        <div className="account-box">
          <AccountCircleIcon className="account-icon" />
          <div className="account-name">{userProfile.username}</div>
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
