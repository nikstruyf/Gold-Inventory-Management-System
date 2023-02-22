import React, { useState, useEffect } from 'react';
import './layout.css';
import { Outlet } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';

import { AuthUserProvider } from '../../contexts/AuthUserContex';
import { useSideNavWidth } from '../../contexts/SideNavWidthContext';
import { useLoading } from '../../contexts/LoadingContext';

import SideNav from '../sidenav/SideNav';
import BottomNav from '../bottomnav/BottomNav';
import ScrollToTopButton from '../scrolltotopbutton/ScrollToTopButton';
import ConfirmMessage from '../confirmmessage/ConfirmMessage';

function Layout() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const { sideNavWidth } = useSideNavWidth();
  const [wide, isWide] = useState(sideNavWidth);

  const { loading } = useLoading();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
      isWide(sideNavWidth);
    });
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener('click', () => {
      isWide(sideNavWidth);
    });
  }, [wide]);

  return (
    <AuthUserProvider>
      <div className={`loading ${loading ? 'active' : ''}`}>
        <LinearProgress color="inherit" sx={{ width: '100%' }} />
      </div>
      <ConfirmMessage />
      <div className="layout">
        {
          windowWidth > 500
            ? <SideNav />
            : <BottomNav />
        }
        <div className={`
          layout-content
          ${sideNavWidth === 'short' ? '' : 'expand-sidenav'}
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
