import React from 'react';
import './tradetransactionpage.css';

export default function TradeTransactionPage() {
  return (
    <div className="trade-transaction page-background">
      <div className="trade-transaction page-header">
        change
      </div>
      <div className="trade-transaction page-container query-state">
        <div className="trade-transaction page-content query-input">
          <div className="trade-transaction page-content-header">
            query gold from inventory
          </div>
          <form onSubmit={() => { alert('query'); }}>
            <div className="trade-transaction input-comp">
              <div className="input-label">code</div>
              <input
                type="string"
                className="inputbox"
              />
            </div>
            <div className="trade-transaction input-comp">
              <div className="input-label">type</div>
              <div className="trade-transaction select-type">
                <select
                  onChange={(e) => { alert(e.target.value); }}
                >
                  <option value="">all</option>
                  <option value="Necklace">necklace</option>
                  <option value="Bracelet">bracelet</option>
                  <option value="Ring">ring</option>
                  <option value="Pendant">pendant</option>
                  <option value="Earring">earring</option>
                  <option value="Bangle">bangle</option>
                </select>
                <span className="custom-arrow" />
              </div>
            </div>
            <div className="trade-transaction input-comp">
              <div className="input-label">weight</div>
              <input
                type="number"
                step="0.00000001"
                className="inputbox"
              />
              <div className="select-weightUnit">
                <select
                  onChange={(e) => { alert(e.target.value); }}
                >
                  <option value="gram">gram</option>
                  <option value="baht">baht</option>
                </select>
                <span className="custom-arrow" />
              </div>
            </div>
            <div className="trade-transaction input-comp">
              <div className="input-label">gold percent</div>
              <input
                type="number"
                step="0.001"
                className="inputbox"
              />
            </div>
            <input
              className="trade-transaction button-search"
              type="submit"
              value="search"
            />
          </form>
        </div>
        <div className="trade-transaction page-content query-table">
          query table
        </div>
        <div className="trade-transaction page-content query-select">
          <div className="trade-transaction page-content-header">
            transaction detail
          </div>
          <div className="select-result">
            item
          </div>
          <form onSubmit={() => { alert('trade'); }}>
            <div className="input-comp">
              <div className="input-label">gold price</div>
              <input
                type="string"
                className="inputbox"
                onChange={(e) => { alert(e.target.value); }}
              />
            </div>
            <div className="input-comp">
              <div className="input-label">price</div>
              <input
                type="number"
                step="0.001"
                className="inputbox"
                onChange={(e) => { alert(e.target.valueAsNumber); }}
              />
            </div>
            <div className="input-comp">
              <div className="input-label">note</div>
              <textarea
                rows={4}
                className="inputbox note"
                onChange={(e) => { alert(e.target.value); }}
              />
            </div>
            <input
              className="buy-transaction button-save"
              type="submit"
              value="confirm"
            />
          </form>
        </div>
      </div>
      <div className="trade-transaction page-container confirm-state">
        <div className="trade-transaction page-content confirm-state">
          <div className="trade-transaction page-content-header">
            transaction detail
          </div>
          <div className="trade-transaction item-select">
            item
          </div>
          <form onSubmit={() => { alert('trade'); }}>
            <div className="input-comp">
              <div className="input-label">gold price</div>
              <input
                type="string"
                className="inputbox"
                onChange={(e) => { alert(e.target.value); }}
              />
            </div>
            <div className="input-comp">
              <div className="input-label">price</div>
              <input
                type="number"
                step="0.001"
                className="inputbox"
                onChange={(e) => { alert(e.target.valueAsNumber); }}
              />
            </div>
            <div className="input-comp">
              <div className="input-label">note</div>
              <textarea
                rows={4}
                className="inputbox note"
                onChange={(e) => { alert(e.target.value); }}
              />
            </div>
            <input
              className="buy-transaction button-save"
              type="submit"
              value="confirm"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
