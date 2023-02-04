import React, { useState, useEffect } from 'react';
import './readserialnumbermodal.css';
import { useCookies } from 'react-cookie';

import SetSerialNumber from '../../functions/SetSerialNumber';

import { useLoading } from '../../contexts/LoadingContext';

export default function ReadSerialNumberModal(
  props: {
    inventoryId: number,
    active: boolean,
    action: string
  }
) {
  const { inventoryId, active, action }:
  { inventoryId: number, active: boolean, action: string } = props;

  const [cookies] = useCookies(['access-token']);

  const { setLoading } = useLoading();

  const [serialNumber, setSerialNumber] = useState<string>('');
  const [activeReadSerial, setActiveReadSerial] = useState<boolean>(false);
  const [focusReadSerialRef, setFocusReadSerialRef] = useState<boolean>(false);

  async function setSerial() {
    setLoading(true);
    if (inventoryId !== 0 && !Number.isNaN(serialNumber)) {
      if (action === 'set') {
        const setSerialRes = await SetSerialNumber(inventoryId, Number(serialNumber), cookies['access-token']);
        if (setSerialRes === 'complete') {
          setActiveReadSerial(false);
          setSerialNumber('');
        }
      } else {
        alert('');
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if (inventoryId !== 0) {
      setActiveReadSerial(true);
    }
  }, [inventoryId, active]);

  return (
    <div className={`modal-bg read-serial-addnew ${activeReadSerial ? 'active' : ''}`}>
      <div className={`page-content read-serial-addnew ${activeReadSerial ? 'active' : ''}`}>
        <div className="page-content-header">
          scan RFID tag
        </div>
        <div
          className={`
              notice focus-read-serial
              ${focusReadSerialRef ? '' : 'active'}
            `}
        >
          click on input box
        </div>
        <input
          className="inputbox read-serial"
          type="text"
          maxLength={10}
          value={serialNumber}
          onChange={(e) => { setSerialNumber(e.target.value); }}
          onFocus={() => { setFocusReadSerialRef(true); }}
          onBlur={() => { setFocusReadSerialRef(false); }}
        />
        <div className="read-serial button-group">
          <button
            className="button-confirm"
            type="button"
            disabled={serialNumber === ''}
            onClick={() => { setSerial(); }}
          >
            done
          </button>
          <button
            className="button-cancel"
            type="button"
            onClick={() => {
              setSerialNumber('');
              setActiveReadSerial(false);
            }}
          >
            cancle
          </button>
        </div>
      </div>
    </div>
  );
}
