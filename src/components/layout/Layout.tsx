import React, { useState, useEffect } from 'react';
import './layout.css';
import { Outlet } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';

// import { AuthUserProvider } from '../../contexts/AuthUserContex';
import { LoadingProvider } from '../../contexts/LoadingContext';

import SideNav from '../sidenav/SideNav';
import BottomNav from '../bottomnav/BottomNav';

function Layout() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const [wide, isWide] = useState(localStorage.getItem('sidenavWidth'));

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
      isWide(localStorage.getItem('sidenavWidth'));
    });
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener('click', () => {
      isWide(localStorage.getItem('sidenavWidth'));
    });
  }, [wide]);

  return (
  // <AuthUserProvider>
    <div className="layout">
      {
          windowWidth > 500
            ? <SideNav />
            : <BottomNav />
        }
      <LoadingProvider>
        <div className={`
          layout-content
          ${wide === 'short' ? '' : 'expand-sidenav'}
        `}
        >
          <div className="loading">
            <LinearProgress color="inherit" sx={{ width: '100%' }} />
          </div>
          <Outlet />
        </div>
      </LoadingProvider>
    </div>
  // </AuthUserProvider>
  );
}

export default Layout;
