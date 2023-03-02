import React, { useState, useEffect } from 'react';
import './pdfviewer.css';
import { PDFViewer } from '@react-pdf/renderer';
import { useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import PdfDocument from '../../components/pdfdocument/PdfDocument';

import { GetTransactionDashboard } from '../../functions/GetData';

import { TransactionDashboard } from '../../interfaces/TransactionData';

export default function PdfViewer() {
  const [cookies] = useCookies(['access-token']);
  const [searchParams] = useSearchParams();

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

  useEffect(() => {
    GetTransactionDashboard(
      searchParams.get('from'),
      searchParams.get('to'),
      cookies['access-token']
    ).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <PDFViewer className="page-background pdf-view">
      <PdfDocument data={data} from={searchParams.get('from')} to={searchParams.get('to')} />
    </PDFViewer>
  );
}
