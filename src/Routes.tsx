import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/inventory/InventoryPage';
import TransactionPage from './pages/transaction/TransactionPage';

function RoutesPath() {
  return (
    <Routes>
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/transaction" element={<TransactionPage />} />
    </Routes>
  );
}

export default RoutesPath;
