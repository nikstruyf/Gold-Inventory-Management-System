import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/homepage/HomePage';
import SignInPage from './pages/signin/SignInPage';
import Layout from './components/layout/Layout';
import InventoryPage from './pages/inventory/InventoryPage';
import AddGoodsPage from './pages/addgoodspage/AddGoodsPage';
import TransactionPage from './pages/transaction/TransactionPage';
import OrganizationPage from './pages/organizationpage/OrganizationPage';
import EmployeePage from './pages/employeepage/EmployeePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route element={<Layout />}>
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/addgoods" element={<AddGoodsPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/organization" element={<OrganizationPage />} />
          <Route path="/employee" element={<EmployeePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
