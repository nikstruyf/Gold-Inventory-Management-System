import React, { useState, useEffect } from 'react';
import './transactioncard.css';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';

import { TransactionDataType } from '../../interfaces/TransactionData';

export default function TransactionCard(
  props: {
    transaction: TransactionDataType
  }
) {
  const { transaction }: {transaction: TransactionDataType} = props;

  const [activate, isActivate] = useState<boolean>(false);

  useEffect(() => {
    if (transaction.transaction_type !== '') {
      isActivate(true);
    }
  }, [transaction]);

  return (
    <div className={`transaction-card-bg ${activate ? 'active' : ''}`}>
      <div className="transaction-card page-content">
        <div className="card-content-left">
          <ReceiptLongIcon sx={{ fontSize: 100 }} />
          <div className="transaction-type">
            change
          </div>
          <div className="transaction-value">
            +฿28600
          </div>
          <div className="transaction-date">
            14 Nov 2022
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
            <div className="value-amount sell">
              <div className="amount-head">sell amount</div>
              <div>+฿28600</div>
            </div>
            <div className="value-amount buy">
              <div className="amount-head">buy amount</div>
              <div>-฿28600</div>
            </div>
            <div className="value-amount total">
              <div className="amount-head">total amount</div>
              <div>+฿28600</div>
            </div>
          </div>
          <div className="transaction-card transaction-detail">
            <div className="detail">
              <div className="datail-head">gold price:</div>
              <div className="detail-value">29950 - 29850</div>
            </div>
            <div className="detail">
              <div className="datail-head">weight:</div>
              <div className="detail-value">15.2g / 1Baht</div>
            </div>
            <div className="detail">
              <div className="datail-head">code:</div>
              <div className="detail-value">BR2B025L1</div>
            </div>
            <div className="detail">
              <div className="datail-head">create by:</div>
              <div className="detail-value">palm</div>
            </div>
            <div className="detail">
              <div className="datail-head">transaction ID:</div>
              <div className="detail-value">3060951210</div>
            </div>
            <div className="detail">
              <div className="datail-head">note:</div>
              <div className="detail-value">สร้อยแขนทาโร่ขั้นปล้อง</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
