import React from 'react';
import './confirmmessage.css';

import { useConfirm } from '../../contexts/ConfirmContext';

export default function ConfirmMessage() {
  const { confirm, setConfirm } = useConfirm();

  const confirmClick = () => {
    setConfirm({
      active: false,
      message: '',
      action: confirm.action,
      status: 'confirm'
    });
  };

  const cancelClick = () => {
    setConfirm({
      active: false,
      message: '',
      action: '',
      status: 'cancel'
    });
  };

  return (
    <div className={`modal-bg confirm-message-bg ${confirm.active ? 'active' : ''}`}>
      <div className={`confirm-message page-content ${confirm.active ? 'active' : ''}`}>
        <div className="confirm-message message">
          {confirm.message}
        </div>
        <div className="confirm-message button">
          <button
            type="button"
            className="button-confirm"
            onClick={confirmClick}
          >
            confirm
          </button>
          <button
            type="button"
            className="button-cancel"
            onClick={cancelClick}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
