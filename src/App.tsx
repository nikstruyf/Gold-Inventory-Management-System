import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoadingProvider } from './contexts/LoadingContext';
import { ConfirmProvider } from './contexts/ConfirmContext';
import { AlertProvider } from './contexts/AlertContext';
import { SideNavWidthProvider } from './contexts/SideNavWidthContext';

import AlertMessage from './components/alertmessage/AlertMessage';

import HomePage from './pages/homepage/HomePage';
import SignInPage from './pages/signin/SignInPage';
import Layout from './components/layout/Layout';
import InventoryPage from './pages/inventory/InventoryPage';
import AddGoodsPage from './pages/addgoodspage/AddGoodsPage';
import EditGoodsPage from './pages/editgoodspage/EditGoodsPage';
import CheckingPage from './pages/diarychecking/CheckingPage';
import TransactionPage from './pages/transaction/TransactionPage';
import BuyTransactionPage from './pages/buytransactionpage/BuyTransactionPage';
import SellTransactionPage from './pages/selltransactionpage/SellTransactionPage';
import TradeTransactionPage from './pages/tradetransactionpage/TradeTransactionPage';
import PdfBillViewer from './pages/pdfviewer/PdfViewerBill';
import ReportPage from './pages/reportpage/ReportPage';
import PdfViewer from './pages/pdfviewer/PdfViewer';
import OrganizationPage from './pages/organizationpage/OrganizationPage';
import ShowAllUser from './components/showusercard/ShowAllUser';
import RegisterContainer from './components/registercontainer/RegisterContainer';
import EmployeePage from './pages/employeepage/EmployeePage';

function App() {
  return (
    <LoadingProvider>
      <AlertProvider>
        <ConfirmProvider>
          <AlertMessage />
          <SideNavWidthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route element={<Layout />}>
                  <Route path="/inventory" element={<InventoryPage />} />
                  <Route path="/inventory/addgoods" element={<AddGoodsPage />} />
                  <Route path="/inventory/editgoods" element={<EditGoodsPage />} />
                  <Route path="/checking" element={<CheckingPage />} />
                  <Route path="/transaction" element={<TransactionPage />} />
                  <Route path="/transaction/buy" element={<BuyTransactionPage />} />
                  <Route path="/transaction/sell" element={<SellTransactionPage />} />
                  <Route path="/transaction/trade" element={<TradeTransactionPage />} />
                  <Route path="/report" element={<ReportPage />} />
                  <Route element={<OrganizationPage />}>
                    <Route path="/organization" element={<ShowAllUser />} />
                    <Route path="/organization/register" element={<RegisterContainer />} />
                  </Route>
                  <Route path="/employee" element={<EmployeePage />} />
                </Route>
                <Route path="/transaction/create-bill-pdf" element={<PdfBillViewer />} />
                <Route path="/report/create-report-pdf" element={<PdfViewer />} />
              </Routes>
            </Router>
          </SideNavWidthProvider>
        </ConfirmProvider>
      </AlertProvider>
    </LoadingProvider>
  );
}

export default App;
