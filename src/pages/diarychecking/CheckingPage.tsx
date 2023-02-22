import React, { useState } from 'react';
import './checkingpage.css';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PanoramaFishEyeRoundedIcon from '@mui/icons-material/PanoramaFishEyeRounded';

import { ConvertWeight } from '../../functions/ConvertWeight';

export default function CheckingPage() {
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [focusReadSerialRef, setFocusReadSerialRef] = useState<boolean>(false);

  const [inputSerial, setInputSerial] = useState<string>('');
  const [itemChecked, setItemChecked] = useState<number[]>([]);

  const [weightUnit, setWeightUnit] = useState<string>('gram');

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
    console.log(inputSerial, itemChecked);
  };

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
              onClick={() => {}}
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
        {/* -- Checking Table -- */}
        <div className="checking-table page-content">
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
              <tr className={`checking-table row-body ${itemChecked.includes(0) ? 'checked' : ''}`}>
                <td className="checking-table body-icon">
                  {
                    itemChecked.includes(0)
                      ? <CheckCircleRoundedIcon sx={{ fontSize: 24, color: '#B93030' }} />
                      : <PanoramaFishEyeRoundedIcon sx={{ fontSize: 24 }} />
                  }
                </td>
                <td className="checking-table body-id">
                  ID
                </td>
                <td className="checking-table body-code">
                  code
                </td>
                <td className="checking-table body-type">
                  type
                </td>
                <td className="checking-table body-detail">
                  detail
                </td>
                <td className="checking-table body-weight">
                  {weightUnit === 'Baht' ? ConvertWeight(15.2, 'gram') : 15.2}
                </td>
                <td className="checking-table body-gold-percent">
                  0
                </td>
                <td className="checking-table body-gold-smith-fee">
                  0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
