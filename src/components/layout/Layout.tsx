import React, { useState, useEffect } from 'react';
import './layout.css';
import { Outlet } from 'react-router-dom';
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
      </div>
    </div>
  );
}

export default Layout;
