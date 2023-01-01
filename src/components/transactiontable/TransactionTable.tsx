import React, { useState } from 'react';
import './transactiontable.css';

import { TransactionDataJoinGold } from '../../interfaces/TransactionData';

import { ConvertWeight } from '../../functions/ConvertWeight';
import { ConvertDateForDisplay } from '../../functions/ConvertDateAndTimeForDisplay';

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

  const [activateCard, setActivateCard] = useState<boolean>(false);

  const [
    transactionSelect,
    setTransactionSelect
  ] = useState<TransactionDataJoinGold>();

  function ConvertWeightUnit() {
    if (weightUnit === 'gram') {
      setWeightUnit('Baht');
    } else {
      setWeightUnit('gram');
    }
  }

  console.log(time);

  return (
    <div className="transaction table-main">
      <TransactionCard data={transactionSelect} active={activateCard} />
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
                    onClick={() => {
                      setTransactionSelect(data);
                      setActivateCard(!activateCard);
                    }}
                  >
                    <td className="body-date">
                      <div>
                        {ConvertDateForDisplay(data.transaction.date)[0]}
                      </div>
                      <div>
                        {ConvertDateForDisplay(data.transaction.date)[1]}
                      </div>
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
