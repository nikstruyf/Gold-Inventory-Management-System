import React from 'react';
import { Link } from 'react-router-dom';
import './inventorypage.css';

import AddIcon from '@mui/icons-material/Add';

function InventoryPage() {
  return (
    <div className="inventory-background">
      {/* -- Header -- */}
      <div className="inventory-page-header">
        inventory
      </div>
      {/* -- Container -- */}
      <div className="page-container">
        {/* -- Page Option -- */}
        <div className="inventory-page-option">
          <div className="option-radio">
            <label htmlFor="radio-all" className="radio-label">
              <input type="radio" id="radio-all" name="radio" defaultChecked />
              <span className="radio-ckeckbox" />
              <span>all</span>
            </label>
            <label htmlFor="radio-storefront" className="radio-label">
              <input type="radio" id="radio-storefront" name="radio" />
              <span className="radio-ckeckbox" />
              <span>storefront</span>
            </label>
            <label htmlFor="radio-werehouse" className="radio-label">
              <input type="radio" id="radio-werehouse" name="radio" />
              <span className="radio-ckeckbox" />
              <span>werehouse</span>
            </label>
          </div>
          <div>
            <Link
              to="/inventory/addgoods"
              className="go-to-add-goods"
            >
              <AddIcon />
              <div>add</div>
            </Link>
          </div>
        </div>
        {/* -- Page Table -- */}
        <div className="inventory-page-table">
          table
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
