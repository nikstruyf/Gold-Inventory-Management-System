import React from 'react';
import './inventorypage.css';
import Table from '../../components/table/Table';

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
              <input type="radio" id="radio-all" name="radio" />
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
        </div>
        <div className="inventory-page-table">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
