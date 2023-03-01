import React, { useState, useEffect } from 'react';
import './transactionpage.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import TransactionTable from '../../components/transactiontable/TransactionTable';

import { useAlert } from '../../contexts/AlertContext';

import { GetAllTransactionJoinGold } from '../../functions/GetData';

import { TransactionDataJoinGold } from '../../interfaces/TransactionData';

function TransactionPage() {
  const [cookies] = useCookies(['access-token']);

  const { setAlert } = useAlert();

  const [allTransactionDetail, setAllTransactionDetail] = useState<TransactionDataJoinGold[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const current = new Date();
  const currentDate = `${
    current.getFullYear()
  }-${
    String(current.getMonth() + 1).padStart(2, '0')
  }-${
    String(current.getDate()).padStart(2, '0')
  }`;

  useEffect(() => {
    GetAllTransactionJoinGold(cookies['access-token']).then((res) => {
      setAllTransactionDetail(res.data);
    }).catch(() => {
      setAlert({
        active: true,
        message: 'Error! can not get data'
      });
    });
  }, []);

  return (
    <div className="transaction page-background">
      {/* -- Header -- */}
      <div className="page-header">
        transaction
      </div>
      {/* -- Container -- */}
      <div className="page-container">
        {/* -- Page Option -- */}
        <div className="transaction-page-option">
          {/* -- Status Filter -- */}
          <div className="option-filter">
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
              <label htmlFor="radio-sell" className="radio-label">
                <input
                  type="radio"
                  id="radio-sell"
                  name="radio"
                  onClick={() => { setFilterStatus('sell'); }}
                />
                <span className="radio-ckeckbox" />
                <span>sell</span>
              </label>
              <label htmlFor="radio-buy" className="radio-label">
                <input
                  type="radio"
                  id="radio-buy"
                  name="radio"
                  onClick={() => { setFilterStatus('buy'); }}
                />
                <span className="radio-ckeckbox" />
                <span>buy</span>
              </label>
              <label htmlFor="radio-trade" className="radio-label">
                <input
                  type="radio"
                  id="radio-trade"
                  name="radio"
                  onClick={() => { setFilterStatus('change'); }}
                />
                <span className="radio-ckeckbox" />
                <span>change</span>
              </label>
            </div>
            <div className="option-vertical-line" />
            {/* -- Time Filter -- */}
            <div className="option-daterange">
              <input
                type="date"
                max={endDate || currentDate}
                onChange={(e) => { setStartDate(e.target.value); }}
              />
              <div>to</div>
              <input
                type="date"
                min={startDate}
                max={currentDate}
                onChange={(e) => { setEndDate(e.target.value); }}
              />
            </div>
          </div>
          {/* -- Create Transaction -- */}
          <div className="create-transaction">
            {/* -- Buy Transaction -- */}
            <Link
              to="/transaction/buy"
              className="go-to-create"
            >
              <div>buy</div>
            </Link>
            {/* -- Sell Transaction -- */}
            <Link
              to="/transaction/sell"
              className="go-to-create"
            >
              <div>sell</div>
            </Link>
            {/* -- Trade Transaction -- */}
            <Link
              to="/transaction/trade"
              className="go-to-create"
            >
              <div>change</div>
            </Link>
          </div>
        </div>
        {/* -- Transaction Table -- */}
        <div className="transaction-page-table">
          <TransactionTable
            transactionData={allTransactionDetail}
            status={filterStatus}
            time={`${startDate} ${endDate}`}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
