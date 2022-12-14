import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './inventorypage.css';

import AddIcon from '@mui/icons-material/Add';

import InventoryTable from '../../components/inventorytable/InventoryTable';
import ScrollToTopButton from '../../components/scrolltotopbutton/ScrollToTopButton';

import { GetAllGoldDetailJoinInventory } from '../../functions/GetData';

import { GoldDetailDataType } from '../../interfaces/GoldData';

function InventoryPage() {
  const [cookies] = useCookies(['access-token']);

  const [allGoldDetail, setAllGoldDetail] = useState<GoldDetailDataType[]>([]);

  const [filterStatus, setFilterStatus] = useState<string>('all');

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
          <div className="option-input">
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
          <InventoryTable goldData={allGoldDetail} status={filterStatus} />
        </div>
        {/* -- Back to Top -- */}
        <ScrollToTopButton />
      </div>
    </div>
  );
}

export default InventoryPage;
