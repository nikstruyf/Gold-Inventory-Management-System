import React, { useState, useEffect } from 'react';
import './scrolltotopbutton.css';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);

  return (
    <div
      className={`inventory-page-backtotop ${visible ? 'active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      onKeyDown={() => {}}
    >
      <ArrowUpwardIcon sx={{ fontSize: 40 }} />
    </div>
  );
}
