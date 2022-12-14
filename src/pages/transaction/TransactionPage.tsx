import React, { useContext } from 'react';
import './transactionpage.css';

import { LoadingContext, useLoading } from '../../contexts/LoadingContext';

function TransactionPage() {
  const { loading, setLoading } = useLoading();

  return (
    <div className="background">
      transaction
    </div>
  );
}

export default TransactionPage;
