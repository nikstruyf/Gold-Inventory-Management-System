import React from 'react';
import './reportpage.css';

import { useAlert } from '../../contexts/AlertContext';

function ReportPage() {
  const { alert, setAlert } = useAlert();

  return (
    <div className="inventory page-background">
      {/* -- Header -- */}
      <div className="page-header">
        report
      </div>
      {/* -- Container -- */}
      <div className="page-container">
        content here
        *** nothing now ***
        <button type="button" onClick={() => { setAlert({ active: !alert.active, message: 'error' }); }}>click</button>
      </div>
    </div>
  );
}

export default ReportPage;
