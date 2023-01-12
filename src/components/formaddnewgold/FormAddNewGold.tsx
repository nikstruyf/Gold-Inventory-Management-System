import React, { useState, useEffect, useRef } from 'react';
import './formaddnewgold.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import ImageIcon from '@mui/icons-material/Image';

import { useLoading } from '../../contexts/LoadingContext';
import { useConfirm } from '../../contexts/ConfirmContext';

import { AddNewGold } from '../../functions/AddGold';
import { CheckWeight } from '../../functions/ConvertWeight';

export default function FormAddNewGold() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access-token']);

  const { setLoading } = useLoading();
  const { confirm, setConfirm } = useConfirm();

  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [goldPercent, setGoldPercent] = useState<number>(0);
  const [goldSmithFee, setGoldSmithFee] = useState<number>(0);
  const [picture, setPicture] = useState();
  const [note, setNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  const [unit, setWeightUnit] = useState<string>('gram');
  const [previewPic, setPreviewPic] = useState<string>();
  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [submit, isSubmit] = useState<boolean>(false);

  function CheckFillAll() {
    if (code === ''
      || type === ''
      || detail === ''
      || weight === 0
      || goldPercent === 0
      || goldSmithFee === 0
      // || !picture
      || quantity === 0
    ) {
      return false;
    }
    return true;
  }

  const save = (e: any) => {
    e.preventDefault();
    isSubmit(true);
    if (CheckFillAll()) {
      setConfirm({
        active: true,
        message: 'confirm save ?',
        action: 'addnewgold',
        status: ''
      });
    }
  };

  async function PutData() {
    setLoading(true);
    const addResult = await AddNewGold(
      code,
      type,
      detail,
      CheckWeight(weight, unit),
      goldPercent,
      goldSmithFee,
      // picture,
      '',
      note,
      quantity,
      cookies['access-token']
    );
    if (addResult === 'complete') {
      navigate('/inventory');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (confirm.status === 'confirm' && confirm.action === 'addnewgold') {
      PutData();
      setConfirm({
        active: false,
        message: '',
        action: '',
        status: ''
      });
    }
  }, [confirm.status]);

  const resetState = () => {
    setPicture(undefined);
    setPreviewPic(undefined);
    setCode('');
    setType('');
    setDetail('');
    setWeight(0);
    setGoldPercent(0);
    setGoldSmithFee(0);
    setNote('');
    setQuantity(0);
  };

  useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result as string);
      };
      reader.readAsDataURL(picture);
    } else {
      setPreviewPic(undefined);
    }
  }, [picture]);

  return (
    <div className="addgood-new">
      <div className="addgood-form-notice">
        <span>notice : </span>
        add new gold
      </div>
      {/* Form */}
      <form onSubmit={save}>
        {/* Code */}
        <div className="label input-code">
          <span>code</span>
          <input
            type="text"
            className="inputbox input-code"
            onChange={(e) => { setCode(e.target.value); }}
          />
          <div className={`important-mark ${CheckFillAll() || code !== '' ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Type */}
        <div className="label input-type">
          <span>type</span>
          <div className="select-type">
            <select
              onChange={(e) => { setType(e.target.value); }}
            >
              <option value="" hidden>select . . .</option>
              <option value="Necklace">necklace</option>
              <option value="Bracelet">bracelet</option>
              <option value="Ring">ring</option>
              <option value="Pendant">pendant</option>
              <option value="Earring">earring</option>
              <option value="Bangle">bangle</option>
            </select>
            <span className="custom-arrow" />
          </div>
          <div className={`important-mark ${CheckFillAll() || type !== '' ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Detail */}
        <div className="label input-detail">
          <span>detail</span>
          <input
            type="text"
            className="inputbox input-detail"
            onChange={(e) => { setDetail(e.target.value); }}
          />
          <div className={`important-mark ${CheckFillAll() || detail !== '' ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Weight */}
        <div className="label input-weight">
          <span>weight</span>
          <input
            type="number"
            step="0.00000001"
            className="inputbox weight-value"
            onChange={(e) => { setWeight(e.target.valueAsNumber); }}
          />
          <div className="label input-weightUnit">
            <span>unit</span>
            <div className="select-weightUnit">
              <select
                onChange={(e) => { setWeightUnit(e.target.value); }}
              >
                <option value="gram">gram</option>
                <option value="baht">baht</option>
              </select>
              <span className="custom-arrow" />
            </div>
          </div>
          <div className={`important-mark ${CheckFillAll() || weight !== 0 ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Gold Percent */}
        <div className="label input-goldPercent">
          <span>gold percent</span>
          <input
            type="number"
            step="0.0001"
            className="inputbox input-goldPercent"
            onChange={(e) => { setGoldPercent(e.target.valueAsNumber); }}
          />
          <div className={`important-mark ${CheckFillAll() || goldPercent !== 0 ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Gold Smith Fee */}
        <div className="label input-goldSmithFee">
          <span>gold smith fee</span>
          <input
            type="number"
            step="0.0001"
            className="inputbox input-goldSmithFee"
            onChange={(e) => { setGoldSmithFee(e.target.valueAsNumber); }}
          />
          <div className={`important-mark ${CheckFillAll() || goldSmithFee !== 0 ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Picture */}
        <div className="label input-picture">
          <span>picture</span>
          <div
            className="input-picture-container"
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current.click();
            }}
            onKeyDown={() => {}}
          >
            {previewPic ? (
              <img src={previewPic} alt="" className="select-picture" />
            ) : (
              <div className="input-picture-empty">
                <ImageIcon sx={{ fontSize: 60 }} />
                <span>select file</span>
              </div>
            )}
          </div>
          <input
            type="file"
            className="input-picture-file"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e: any) => {
              if (e.target.files[0]) {
                setPicture(e.target.files[0]);
              } else {
                setPicture(undefined);
              }
            }}
          />
          <div className={`important-mark ${CheckFillAll() || picture ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Other Detail */}
        <div className="label input-otherDetail">
          <span>note</span>
          <textarea
            rows={4}
            className="inputbox input-otherDetail"
            onChange={(e) => { setNote(e.target.value); }}
          />
        </div>
        {/* Quantity */}
        <div className="label input-quantity">
          <span>quantity</span>
          <input
            type="number"
            className="inputbox input-quantity"
            onChange={(e) => { setQuantity(e.target.valueAsNumber); }}
          />
          <div className={`important-mark ${CheckFillAll() || quantity !== 0 ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Fill All Message */}
        <div className={`label invalid-fillall-message ${CheckFillAll() || !submit ? '' : 'show'}`}>
          <span />
          plaese fill all details
        </div>
        {/* Button */}
        <div className="label input-button button">
          <span />
          <input
            className="button-save"
            type="submit"
            value="save"
          />
          <input
            className="button-reset"
            type="reset"
            value="reset"
            onClick={resetState}
          />
        </div>
      </form>
    </div>
  );
}
