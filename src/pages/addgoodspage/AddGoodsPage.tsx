import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import './addgoodspage.css';
import ImageIcon from '@mui/icons-material/Image';

// import GoldCard from '../../components/goldcard/GoldCard';

import { AddNewGold, AddQueryGold } from '../../functions/AddGold';
import ConvertWeight from '../../functions/ConvertWeight';

function AddGoodsPage() {
  const [cookies] = useCookies(['access-token']);

  const [pageForm, setPageForm] = useState<string>('new');
  const [queryState, setQueryState] = useState<number>(0);
  const queryResultRef = useRef<null | HTMLDivElement>(null);

  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [goldPercent, setGoldPercent] = useState<number>(0);
  const [goldSmithFee, setGoldSmithFee] = useState<number>(0);
  const [picture, setPicture] = useState();
  const [otherDetail, setOtherDetail] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  const [unit, setWeightUnit] = useState<string>('gram');
  const [previewPic, setPreviewPic] = useState<string>();
  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [fillAll, setFillAll] = useState<boolean>(true);

  function checkFillAll() {
    if (code === ''
      || type === ''
      || detail === ''
      || weight === 0
      || goldPercent === 0
      || goldSmithFee === 0
      || !picture
      || quantity === 0
    ) {
      setFillAll(false);
    } else {
      setFillAll(true);
    }
  }

  const save = async (e: any) => {
    e.preventDefault();
    checkFillAll();
    if (unit === 'baht') {
      setWeight(ConvertWeight(weight, unit));
    }
    if (fillAll) {
      const addResult = await AddNewGold(
        code,
        type,
        detail,
        weight,
        goldPercent,
        goldSmithFee,
        picture,
        otherDetail,
        quantity,
        cookies['access-token']
      );
      if (addResult === 'complete') {
        console.log('yes');
      }
    }
  };

  const resetPicture = () => {
    setPicture(undefined);
    setPreviewPic(undefined);
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

  const gotoquery = () => {
    setQueryState(1);
    queryResultRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const query = async (e: any) => {
    e.preventDefault();
    if (unit === 'baht') {
      setWeight(ConvertWeight(weight, unit));
    }
    const queryResult = await AddQueryGold(
      code,
      type,
      detail,
      weight,
      goldPercent,
      goldSmithFee,
      otherDetail,
      cookies['access-token']
    );
    console.log(queryResult);
  };

  return (
    <div className="addgoods-page-background">
      <div className="addgood-page-main-container">
        {/* Button Select Type Form */}
        <div className="page-select-form">
          <button
            type="button"
            className={`button-select-form ${pageForm === 'new' ? 'active' : ''}`}
            onClick={() => { setPageForm('new'); }}
          >
            add new gold
          </button>
          <button
            type="button"
            className={`button-select-form ${pageForm === 'query' ? 'active' : ''}`}
            onClick={() => { setPageForm('query'); }}
          >
            add by query gold
          </button>
        </div>
        {/* Add New Gold */}
        <div className={`addgood-new ${pageForm === 'new' ? 'active' : ''}`}>
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
              <div className={`important-mark ${fillAll || code !== '' ? '' : 'show'}`}>
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
                  <option value="necklace">necklace</option>
                  <option value="bracelet">bracelet</option>
                  <option value="ring">ring</option>
                  <option value="pendant">pendant</option>
                  <option value="earring">earring</option>
                  <option value="bangle">bangle</option>
                </select>
                <span className="custom-arrow" />
              </div>
              <div className={`important-mark ${fillAll || type !== '' ? '' : 'show'}`}>
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
              <div className={`important-mark ${fillAll || detail !== '' ? '' : 'show'}`}>
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
              <div className={`important-mark ${fillAll || weight !== 0 ? '' : 'show'}`}>
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
              <div className={`important-mark ${fillAll || goldPercent !== 0 ? '' : 'show'}`}>
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
              <div className={`important-mark ${fillAll || goldSmithFee !== 0 ? '' : 'show'}`}>
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
              <div className={`important-mark ${fillAll || picture ? '' : 'show'}`}>
                *
              </div>
            </div>
            {/* Other Detail */}
            <div className="label input-otherDetail">
              <span>other detail</span>
              <textarea
                rows={4}
                className="inputbox input-otherDetail"
                onChange={(e) => { setOtherDetail(e.target.value); }}
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
              <div className={`important-mark ${fillAll || quantity !== 0 ? '' : 'show'}`}>
                *
              </div>
            </div>
            {/* Fill All Message */}
            <div className={`label invalid-fillall-message ${fillAll ? '' : 'show'}`}>
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
                onClick={resetPicture}
              />
            </div>
          </form>
        </div>
        {/* Add Query Gold */}
        <div className={`addgood-query ${pageForm === 'query' ? 'active' : ''}`}>
          <div className="addgood-form-notice">
            <span>notice : </span>
            add query gold
          </div>
          {/* Form */}
          <form onSubmit={query}>
            {/* Code */}
            <div className="label input-code">
              <span>code</span>
              <input
                type="text"
                className="inputbox input-code"
                onChange={(e) => { setCode(e.target.value); }}
              />
              <div className={`important-mark ${fillAll || code !== '' ? '' : 'show'}`}>
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
                  <option value="necklace">necklace</option>
                  <option value="bracelet">bracelet</option>
                  <option value="ring">ring</option>
                  <option value="pendant">pendant</option>
                  <option value="earring">earring</option>
                  <option value="bangle">bangle</option>
                </select>
                <span className="custom-arrow" />
              </div>
              <div className={`important-mark ${fillAll || type !== '' ? '' : 'show'}`}>
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
              <div className={`important-mark ${fillAll || detail !== '' ? '' : 'show'}`}>
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
              <div className={`important-mark ${fillAll || weight !== 0 ? '' : 'show'}`}>
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
              <div className={`important-mark ${fillAll || goldPercent !== 0 ? '' : 'show'}`}>
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
              <div className={`important-mark ${fillAll || goldSmithFee !== 0 ? '' : 'show'}`}>
                *
              </div>
            </div>
            {/* Other Detail */}
            <div className="label input-otherDetail">
              <span>other detail</span>
              <textarea
                rows={4}
                className="inputbox input-otherDetail"
                onChange={(e) => { setOtherDetail(e.target.value); }}
              />
            </div>
            {/* Button */}
            <div className="label input-button button">
              <span />
              <input
                className="button-save"
                type="submit"
                value="search"
              />
              <input
                className="button-reset"
                type="reset"
                value="reset"
              />
            </div>
          </form>
          {/* Query Result */}
          <div className="query-result" ref={queryResultRef}>
            <button type="button" onClick={gotoquery}>click me!</button>
            <div
              className={`
                query-result-card-container
                ${queryState === 1 ? 'active' : ''}
              `}
            >
              {/* <GoldCard /> */}
              <table>
                <tr>
                  <th>head 1</th>
                  <th>head 2</th>
                  <th>head 3</th>
                </tr>
                <tr>
                  <td>body 1</td>
                  <td>body 2</td>
                  <td>body 3</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGoodsPage;
