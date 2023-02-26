import React from 'react';
import './pdfviewer.css';
import { PDFViewer } from '@react-pdf/renderer';

import PdfDocument from '../../components/pdfdocument/PdfDocument';

export default function PdfViewer() {
  return (
    <PDFViewer className="page-background pdf-view">
      <PdfDocument />
    </PDFViewer>
  );
}
