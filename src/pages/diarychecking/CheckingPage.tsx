import React, { useState, useEffect } from 'react';
import './checkingpage.css';
import { useCookies } from 'react-cookie';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PanoramaFishEyeRoundedIcon from '@mui/icons-material/PanoramaFishEyeRounded';
import CloseIcon from '@mui/icons-material/Close';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import CancelIcon from '@mui/icons-material/Cancel';

import { GetFrontGold } from '../../functions/GetData';
import { ConvertWeight } from '../../functions/ConvertWeight';
import DiaryChecking from '../../functions/DiaryChecking';

// import { useLoading } from '../../contexts/LoadingContext';
import { useConfirm } from '../../contexts/ConfirmContext';
import { useAlert } from '../../contexts/AlertContext';

import { StoreFrontGold, CheckingResult } from '../../interfaces/GoldData';

export default function CheckingPage() {
  const [cookies] = useCookies(['access-token']);

  // const { setLoading } = useLoading();
  const { confirm, setConfirm } = useConfirm();
  const { setAlert } = useAlert();

  const [goldData, setGoldData] = useState<StoreFrontGold[]>([]);
  const [resultData, setResultData] = useState<CheckingResult>({
    result: '',
    miss_front_gold: [],
    tag_empty_front_gold: [],
    safe_gold: [],
  });

  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [focusReadSerialRef, setFocusReadSerialRef] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const [inputSerial, setInputSerial] = useState<string>('');
  const [itemChecked, setItemChecked] = useState<number[]>([]);

  const [weightUnit, setWeightUnit] = useState<string>('gram');

  useEffect(() => {
    GetFrontGold(cookies['access-token']).then((res) => {
      setGoldData(res.data);
    }).catch(() => {
      setAlert({
        active: true,
        message: 'Error! can not get data'
      });
    });
  }, []);

  function ConvertWeightUnit() {
    if (weightUnit === 'gram') {
      setWeightUnit('Baht');
    } else {
      setWeightUnit('gram');
    }
  }

  const pushSerial = (e: any) => {
    e.preventDefault();
    if (!itemChecked.includes(Number(inputSerial))) {
      setItemChecked([...itemChecked, Number(inputSerial)]);
    }
    setInputSerial('');
  };

  function DoneChecking() {
    setConfirm({
      active: true,
      message: 'done?',
      action: 'done checking',
      status: ''
    });
  }

  async function ShowResult() {
    const CheckingRes = await DiaryChecking(itemChecked, cookies['access-token']);
    setResultData(CheckingRes);
    setIsDone(true);
  }

  useEffect(() => {
    if (confirm.status === 'confirm' && confirm.action === 'done checking') {
      setConfirm({
        active: false,
        message: '',
        action: '',
        status: ''
      });
      ShowResult();
    }
  }, [confirm.status]);

  return (
    <div className="checking-page page-background">
      {/* -- Header -- */}
      <div className="page-header">
        checking
      </div>
      {/* -- Container Inventory -- */}
      <div className="checking-page page-container">
        {/* -- Checking Bar -- */}
        <div className="checking-bar page-content">
          {
            !isChecking
              ? (
                <button
                  className="checking-bar button-start-check"
                  type="button"
                  onClick={() => { setIsChecking(true); }}
                >
                  start diary checking
                </button>
              )
              : (
                <form
                  className="form-checking"
                  onSubmit={pushSerial}
                >
                  <input
                    className="inputbox input-serial"
                    type="text"
                    maxLength={10}
                    value={inputSerial}
                    onChange={(e) => { setInputSerial(e.target.value); }}
                    onFocus={() => { setFocusReadSerialRef(true); }}
                    onBlur={() => { setFocusReadSerialRef(false); }}
                  />
                  <div
                    className={`
                      notice focus-read-serial
                      ${focusReadSerialRef ? '' : 'active'}
                    `}
                  >
                    click on input box
                  </div>
                </form>
              )
          }
          <div className="button-group">
            <button
              className={`checking-bar button-done ${itemChecked.length > 0 ? 'active' : ''}`}
              type="button"
              onClick={() => { DoneChecking(); }}
            >
              done
            </button>
            <button
              className={`checking-bar button-reset ${itemChecked.length > 0 && isChecking ? 'active' : ''}`}
              type="button"
              onClick={() => { setItemChecked([]); }}
            >
              reset
            </button>
          </div>
        </div>
        {/* When not Checking */}
        <div className={`checking-not ${!isChecking ? 'active' : ''}`}>
          <DomainVerificationIcon sx={{ fontSize: 80 }} />
          <div>
            diary checking
          </div>
        </div>
        {/* -- Checking Table -- */}
        <div className={`checking-table page-content ${isChecking ? 'active' : ''}`}>
          <table>
            {/* Table Head */}
            <thead>
              <tr className="checking-table row-header">
                <th className="checking-table head-icon">
                  &#8203;
                </th>
                <th className="checking-table head-id">
                  ID
                </th>
                <th className="checking-table head-code">
                  code
                </th>
                <th className="checking-table head-type">
                  type
                </th>
                <th className="checking-table head-detail">
                  detail
                </th>
                <th className="checking-table head-weight">
                  <span>weight</span>
                  <button
                    className="table-weight-unit"
                    type="button"
                    onClick={() => { ConvertWeightUnit(); }}
                  >
                    {weightUnit}
                  </button>
                </th>
                <th className="checking-table head-gold-percent">
                  gold percent
                </th>
                <th className="checking-table head-gold-smith-fee">
                  gold smith fee
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {
                goldData?.map((data: StoreFrontGold) => (
                  <tr
                    className={`checking-table row-body ${itemChecked.includes(data.gold_inventory.tag_serail_number) ? 'checked' : ''}`}
                    key={data.gold_inventory.gold_inventory_id}
                  >
                    <td className="checking-table body-icon">
                      {
                        itemChecked.includes(data.gold_inventory.tag_serail_number)
                          ? <CheckCircleRoundedIcon sx={{ fontSize: 24, color: '#B93030' }} />
                          : <PanoramaFishEyeRoundedIcon sx={{ fontSize: 24 }} />
                      }
                    </td>
                    <td className="checking-table body-id">
                      {data.gold_inventory.gold_inventory_id}
                    </td>
                    <td className="checking-table body-code">
                      {data.gold_detail.code}
                    </td>
                    <td className="checking-table body-type">
                      {data.gold_detail.type}
                    </td>
                    <td className="checking-table body-detail">
                      {data.gold_detail.detail}
                    </td>
                    <td className="checking-table body-weight">
                      {weightUnit === 'Baht' ? ConvertWeight(data.gold_detail.weight, 'gram') : data.gold_detail.weight}
                    </td>
                    <td className="checking-table body-gold-percent">
                      {data.gold_detail.gold_percent}
                    </td>
                    <td className="checking-table body-gold-smith-fee">
                      {data.gold_detail.gold_smith_fee}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        {/* Checking Result */}
        <div className={`checking-result modal-bg ${isDone ? 'active' : ''}`}>
          <div className={`checking-result page-content ${isDone ? 'active' : ''}`}>
            <div className="checking-result page-content-header">
              <div>
                {resultData?.result}
              </div>
              <CloseIcon
                className="button-close"
                sx={{ fontSize: 24 }}
                onClick={() => { setIsDone(false); }}
              />
            </div>
            {/* Table Missing Gold In Storefront */}
            <div>
              {
                resultData!?.miss_front_gold && resultData!?.miss_front_gold.length > 0
                  ? (
                    <span className="checking-result table-topic miss">
                      <CancelIcon />
                      missing gold in storefront
                    </span>
                  )
                  : (
                    <span className="checking-result table-topic all">
                      <CheckCircleRoundedIcon />
                      no missing gold in storefront
                    </span>
                  )
              }
            </div>
            <table
              className={`
                checking-result table
                ${resultData!?.miss_front_gold && resultData!?.miss_front_gold.length > 0 ? '' : 'none'}
              `}
            >
              <thead>
                <tr>
                  <th className="checking-result table-head picture">
                    picture
                  </th>
                  <th className="checking-result table-head code">
                    code
                  </th>
                  <th className="checking-result table-head type">
                    type
                  </th>
                  <th className="checking-result table-head detail">
                    detail
                  </th>
                  <th className="checking-result table-head weight">
                    weight (g)
                  </th>
                  <th className="checking-result table-head gold-percent">
                    gold percent
                  </th>
                  <th className="checking-result table-head gold-smith-fee">
                    gold smith fee
                  </th>
                  <th className="checking-result table-head note">
                    note
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  resultData?.miss_front_gold
                  && resultData?.miss_front_gold.map((data: StoreFrontGold, index: number) => (
                    <tr
                      className={`checking-result table-row ${index % 2 === 0 ? 'even' : 'odd'}`}
                      key={data.gold_inventory.gold_inventory_id}
                    >
                      <td className="checking-result table-body picture">
                        <img src={data.gold_detail.picture} alt={data.gold_detail.code} />
                      </td>
                      <td className="checking-result table-body code">
                        {data.gold_detail.code}
                      </td>
                      <td className="checking-result table-body type">
                        {data.gold_detail.type}
                      </td>
                      <td className="checking-result table-body detail">
                        {data.gold_detail.detail}
                      </td>
                      <td className="checking-result table-body weight">
                        {data.gold_detail.weight}
                      </td>
                      <td className="checking-result table-body gold-percent">
                        {data.gold_detail.gold_percent}
                      </td>
                      <td className="checking-result table-body gold-smith-fee">
                        {data.gold_detail.gold_smith_fee}
                      </td>
                      <td className="checking-result table-body note">
                        {data.gold_inventory.note}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {/* Table Gold In Storefront Have No Tag */}
            <div>
              {
                resultData!?.tag_empty_front_gold && resultData!?.tag_empty_front_gold.length > 0
                  ? (
                    <span className="checking-result table-topic miss">
                      <CancelIcon />
                      have non serial number gold in storefront
                    </span>
                  )
                  : (
                    <span className="checking-result table-topic all">
                      <CheckCircleRoundedIcon />
                      have not non serial number gold in storefront
                    </span>
                  )
              }
            </div>
            <table
              className={`
                checking-result table
                ${resultData!?.tag_empty_front_gold && resultData!?.tag_empty_front_gold.length > 0 ? '' : 'none'}
              `}
            >
              <thead>
                <tr>
                  <th className="checking-result table-head picture">
                    picture
                  </th>
                  <th className="checking-result table-head code">
                    code
                  </th>
                  <th className="checking-result table-head type">
                    type
                  </th>
                  <th className="checking-result table-head detail">
                    detail
                  </th>
                  <th className="checking-result table-head weight">
                    weight (g)
                  </th>
                  <th className="checking-result table-head gold-percent">
                    gold percent
                  </th>
                  <th className="checking-result table-head gold-smith-fee">
                    gold smith fee
                  </th>
                  <th className="checking-result table-head note">
                    note
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  resultData?.tag_empty_front_gold
                  && resultData?.tag_empty_front_gold.map((data: StoreFrontGold, index: number) => (
                    <tr
                      className={`checking-result table-row ${index % 2 === 0 ? 'even' : 'odd'}`}
                      key={data.gold_inventory.gold_inventory_id}
                    >
                      <td className="checking-result table-body picture">
                        <img src={data.gold_detail.picture} alt={data.gold_detail.code} />
                      </td>
                      <td className="checking-result table-body code">
                        {data.gold_detail.code}
                      </td>
                      <td className="checking-result table-body type">
                        {data.gold_detail.type}
                      </td>
                      <td className="checking-result table-body detail">
                        {data.gold_detail.detail}
                      </td>
                      <td className="checking-result table-body weight">
                        {data.gold_detail.weight}
                      </td>
                      <td className="checking-result table-body gold-percent">
                        {data.gold_detail.gold_percent}
                      </td>
                      <td className="checking-result table-body gold-smith-fee">
                        {data.gold_detail.gold_smith_fee}
                      </td>
                      <td className="checking-result table-body note">
                        {data.gold_inventory.note}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {/* Table Missing Gold In Warehouse */}
            <div>
              {
                resultData!?.safe_gold && resultData!?.safe_gold.length > 0
                  ? (
                    <span className="checking-result table-topic miss">
                      <CancelIcon />
                      serial number have checked gold in warehouse
                    </span>
                  )
                  : (
                    <span className="checking-result table-topic all">
                      <CheckCircleRoundedIcon />
                      no serial number have checked gold in warehouse
                    </span>
                  )
              }
            </div>
            <table
              className={`
                checking-result table
                ${resultData!?.safe_gold && resultData!?.safe_gold.length > 0 ? '' : 'none'}
              `}
            >
              <thead>
                <tr>
                  <th className="checking-result table-head picture">
                    picture
                  </th>
                  <th className="checking-result table-head code">
                    code
                  </th>
                  <th className="checking-result table-head type">
                    type
                  </th>
                  <th className="checking-result table-head detail">
                    detail
                  </th>
                  <th className="checking-result table-head weight">
                    weight (g)
                  </th>
                  <th className="checking-result table-head gold-percent">
                    gold percent
                  </th>
                  <th className="checking-result table-head gold-smith-fee">
                    gold smith fee
                  </th>
                  <th className="checking-result table-head note">
                    note
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  resultData?.safe_gold
                  && resultData?.safe_gold.map((data: StoreFrontGold, index: number) => (
                    <tr
                      className={`checking-result table-row ${index % 2 === 0 ? 'even' : 'odd'}`}
                      key={data.gold_inventory.gold_inventory_id}
                    >
                      <td className="checking-result table-body picture">
                        <img src={data.gold_detail.picture} alt={data.gold_detail.code} />
                      </td>
                      <td className="checking-result table-body code">
                        {data.gold_detail.code}
                      </td>
                      <td className="checking-result table-body type">
                        {data.gold_detail.type}
                      </td>
                      <td className="checking-result table-body detail">
                        {data.gold_detail.detail}
                      </td>
                      <td className="checking-result table-body weight">
                        {data.gold_detail.weight}
                      </td>
                      <td className="checking-result table-body gold-percent">
                        {data.gold_detail.gold_percent}
                      </td>
                      <td className="checking-result table-body gold-smith-fee">
                        {data.gold_detail.gold_smith_fee}
                      </td>
                      <td className="checking-result table-body note">
                        {data.gold_inventory.note}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
