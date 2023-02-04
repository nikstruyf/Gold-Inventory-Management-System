import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './inventorypage.css';

import AddIcon from '@mui/icons-material/Add';

import InventoryTable from '../../components/inventorytable/InventoryTable';

function InventoryPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCode, setFilterCode] = useState<string>('');

  return (
    <div className="inventory page-background">
      {/* -- Header -- */}
      <div className="page-header">
        inventory
      </div>
      {/* -- Container -- */}
      <div className="page-container">
        {/* -- Page Option -- */}
        <div className="inventory-page-option">
          {/* -- Status Filter -- */}
          <div className="option-radio">
            <label htmlFor="radio-all" className="radio-label">
              <input
                type="radio"
                id="radio-all"
                name="radio"
                defaultChecked
                onClick={() => { setFilterStatus('all'); }}
              />
              <span className="radio-ckeckbox" />
              <span>all</span>
            </label>
            <label htmlFor="radio-storefront" className="radio-label">
              <input
                type="radio"
                id="radio-storefront"
                name="radio"
                onClick={() => { setFilterStatus('front'); }}
              />
              <span className="radio-ckeckbox" />
              <span>storefront</span>
            </label>
            <label htmlFor="radio-werehouse" className="radio-label">
              <input
                type="radio"
                id="radio-werehouse"
                name="radio"
                onClick={() => { setFilterStatus('safe'); }}
              />
              <span className="radio-ckeckbox" />
              <span>warehouse</span>
            </label>
          </div>
          {/* -- Input -- */}
          <div className="option-input">
            {/* -- Code Filter -- */}
            <div className="option-input-search">
              <input
                type="text"
                placeholder="search code . . ."
                onChange={(e) => { setFilterCode(e.target.value.toLocaleUpperCase()); }}
              />
            </div>
            {/* -- Type Filter -- */}
            <div className="option-select-type">
              <select
                onChange={(e) => { setFilterType(e.target.value); }}
              >
                <option value="all">all</option>
                <option value="Necklace">necklace</option>
                <option value="Bracelet">bracelet</option>
                <option value="Ring">ring</option>
                <option value="Pendant">pendant</option>
                <option value="Earring">earring</option>
                <option value="Bangle">bangle</option>
              </select>
              <span className="custom-arrow" />
            </div>
            <div className="option-vertical-line" />
            {/* -- Add New Gold -- */}
            <Link
              to="/inventory/addgoods"
              className="go-to-add-goods"
            >
              <AddIcon sx={{ fontSize: '16px' }} />
              <div>add new</div>
            </Link>
          </div>
        </div>
        {/* -- Page Table -- */}
        <div className="inventory-table page-content">
          <InventoryTable
            status={filterStatus}
            type={filterType}
            code={filterCode}
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
