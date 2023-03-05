import React, { useState, useEffect } from 'react';
import './transactioncard.css';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';

import { TransactionDataJoinGold } from '../../interfaces/TransactionData';

import { SplitDateAndTime, ConvertDateForDisplay } from '../../functions/ConvertDateAndTimeForDisplay';
import { ConvertWeight } from '../../functions/ConvertWeight';

export default function TransactionCard(
  props: {
    data: TransactionDataJoinGold | undefined | undefined,
    active: boolean
  }
) {
  const { data, active }: {data: TransactionDataJoinGold | undefined, active: boolean} = props;

  const [activate, isActivate] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      isActivate(true);
    }
  }, [data, active]);

  return (
    <div className={`transaction-card-bg ${activate ? 'active' : ''}`}>
      <div className="transaction-card page-content">
        <div className="card-content-left">
          <div className="transaction-icon">
            <ReceiptLongIcon sx={{ fontSize: 90 }} />
          </div>
          <div className="transaction-type">
            {data?.transaction.transaction_type}
          </div>
          <div className="transaction-value">
            {`
              ฿ ${data && Math.abs(data?.transaction.price)}
            `}
          </div>
          <div className="transaction-date">
            <div className="transaction-time">
              {SplitDateAndTime(data ? data.transaction.date : '').split(' ')[0]}
            </div>
            {`
              ${ConvertDateForDisplay(data ? data.transaction.date : '')[0]} 
              ${ConvertDateForDisplay(data ? data.transaction.date : '')[1]} 
              ${ConvertDateForDisplay(data ? data.transaction.date : '')[2]}
            `}
          </div>
        </div>
        <div className="card-content-right">
          <div className="transaction-card page-content-header">
            <div>
              transaction details
            </div>
            <CloseIcon
              className="button-close"
              sx={{ fontSize: 24 }}
              onClick={() => { isActivate(false); }}
            />
          </div>
          <div className="transaction-card transaction-amount">
            <div
              className={`
                value-amount sell
                ${data?.transaction.transaction_type === 'buy'
                ? 'hide' : ''
                }
              `}
            >
              <div className="amount-head">sell amount</div>
              <div>
                {`
                  ฿ ${data?.transaction.transaction_type === 'change'
                  ? data?.transaction.sell_price
                  : data?.transaction.price
                  }
                `}
              </div>
            </div>
            <div
              className={`
                value-amount buy
                ${data?.transaction.transaction_type === 'sell'
                ? 'hide' : ''
                }
              `}
            >
              <div className="amount-head">buy amount</div>
              <div>
                {`
                  ฿ ${data?.transaction.transaction_type === 'change'
                  ? data?.transaction.buy_price
                  : data?.transaction.price
                  }
                `}
              </div>
            </div>
            <div className="value-amount total">
              <div className="amount-head">total amount</div>
              <div>
                {`
                  ฿ ${data && Math.abs(data?.transaction.price)}
                `}
              </div>
            </div>
          </div>
          <div className="transaction-card transaction-detail">
            <div className="detail">
              <div className="datail-head">gold price:</div>
              <div className="detail-value">{data?.transaction.gold_price}</div>
            </div>
            <div className="detail">
              <div className="datail-head">weight:</div>
              <div className="detail-value">
                {data?.transaction.transaction_type === 'change' && `${data?.gold_detail.weight}g / 
                ${ConvertWeight(data ? data?.gold_detail.weight : 0, 'gram')}Baht change to  `}
                {`${data?.transaction.weight}g / 
                ${ConvertWeight(data ? data?.transaction.weight : 0, 'gram')}Baht`}
              </div>
            </div>
            <div className="detail">
              <div className="datail-head">code:</div>
              <div className="detail-value">{data?.gold_detail.code}</div>
            </div>
            <div className="detail">
              <div className="datail-head">create by:</div>
              <div className="detail-value">{data?.transaction.username}</div>
            </div>
            <div className="detail">
              <div className="datail-head">transaction ID:</div>
              <div className="detail-value">{data?.transaction.transaction_id}</div>
            </div>
            <div className="detail">
              <div className="datail-head">note:</div>
              <div className="detail-value">{data?.transaction.note}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
