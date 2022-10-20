import React from 'react';
import './addgoodspage.css';

function AddGoodsPage() {
  return (
    <div className="addgoods-page-background">
      <div className="addgood-page-main-container">
        <form>
          <label htmlFor="input-code">
            <span>code</span>
            <input
              type="text"
              id="input-code"
            />
          </label>
          <label htmlFor="input-type">
            <span>type</span>
            <input
              type="text"
              id="input-type"
            />
            <select id="input-type">
              <option value="necklace">necklace</option>
              <option value="bracelet">bracelet</option>
              <option value="ring">ring</option>
              <option value="pendant">pendant</option>
              <option value="earring">earring</option>
              <option value="bangle">bangle</option>
            </select>
          </label>
          <label htmlFor="input-detail">
            <span>detail</span>
            <input
              type="text"
              id="input-detail"
            />
          </label>
          <label htmlFor="input-weight">
            <span>weight</span>
            <input
              type="number"
              id="input-weight"
            />
          </label>
          <label htmlFor="input-weightUnit">
            <select id="input-weightUnit">
              <option value="gram">gram</option>
              <option value="baht">baht</option>
            </select>
          </label>
          <label htmlFor="input-goldPercent">
            <span>gold percent</span>
            <input
              type="number"
              id="input-goldPercent"
            />
          </label>
          <label htmlFor="input-goldSmithFee">
            <span>gold smith fee</span>
            <input
              type="number"
              id="input-goldSmithFee"
            />
          </label>
          {/* input picture */}
          <label htmlFor="input-otherDetail">
            <span>other detail</span>
            <input
              type="text"
              id="input-otherDetail"
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default AddGoodsPage;
