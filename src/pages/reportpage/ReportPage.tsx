import React, { useState, useEffect } from 'react';
import './reportpage.css';
import { useCookies } from 'react-cookie';

import { useAlert } from '../../contexts/AlertContext';

import DoughnutChartSoldType from '../../components/chart/DoughnutChartSoldType';

import { GetTransactionDashboard } from '../../functions/GetData';

import { TransactionDashboard } from '../../interfaces/TransactionData';

function ReportPage() {
  const { setAlert } = useAlert();
  const [cookies] = useCookies(['access-token']);

  const [data, setData] = useState<TransactionDashboard>({
    buy_price: 0,
    buy_transaction: [],
    change_income_price: 0,
    change_outcome_price: 0,
    change_transaction: [],
    gold_type_count: {
      Necklace: 0,
      Bracelet: 0,
      Ring: 0,
      Pendant: 0,
      Earring: 0,
      Bangle: 0,
    },
    income_price: 0,
    outcome_price: 0,
    sell_price: 0,
    sell_transaction: [],
    total_change_price: 0,
    total_price: 0,
    weight_count: {},
    user_count: {}
  });
  const [dataToday, setDataToday] = useState<TransactionDashboard>({
    buy_price: 0,
    buy_transaction: [],
    change_income_price: 0,
    change_outcome_price: 0,
    change_transaction: [],
    gold_type_count: {
      Necklace: 0,
      Bracelet: 0,
      Ring: 0,
      Pendant: 0,
      Earring: 0,
      Bangle: 0,
    },
    income_price: 0,
    outcome_price: 0,
    sell_price: 0,
    sell_transaction: [],
    total_change_price: 0,
    total_price: 0,
    weight_count: {},
    user_count: {}
  });

  const current = new Date();
  const currentDate = `${
    current.getFullYear()
  }-${
    String(current.getMonth() + 1).padStart(2, '0')
  }-${
    String(current.getDate()).padStart(2, '0')
  }`;

  const [startDate, setStartDate] = useState<string>(currentDate);
  const [endDate, setEndDate] = useState<string>(currentDate);

  useEffect(() => {
    GetTransactionDashboard(
      startDate,
      endDate,
      cookies['access-token']
    ).then((res) => {
      setData(res.data);
    }).catch(() => {
      setAlert({
        active: true,
        message: 'Error! can not get data'
      });
    });
  }, [startDate, endDate]);

  useEffect(() => {
    GetTransactionDashboard(
      currentDate,
      currentDate,
      cookies['access-token']
    ).then((res) => {
      setDataToday(res.data);
    }).catch(() => {
      setAlert({
        active: true,
        message: 'Error! can not get data'
      });
    });
  }, []);

  return (
    <div className="report-page page-background">
      {/* -- Header -- */}
      <div className="page-header">
        report
      </div>
      {/* -- Create PDF Document Button -- */}
      <div className="container-create-pdf-button">
        <div className="option-daterange">
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => { setStartDate(e.target.value); }}
          />
          <div>to</div>
          <input
            type="date"
            value={endDate}
            min={startDate}
            max={currentDate}
            onChange={(e) => { setEndDate(e.target.value); }}
          />
        </div>
        <button
          className="create-pdf-button"
          type="button"
          onClick={() => window.open(`/report/create-report-pdf?from=${startDate}&to=${endDate}`, '_blank')}
        >
          Create Report.pdf
        </button>
      </div>
      {/* -- Container Inventory -- */}
      <div className="report-page page-container">
        <div className="report-page page-flex">
          <div className="report-page page-content trans-stat">
            <div className="trans-stat header">
              transaction
            </div>
            <div className="trans-stat value">
              {
                (data.buy_transaction?.length || 0)
                + (data.sell_transaction?.length || 0)
                + (data.change_transaction?.length || 0)
              }
            </div>
            <div className="trans-stat today">
              <span className="today-value">
                {`
                   +${(data.buy_transaction?.length || 0)
                  + (data.sell_transaction?.length || 0)
                  + (data.change_transaction?.length || 0)} 
                `}
              </span>
              today
            </div>
          </div>
          <div className="report-page page-content trans-stat">
            <div className="trans-stat header">
              buy transaction
            </div>
            <div className="trans-stat value">
              {data.buy_transaction?.length || 0}
            </div>
            <div className="trans-stat today">
              <span className="today-value">
                {` +${dataToday.buy_transaction?.length || 0} `}
              </span>
              today
            </div>
          </div>
          <div className="report-page page-content trans-stat">
            <div className="trans-stat header">
              sell transaction
            </div>
            <div className="trans-stat value">
              {data.sell_transaction?.length || 0}
            </div>
            <div className="trans-stat today">
              <span className="today-value">
                {` +${dataToday.sell_transaction?.length || 0} `}
              </span>
              today
            </div>
          </div>
          <div className="report-page page-content trans-stat">
            <div className="trans-stat header">
              change transaction
            </div>
            <div className="trans-stat value">
              {data.change_transaction?.length || 0}
            </div>
            <div className="trans-stat today">
              <span className="today-value">
                {` +${dataToday.change_transaction?.length || 0} `}
              </span>
              today
            </div>
          </div>
        </div>
        <div className="report-page page-flex">
          <div className="report-page page-content trans-chart">
            <DoughnutChartSoldType chartData={data.gold_type_count} title="Gold Type Sell And Change " />
          </div>
          <div className="report-page page-content trans-chart">
            <DoughnutChartSoldType chartData={data.weight_count} title="Weight Sell And Change" />
          </div>
          <div className="report-page page-content trans-chart">
            <DoughnutChartSoldType chartData={data.user_count} title="User Create Sell And Change Transaction" />
          </div>
        </div>
        <div className="report-page page-flex">
          <div className="report-page page-content trans-value">
            <div className="trans-value header">
              sell transaction cost total
            </div>
            <div className="trans-value cost">
              <span className="value">
                {`฿ ${data.sell_price}`}
              </span>
              <span className="trans-value-today">
                <span className="today-value">
                  (
                  {`+฿ ${dataToday.sell_price}`}
                  )
                </span>
              </span>
            </div>
          </div>
          <div className="report-page page-content trans-value">
            <div className="trans-value header">
              buy transaction cost total
            </div>
            <div className="trans-value cost">
              <span className="value">
                {`฿ ${data.buy_price}`}
              </span>
              <span className="trans-value-today">
                <span className="today-value">
                  (
                  {`-฿ ${dataToday.buy_price}`}
                  )
                </span>
              </span>
            </div>
          </div>
          <div className="report-page page-content trans-value">
            <div className="trans-value header">
              change transaction cost total
            </div>
            <div className="trans-value cost">
              <span className="value">
                {`฿ ${data.change_income_price - data.change_outcome_price}`}
              </span>
              <span className="trans-value-today">
                <span className="today-value">
                  (
                  {`
                    ${dataToday.total_change_price < 0 ? '-' : '+'}
                    ฿ ${dataToday.total_change_price}
                  `}
                  )
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
