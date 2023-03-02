import React, { useState, useEffect } from 'react';
import './bottomnav.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';

import selectMenuForUser from '../../functions/SelectMenuForUser';
import { GetUserProfile } from '../../functions/GetData';

import { useConfirm } from '../../contexts/ConfirmContext';

interface profile {
  username: string,
  role: string
}

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['access-token']);
  const { confirm, setConfirm } = useConfirm();

  const [activeHamburger, setActiveHamburger] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<string>(location.pathname);

  const [userProfile, setUserProfile] = useState<profile>({
    username: '',
    role: ''
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
    navigate(path);
    setActiveHamburger(false);
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

  return (
    <div className="bottomnav">
      <div className="bottomnav-hamburger">
        <div
          className=""
          role="button"
          tabIndex={0}
          onClick={() => { setActiveHamburger(!activeHamburger); }}
          onKeyDown={() => {}}
        >
          {
            activeHamburger
              ? <CloseIcon className="bottomnav-hamburger-icon" sx={{ fontSize: '2em' }} />
              : <MenuIcon className="bottomnav-hamburger-icon" sx={{ fontSize: '2em' }} />
          }
        </div>
      </div>
      <div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => { logoutAccount(); }}
          onKeyDown={() => {}}
        >
          <LogoutIcon className="bottomnav-hamburger-icon-logout" sx={{ fontSize: '2em' }} />
        </div>
      </div>
      <div className={`bottomnav-menu ${activeHamburger ? 'active' : ''}`}>
        {
          selectMenuForUser(userProfile.role).map((data) => (
            <Link
              className={`bottomnav-menu-item ${isActive === data.path ? 'active' : ''}`}
              to={data.path}
              onClick={() => { handleClick(data.path); }}
              key={data.name}
            >
              <data.icon className="bottomnav-item-icon" sx={{ fontSize: '200%' }} />
              <div className="bottomnav-item-name">{data.name}</div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default BottomNav;
