import React, { useEffect } from 'react';
import './alertmessage.css';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useAlert } from '../../contexts/AlertContext';

import Delay from '../../functions/Delay';

export default function AlertMessage() {
  const { alert, setAlert } = useAlert();

  async function setState() {
    await Delay(4000);
    setAlert({
      active: false,
      message: ''
    });
  }

  useEffect(() => {
    if (alert.active) {
      setState();
    }
  }, [alert.active]);

  return (
    <div className={`alert-message page-content ${alert.active ? 'active' : ''}`}>
      <ErrorOutlineIcon sx={{ fontSize: 40 }} />
      <div className="alert-message message">
        {alert.message}
      </div>
    </div>
  );
}
