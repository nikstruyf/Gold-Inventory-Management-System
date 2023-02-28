import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './tradetransactionpage.css';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';

import { useLoading } from '../../contexts/LoadingContext';
import { useConfirm } from '../../contexts/ConfirmContext';
import { useAlert } from '../../contexts/AlertContext';

import { FindQueryGoldByInventory, TradeTransaction } from '../../functions/CreateTransaction';
import { ConvertWeight, CheckWeight } from '../../functions/ConvertWeight';
import Delay from '../../functions/Delay';
import { getGoldDetailJoinInventoyBySerial } from '../../functions/GetData';

import { GoldDetailDataType, GoldInventoryDataType } from '../../interfaces/GoldData';

export default function TradeTransactionPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access-token']);

  const { setLoading } = useLoading();
  const { confirm, setConfirm } = useConfirm();
  const { setAlert } = useAlert();

  const buyStateRef = useRef<null | HTMLDivElement>(null);

  const [queryResultData, setQueryResultData] = useState<GoldDetailDataType[]>([]);

  const [goldInventoryId, setGoldInventoryId] = useState<number>(0);
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [goldPercent, setGoldPercent] = useState<number>(0);
  const [goldPriceStart, setGoldPriceStart] = useState<number>(0);
  const [goldPriceEnd, setGoldPriceEnd] = useState<number>(0);
  const [note, setNote] = useState<string>('');
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);

  const [unit, setUnit] = useState<string>('gram');
  const [weightUnit, setWeightUnit] = useState<string>('gram');

  const [showQueryForm, setShowQueryForm] = useState<boolean>(true);
  const [buyState, setBuyState] = useState<boolean>(false);
  const [submit, isSubmit] = useState<boolean>(false);

  const [activateInputSerialNumber, setActivateInputSerialNumber] = useState<boolean>(false);
  const [focusReadSerialRef, setFocusReadSerialRef] = useState<boolean>(false);
  const [serialNumber, setSerialNumber] = useState<string>('');

  function CheckFillAll() {
    if (goldInventoryId === 0
      || goldPriceStart === 0
      || goldPriceEnd === 0
      || sellPrice === 0
    ) {
      return false;
    }
    if (
      buyState
      && (buyPrice === 0
        || weight === 0)
    ) {
      return false;
    }
    return true;
  }

  function ConvertWeightUnit() {
    if (weightUnit === 'gram') {
      setWeightUnit('Baht');
    } else {
      setWeightUnit('gram');
    }
  }

  const searchByRFID = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (serialNumber !== '') {
      const searchByRfidRes = await getGoldDetailJoinInventoyBySerial(
        Number(serialNumber),
        cookies['access-token']
      );
      setGoldInventoryId(searchByRfidRes.data.gold_inventory.gold_inventory_id);
    }
    setActivateInputSerialNumber(false);
    setSerialNumber('');
    setLoading(false);
  };

  const query = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (unit === 'baht') {
      setWeight(ConvertWeight(weight, unit));
    }
    const queryResult = await FindQueryGoldByInventory(
      code,
      type,
      CheckWeight(weight, unit),
      goldPercent,
      cookies['access-token']
    );
    setQueryResultData(queryResult);
    setLoading(false);
  };

  const next = async (e: any) => {
    e.preventDefault();
    if (goldInventoryId !== 0
      && goldPriceStart !== 0
      && goldPriceEnd !== 0
      && sellPrice !== 0) {
      setBuyState(true);
      await Delay(100);
      isSubmit(false);
      buyStateRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      isSubmit(true);
    }
  };

  const trade = async (e: any) => {
    e.preventDefault();
    isSubmit(true);
    if (CheckFillAll()) {
      setConfirm({
        active: true,
        message: 'confirm save ?',
        action: 'tradetransaction',
        status: ''
      });
    }
  };

  async function Trade() {
    setLoading(true);
    const sellResult = await TradeTransaction(
      goldInventoryId,
      `${goldPriceStart} - ${goldPriceEnd}`,
      weight,
      note,
      buyPrice,
      sellPrice,
      cookies['access-token']
    );
    if (sellResult === 'complete') {
      navigate('/transaction');
    } else {
      setAlert({
        active: true,
        message: 'Error! can not create transaction.\ntry agian later.'
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (confirm.status === 'confirm' && confirm.action === 'tradetransaction') {
      Trade();
      setConfirm({
        active: false,
        message: '',
        action: '',
        status: ''
      });
    }
  }, [confirm.status]);

  async function firstRender() {
    const queryResult = await FindQueryGoldByInventory(
      code,
      type,
      weight,
      goldPercent,
      cookies['access-token']
    );
    setQueryResultData(queryResult);
  }

  useEffect(() => {
    firstRender();
  }, []);

  return (
    <div className="trade-transaction page-background">
      {/* Read Serial Number Modal */}
      <div className={`modal-bg read-serial-addnew ${activateInputSerialNumber ? 'active' : ''}`}>
        <div className={`page-content read-serial-addnew ${activateInputSerialNumber ? 'active' : ''}`}>
          <div className="page-content-header">
            scan RFID tag
          </div>
          <div
            className={`
              notice focus-read-serial
              ${focusReadSerialRef ? '' : 'active'}
            `}
          >
            click on input box
          </div>
          <form onSubmit={searchByRFID}>
            <input
              className="inputbox read-serial"
              type="text"
              maxLength={10}
              value={serialNumber}
              onChange={(e) => { setSerialNumber(e.target.value); }}
              onFocus={() => { setFocusReadSerialRef(true); }}
              onBlur={() => { setFocusReadSerialRef(false); }}
            />
          </form>
          <button
            className="read-serial button-cancel"
            type="button"
            onClick={() => {
              setSerialNumber('');
              setActivateInputSerialNumber(false);
            }}
          >
            cancle
          </button>
        </div>
      </div>
      {/* Page Header */}
      <div className="trade-transaction page-header">
        change
      </div>
      {/* Page Content */}
      <div className="trade-transaction page-container query-state">
        {/* Query Gold Form Inventory */}
        <div className="trade-transaction page-content query-input">
          {/* Content Header */}
          <div className="trade-transaction page-content-header">
            query gold from inventory
          </div>
          {/* Button Search By RFID */}
          <button
            className="sell-transaction button-search search-rfid"
            type="button"
            onClick={() => { setActivateInputSerialNumber(true); }}
          >
            search by RFID
          </button>
          {/* Form Query Gold */}
          <form
            onSubmit={query}
            className={`query-form ${showQueryForm ? '' : 'hide'}`}
          >
            {/* Input Code */}
            <div className="trade-transaction input-comp">
              <div className="input-label">code</div>
              <input
                type="string"
                className="inputbox"
                onChange={(e) => { setCode(e.target.value); }}
              />
            </div>
            {/* Input Type */}
            <div className="trade-transaction input-comp">
              <div className="input-label">type</div>
              <div className="trade-transaction select-type">
                <select
                  onChange={(e) => { setType(e.target.value); }}
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
            {/* Input Weight */}
            <div className="trade-transaction input-comp">
              <div className="input-label">weight</div>
              <input
                type="number"
                step="0.00000001"
                className="inputbox"
                onChange={(e) => { setWeight(e.target.valueAsNumber); }}
              />
              <div className="query select-weightUnit">
                <select
                  onChange={(e) => { setUnit(e.target.value); }}
                >
                  <option value="gram">gram</option>
                  <option value="baht">baht</option>
                </select>
                <span className="custom-arrow" />
              </div>
            </div>
            {/* Input Gold Percent */}
            <div className="trade-transaction input-comp">
              <div className="input-label">gold percent</div>
              <input
                type="number"
                step="0.001"
                className="inputbox"
                onChange={(e) => { setGoldPercent(e.target.valueAsNumber); }}
              />
            </div>
            {/* Search Button */}
            <input
              className="trade-transaction button-search"
              type="submit"
              value="search"
            />
          </form>
          {/* Button Expand Form */}
          <button
            className={`trade-transaction button-search button-expand ${showQueryForm ? 'hide' : ''}`}
            type="button"
            onClick={() => { setShowQueryForm(true); }}
          >
            <KeyboardDoubleArrowDownIcon sx={{ fontSize: 26 }} />
          </button>
        </div>
        {/* Gold Table & Query Result Table */}
        <div className="trade-transaction page-content query-result-table">
          {/* Table */}
          <div className="query-table">
            <table>
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="head-picture">
                    picture
                  </th>
                  <th className="head-id">
                    ID
                  </th>
                  <th className="head-code">
                    code
                  </th>
                  <th className="head-type">
                    type
                  </th>
                  <th className="head-detail">
                    detail
                  </th>
                  <th className="head-weight">
                    weight
                    <button
                      className="table-weight-unit"
                      type="button"
                      onClick={() => { ConvertWeightUnit(); }}
                    >
                      {weightUnit}
                    </button>
                  </th>
                  <th className="head-gold-percent">
                    gold percent
                  </th>
                  <th className="head-gold-smith-fee">
                    gold smith fee
                  </th>
                  <th className="head-note">
                    note
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {
                  queryResultData?.map((el) => (
                    el.inventories?.map((data: GoldInventoryDataType) => (
                      <tr
                        key={data.gold_inventory_id}
                        className={`
                      trade-transaction table-row
                      ${goldInventoryId === data.gold_inventory_id ? 'highlight' : ''}
                      `}
                        onClick={() => {
                          setShowQueryForm(goldInventoryId !== 0);
                          setGoldInventoryId(data.gold_inventory_id);
                        }}
                      >
                        <td className="body-picture">
                          <img src={el.picture} alt={String(el.code)} />
                        </td>
                        <td>
                          {data.gold_inventory_id}
                        </td>
                        <td>
                          {el.code}
                        </td>
                        <td>
                          {el.type}
                        </td>
                        <td>
                          {el.detail}
                        </td>
                        <td className="body-value">
                          {
                            weightUnit === 'Baht'
                              ? ConvertWeight(el.weight, 'gram')
                              : el.weight
                          }
                        </td>
                        <td className="body-value">
                          {el.gold_percent}
                        </td>
                        <td className="body-value">
                          {el.gold_smith_fee}
                        </td>
                        <td>
                          {data.note}
                        </td>
                      </tr>
                    ))
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* Next to Buy Transaction */}
        <div
          className={`
            trade-transaction page-content query-select
            ${goldInventoryId === 0 ? '' : 'active'}
          `}
        >
          {/* Content Header */}
          <div className="trade-transaction page-content-header">
            Items detail
          </div>
          {/* Selected Item */}
          <div className="select-result">
            {`gold ID: ${goldInventoryId}`}
          </div>
          {/* Form trade Transaction */}
          <form onSubmit={next}>
            {/* Input Gold Price */}
            <div className="input-comp">
              <div className="input-label">
                gold price
                <span className={`important-mark
                    ${
                      CheckFillAll()
                      || goldPriceStart !== 0
                      || goldPriceEnd !== 0
                        ? '' : 'show'
                    }`}
                >
                  *
                </span>
              </div>
              <div className="trade-transaction gold-price">
                <input
                  type="number"
                  className="inputbox"
                  onChange={(e) => { setGoldPriceStart(e.target.valueAsNumber); }}
                />
                <span className="gold-price-range">-</span>
                <input
                  type="number"
                  className="inputbox"
                  onChange={(e) => { setGoldPriceEnd(e.target.valueAsNumber); }}
                />
              </div>
            </div>
            {/* Input Price */}
            <div className="input-comp">
              <div className="input-label">
                sell price
                <span className={`important-mark ${CheckFillAll() || sellPrice !== 0 ? '' : 'show'}`}>
                  *
                </span>
              </div>
              <input
                type="number"
                step="0.001"
                className="inputbox"
                value={sellPrice || undefined}
                onChange={(e) => { setSellPrice(e.target.valueAsNumber); }}
              />
            </div>
            {/* Alert Fill All */}
            <div className={`invalid-fillall-message ${CheckFillAll() || !submit ? '' : 'show'}`}>
              please fill all details
            </div>
            {/* Confirm Button */}
            <input
              className="trade-transaction button-save"
              type="submit"
              value="next"
            />
          </form>
        </div>
      </div>
      {/* Page Buy Content */}
      <div
        className={`
          trade-transaction page-container buy-state
          ${buyState ? '' : 'hide'}
        `}
        ref={buyStateRef}
      >
        <div className="trade-transaction page-content">
          {/* Content Header */}
          <div className="trade-transaction page-content-header">
            transaction detail
          </div>
          {/* Form trade Transaction */}
          <form onSubmit={trade}>
            {/* Input Gold Price */}
            <div className="input-comp">
              <div className="input-label">
                gold price
                <span
                  className={`important-mark
                    ${
                      CheckFillAll()
                        || goldPriceStart !== 0
                        || goldPriceEnd !== 0
                        ? '' : 'show'
                      }
                  `}
                >
                  *
                </span>
              </div>
              <div className="trade-transaction gold-price">
                <input
                  type="number"
                  className="inputbox"
                  value={goldPriceStart}
                  onChange={(e) => { setGoldPriceStart(e.target.valueAsNumber); }}
                />
                <span className="gold-price-range">-</span>
                <input
                  type="number"
                  className="inputbox"
                  value={goldPriceEnd}
                  onChange={(e) => { setGoldPriceEnd(e.target.valueAsNumber); }}
                />
              </div>
            </div>
            <div className="trade-transaction item-input-border">
              {/* Selected Item */}
              <div className="select-result">
                {`gold ID: ${goldInventoryId}`}
              </div>
              {/* Input Price */}
              <div className="input-comp">
                <div className="input-label">
                  sell price
                  <span className={`important-mark ${CheckFillAll() || sellPrice !== 0 ? '' : 'show'}`}>
                    *
                  </span>
                </div>
                <input
                  type="number"
                  step="0.001"
                  className="inputbox"
                  value={sellPrice}
                  onChange={(e) => { setSellPrice(e.target.valueAsNumber); }}
                />
              </div>
            </div>
            <div className="trade-transaction change-icon">
              <ChangeCircleOutlinedIcon sx={{ fontSize: 40 }} />
            </div>
            <div className="trade-transaction item-input-border">
              <div className="select-result">
                customer&#39;s gold details
              </div>
              {/* Input Weight */}
              <div className="input-comp">
                <div className="input-label">
                  weight
                  <span className={`important-mark ${CheckFillAll() || weight !== 0 ? '' : 'show'}`}>
                    *
                  </span>
                </div>
                <div className="trade-transaction input-weight">
                  <input
                    type="number"
                    step="0.00000001"
                    className="inputbox"
                    onChange={(e) => { setWeight(e.target.valueAsNumber); }}
                  />
                  <div className="select-weightUnit">
                    <select
                      onChange={(e) => { setWeightUnit(e.target.value); }}
                    >
                      <option value="gram">gram</option>
                      <option value="baht">baht</option>
                    </select>
                    <span className="custom-arrow" />
                  </div>
                </div>
              </div>
              {/* Input Price */}
              <div className="input-comp">
                <div className="input-label">
                  buy price
                  <span className={`important-mark ${CheckFillAll() || buyPrice !== 0 ? '' : 'show'}`}>
                    *
                  </span>
                </div>
                <input
                  type="number"
                  step="0.001"
                  className="inputbox"
                  onChange={(e) => { setBuyPrice(e.target.valueAsNumber); }}
                />
              </div>
              {/* Input Note */}
              <div className="input-comp">
                <div className="input-label">note</div>
                <textarea
                  rows={4}
                  className="inputbox note"
                  onChange={(e) => { setNote(e.target.value); }}
                />
              </div>
            </div>
            {/* Alert Fill All */}
            <div className={`invalid-fillall-message ${CheckFillAll() || !submit ? '' : 'show'}`}>
              please fill all details
            </div>
            {/* Confirm Button */}
            <input
              className="trade-transaction button-save"
              type="submit"
              value="confirm"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
