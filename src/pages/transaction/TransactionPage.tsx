import React from 'react';
import './transactionpage.css';

import { useLoading } from '../../contexts/LoadingContext';

function TransactionPage() {
  const { loading, setLoading } = useLoading();

  function handleclick() {
    setLoading(!loading);
  }

  return (
    <div className="background">
      transaction
      <button type="button" onClick={() => { handleclick(); }}>
        click me!
      </button>
    </div>
  );
}

export default TransactionPage;
