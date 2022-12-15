import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './inventorypage.css';

import AddIcon from '@mui/icons-material/Add';

import InventoryTable from '../../components/inventorytable/InventoryTable';

import { GetAllGoldDetailJoinInventory } from '../../functions/GetData';

import { GoldDetailDataType } from '../../interfaces/GoldData';

function InventoryPage() {
  const [cookies] = useCookies(['access-token']);

  const [allGoldDetail, setAllGoldDetail] = useState<GoldDetailDataType[]>([]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    GetAllGoldDetailJoinInventory(cookies['access-token']).then((res) => {
      setAllGoldDetail(res.data);
    });
  }, []);

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
              <span>werehouse</span>
            </label>
          </div>
          {/* -- Input -- */}
          <div className="option-input">
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
            {/* -- Code Filter -- */}
            <div className="option-input-search">
              <input
                type="text"
                placeholder="search..."
              />
              <button
                type="button"
              >
                search
              </button>
            </div>
            <div className="option-vertical-line" />
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
        <div className="inventory-page-table">
          <InventoryTable
            goldData={allGoldDetail}
            status={filterStatus}
            type={filterType}
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
