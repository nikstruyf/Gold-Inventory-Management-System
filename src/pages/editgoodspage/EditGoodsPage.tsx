import React, { useState, useEffect, useRef } from 'react';
import './editgoodspage.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import ImageIcon from '@mui/icons-material/Image';

import { useLoading } from '../../contexts/LoadingContext';

import { CheckWeight } from '../../functions/ConvertWeight';
import EditGold from '../../functions/EditGold';

export default function EditGoodsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(['access-token']);

  const { setLoading } = useLoading();

  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [goldPercent, setGoldPercent] = useState<number>(0);
  const [goldSmithFee, setGoldSmithFee] = useState<number>(0);
  const [picture, setPicture] = useState();
  const [note, setNote] = useState<string>('');

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
    ) {
      return false;
    }
    return true;
  }

  const save = async (e: any) => {
    e.preventDefault();
    isSubmit(true);
    if (CheckFillAll()) {
      setLoading(true);
      const addResult = await EditGold(
        code,
        type,
        detail,
        CheckWeight(weight, unit),
        goldPercent,
        goldSmithFee,
        // picture,
        '',
        note,
        cookies['access-token']
      );
      if (addResult === 'complete') {
        navigate('/inventory');
      }
      setLoading(false);
    }
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
    <div className="editgoods page-background">
      <div className="editgoods page-container">
        <div className="editgoods page-content">
          <div className="editgood-form-notice">
            <span>notice : </span>
            {`gold detail id: ${searchParams.get('id')}`}
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
                onKeyDown={() => { }}
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
                type="button"
                value="cancel"
                onClick={() => { navigate('/inventory'); }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
