import React from 'react';
import './organizationpage.css';
import { Outlet } from 'react-router-dom';

function OrganizationPage() {
  return (
    <div className="organization-background">
      {/* -- Header -- */}
      <div className="organization-page-header">
        organization
      </div>
      {/* -- Container -- */}
      <div className="organization-page-content">
        <Outlet />
      </div>
    </div>
  );
}

export default OrganizationPage;
