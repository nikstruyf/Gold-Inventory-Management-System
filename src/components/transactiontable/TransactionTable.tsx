import React, { useState } from 'react';
import './transactiontable.css';

import { TransactionDataJoinGold, TransactionDataType } from '../../interfaces/TransactionData';

import { ConvertWeight } from '../../functions/ConvertWeight';
import { SplitDateAndTime, ConvertDateForDisplay } from '../../functions/ConvertDateAndTimeForDisplay';

import TransactionCard from '../transactioncard/TransactionCard';

export default function TransactionTable(
  props: {
    transactionData: TransactionDataJoinGold[],
    status: string,
    time: string
  }
) {
  const {
    transactionData,
    status,
    time
  }: {
      transactionData: TransactionDataJoinGold[],
      status: string,
      time: string
    } = props;

  const [weightUnit, setWeightUnit] = useState<string>('gram');

  const [
    transactionSelect,
    setTransactionSelect
  ] = useState<TransactionDataType>({
    transaction_id: 0,
    transaction_type: '',
    date: '',
    gold_price: '',
    weight: 0,
    price: 0,
    gold_detail_id: 0,
    gold_inventory_id: 0,
    username: '',
    buy_price: 0,
    sell_price: 0,
    note: ''
  });

  function ConvertWeightUnit() {
    if (weightUnit === 'gram') {
      setWeightUnit('Baht');
    } else {
      setWeightUnit('gram');
    }
  }

  console.log(`${ConvertDateForDisplay('2022-11-14T14:32:46.277239+07:00')} ${time}`);

  return (
    <div className="transaction table-main">
      <TransactionCard transaction={transactionSelect} />
      <table>
        {/* -- Table Header -- */}
        <thead>
          <tr className="transaction row-header">
            <th className="head-date">
              date
            </th>
            <th className="head-code">
              code
            </th>
            <th className="head-transtype">
              transaction type
            </th>
            <th className="head-note">
              note
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
            <th className="head-price">
              price
            </th>
          </tr>
        </thead>
        {/* -- Table Body -- */}
        <tbody>
          {
            transactionData
              ?.filter((el: TransactionDataJoinGold) => (
                status === 'all'
                  ? el
                  : el.transaction.transaction_type === status
              ))
              .map((data: TransactionDataJoinGold) => (
                <React.Fragment key={data.transaction.transaction_id}>
                  <tr
                    className="transaction row-body"
                    onClick={() => { setTransactionSelect(data.transaction); }}
                  >
                    <td className="body-date">
                      {SplitDateAndTime(data.transaction.date)}
                    </td>
                    <td className="body-code">
                      {data.gold_detail.code}
                    </td>
                    <td className="body-transtype">
                      {data.transaction.transaction_type}
                    </td>
                    <td className="body-note">
                      {data.transaction.note}
                    </td>
                    <td className="body-weight">
                      {
                        weightUnit === 'Baht'
                          ? ConvertWeight(data.gold_detail.weight, 'gram')
                          : data.gold_detail.weight
                      }
                    </td>
                    <td className="body-price">
                      {data.transaction.price}
                    </td>
                  </tr>
                </React.Fragment>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
