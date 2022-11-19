import React, { useState } from 'react';
import './addgoodspage.css';

// import GoldCard from '../../components/goldcard/GoldCard';
import FormAddNewGold from '../../components/formaddnewgold/FormAddNewGold';
import FormAddQueryGold from '../../components/formaddquerygold/FormAddQueryGold';

function AddGoodsPage() {
  const [pageForm, setPageForm] = useState<string>('new');

  return (
    <div className="addgoods-page-background">
      <div className="addgood-page-main-container">
        {/* Button Select Type Form */}
        <div className="page-select-form">
          <button
            type="button"
            className={`button-select-form ${pageForm === 'new' ? 'active' : ''}`}
            onClick={() => { setPageForm('new'); }}
          >
            add new gold
          </button>
          <button
            type="button"
            className={`button-select-form ${pageForm === 'query' ? 'active' : ''}`}
            onClick={() => { setPageForm('query'); }}
          >
            add by query gold
          </button>
        </div>
        {/* Add New Gold */}
        <div className={`form ${pageForm === 'new' ? 'active' : ''}`}>
          <FormAddNewGold />
        </div>
        {/* Add Query Gold */}
        <div className={`form ${pageForm === 'query' ? 'active' : ''}`}>
          <FormAddQueryGold />
        </div>
      </div>
    </div>
  );
}

export default AddGoodsPage;
