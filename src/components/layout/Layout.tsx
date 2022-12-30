import React, { useState, useEffect } from 'react';
import './layout.css';
import { Outlet } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';

import { AuthUserProvider } from '../../contexts/AuthUserContex';
import { useLoading } from '../../contexts/LoadingContext';

import SideNav from '../sidenav/SideNav';
import BottomNav from '../bottomnav/BottomNav';
import ScrollToTopButton from '../scrolltotopbutton/ScrollToTopButton';

function Layout() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [wide, isWide] = useState(localStorage.getItem('sidenavWidth'));

  const { loading } = useLoading();

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
    <AuthUserProvider>
      <div className={`loading ${loading ? 'active' : ''}`}>
        <LinearProgress color="inherit" sx={{ width: '100%' }} />
      </div>
      <div className="layout">
        {
          windowWidth > 500
            ? <SideNav />
            : <BottomNav />
        }
        <div className={`
          layout-content
          ${wide === 'short' ? '' : 'expand-sidenav'}
        `}
        >
          <Outlet />
          {/* -- Back to Top -- */}
          <ScrollToTopButton />
        </div>
      </div>
    </AuthUserProvider>
  );
}

export default Layout;
