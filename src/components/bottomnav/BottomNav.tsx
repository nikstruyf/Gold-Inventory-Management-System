import React, { useState, useEffect } from 'react';
import './bottomnav.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import selectMenuForUser from '../../functions/SelectMenuForUser';
import { GetUserProfile } from '../../functions/GetData';

interface profile {
  username: string,
  role: string
}

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(['access-token']);

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
  }

  return (
    <div className="bottomnav">
      <div className="bottomnav-menu">
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
