import React, { useState, useEffect } from 'react';
import './pdfviewer.css';
import { PDFViewer } from '@react-pdf/renderer';
import { useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import PdfBillDocument from '../../components/pdfdocument/PdfBillDocument';

import { GetTransactionDashboard } from '../../functions/GetData';

import { TransactionDashboard } from '../../interfaces/TransactionData';

export default function PdfViewer() {
  const [cookies] = useCookies(['access-token']);
  const [searchParams] = useSearchParams();

  const [data, setData] = useState<TransactionDashboard>();

  useEffect(() => {
    GetTransactionDashboard(
      searchParams.get('from'),
      searchParams.get('to'),
      cookies['access-token']
    ).then((res) => {
      setData(res.data);
    });
  }, []);

  console.log(data);

  return (
    <PDFViewer className="page-background pdf-view">
      <PdfBillDocument />
    </PDFViewer>
  );
}
