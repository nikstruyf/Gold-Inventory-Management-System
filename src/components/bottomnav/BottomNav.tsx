import React, { useState } from 'react';
import './bottomnav.css';
import { Link, useLocation } from 'react-router-dom';
import selectMenuForUser from '../../functions/SelectMenuForUser';

function BottomNav() {
  const location = useLocation();

  const userType = 'admin';

  const [isActive, setIsActive] = useState<string>(location.pathname);

  function handleClick(path: string) {
    setIsActive(path);
  }

  return (
    <div className="bottomnav">
      <div className="bottomnav-menu">
        {
          selectMenuForUser(userType).map((data) => (
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
