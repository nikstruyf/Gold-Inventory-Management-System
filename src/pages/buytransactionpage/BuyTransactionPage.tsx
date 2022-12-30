import React, { useState } from 'react';
import './buytransactionpage.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useLoading } from '../../contexts/LoadingContext';

import { CheckWeight } from '../../functions/ConvertWeight';
import { BuyTransaction } from '../../functions/CreateTransaction';

export default function BuyTransactionPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access-token']);

  const { setLoading } = useLoading();

  const [goldPriceStart, setGoldPriceStart] = useState<number>(0);
  const [goldPriceEnd, setGoldPriceEnd] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [note, setNote] = useState<string>('');

  const [weightUnit, setWeightUnit] = useState<string>('gram');

  const [submit, isSubmit] = useState<boolean>(false);

  function CheckFillAll() {
    if (
      goldPriceStart === 0
      || goldPriceEnd === 0
      || weight === 0
      || price === 0
    ) {
      return false;
    }
    return true;
  }

  const buy = async (e: any) => {
    e.preventDefault();
    isSubmit(true);
    if (CheckFillAll()) {
      setLoading(true);
      const buyResult = await BuyTransaction(
        `${goldPriceStart} - ${goldPriceEnd}`,
        CheckWeight(weight, weightUnit),
        price,
        note,
        cookies['access-token']
      );
      if (buyResult === 'complete') {
        navigate('/transaction');
      }
      setLoading(false);
    }
  };

  return (
    <div className="buy-transaction page-background">
      {/* Page Header */}
      <div className="buy-transaction page-header">
        buy
      </div>
      {/* Page Content */}
      <div className="buy-transaction page-container">
        <div className="buy-transaction page-content">
          {/* Content Header */}
          <div className="buy-transaction page-content-header">
            transaction detail
          </div>
          {/* Form Buy Transaction */}
          <form onSubmit={buy}>
            {/* Input Gold Price */}
            <div className="input-comp">
              <div className="input-label">
                gold price
                <span
                  className={`
                    important-mark
                    ${CheckFillAll()
                      || goldPriceStart !== 0
                      || goldPriceEnd !== 0
                    ? '' : 'show'
                    }
                  `}
                >
                  *
                </span>
              </div>
              <div className="gold-price">
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
            {/* Input Weight */}
            <div className="input-comp">
              <div className="input-label">
                weight
                <span className={`important-mark ${CheckFillAll() || weight !== 0 ? '' : 'show'}`}>
                  *
                </span>
              </div>
              <div className="buy-transaction input-weight">
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
                price
                <span className={`important-mark ${CheckFillAll() || price !== 0 ? '' : 'show'}`}>
                  *
                </span>
              </div>
              <input
                type="number"
                step="0.001"
                className="inputbox"
                onChange={(e) => { setPrice(e.target.valueAsNumber); }}
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
            {/* Alert Fill All */}
            <div className={`invalid-fillall-message ${CheckFillAll() || !submit ? '' : 'show'}`}>
              please fill all details
            </div>
            {/* Confirm Button */}
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
