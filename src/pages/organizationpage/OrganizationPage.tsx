import React from 'react';
import './organizationpage.css';

import RegisterContainer from '../../components/registercontainer/RegisterContainer';

function OrganizationPage() {
  return (
    <div className="organization-background">
      {/* -- Header -- */}
      <div className="organization-page-header">
        organization
      </div>
      {/* -- Container -- */}
      <div className="organization-page-content">
        <RegisterContainer />
      </div>
    </div>
  );
}

export default OrganizationPage;
