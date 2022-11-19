import React, { useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import './formaddquerygold.css';

import { FindQueryGold, AddQueryGold } from '../../functions/AddGold';
import ConvertWeight from '../../functions/ConvertWeight';

interface goldDetail {
  gold_detail_id: number,
  code: string,
  type: string,
  detail: string,
  weight: number,
  gold_percent: number,
  gold_smith_fee: number,
  picture: string,
  status: string
}

export default function FormAddQueryGold() {
  const [cookies] = useCookies(['access-token']);

  const [queryState, setQueryState] = useState<number>(0);
  const queryResultRef = useRef<null | HTMLDivElement>(null);

  const [queryResultData, setQueryResultData] = useState<goldDetail[]>([]);

  const [goldDetailId, setGoldDetailId] = useState<number>(0);
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [goldPercent, setGoldPercent] = useState<number>(0);
  const [goldSmithFee, setGoldSmithFee] = useState<number>(0);
  const [note, setNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  const [unit, setWeightUnit] = useState<string>('gram');

  const [focus, isFocus] = useState<number>(0);
  const [fillAll, setFillAll] = useState<boolean>(true);

  function CheckFillAll() {
    if (code === ''
      || type === ''
      || detail === ''
      || weight === 0
      || goldPercent === 0
      || goldSmithFee === 0
      || quantity === 0
    ) {
      setFillAll(false);
    } else {
      setFillAll(true);
    }
  }

  const query = async (e: any) => {
    e.preventDefault();
    setQueryState(1);
    if (unit === 'baht') {
      setWeight(ConvertWeight(weight, unit));
    }
    const queryResult = await FindQueryGold(
      code,
      type,
      detail,
      weight,
      goldPercent,
      goldSmithFee,
      cookies['access-token']
    );
    setQueryResultData(queryResult);
    queryResultRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function SelectQuery(
    GoldDetailId: number,
    Code: string,
    Type: string,
    Weight: number,
    GoldPercent: number,
    GoldSmithFee: number,
  ) {
    setGoldDetailId(GoldDetailId);
    setCode(Code);
    setType(Type);
    setWeight(Weight);
    setGoldPercent(GoldPercent);
    setGoldSmithFee(GoldSmithFee);
    isFocus(GoldDetailId);
  }

  const save = async (e: any) => {
    e.preventDefault();
    CheckFillAll();
    if (fillAll) {
      const addQueryResult = await AddQueryGold(
        goldDetailId,
        note,
        quantity,
        cookies['access-token']
      );
      if (addQueryResult === 'complete') {
        alert('yes');
      }
    }
  };

  const resetState = () => {
    setCode('');
    setType('');
    setDetail('');
    setWeight(0);
    setGoldPercent(0);
    setGoldSmithFee(0);
    setNote('');
    setQuantity(0);
  };

  return (
    <div className="addgood-query">
      <div className="addgood-form-notice">
        <span>notice : </span>
        add query gold
      </div>
      {/* Form Find by Query */}
      <form onSubmit={query}>
        {/* Code */}
        <div className="label input-code">
          <span>code</span>
          <input
            type="text"
            className="inputbox input-code"
            onChange={(e) => { setCode(e.target.value); }}
          />
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
        </div>
        {/* Detail */}
        <div className="label input-detail">
          <span>detail</span>
          <input
            type="text"
            className="inputbox input-detail"
            onChange={(e) => { setDetail(e.target.value); }}
          />
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
            onClick={resetState}
          />
        </div>
      </form>
      {/* Query Result */}
      <div className="query-result" ref={queryResultRef}>
        <div
          className={`
                query-result-container
                ${queryState === 1 ? 'active' : ''}
              `}
        >
          {/* <GoldCard /> */}
          <table className="query-result-table">
            <thead>
              <tr className="table-header">
                <th className="table-header-picture">picture</th>
                <th className="table-header-code">code</th>
                <th className="table-header-type">type</th>
                <th className="table-header-detail">detail</th>
                <th className="table-header-weight">weight</th>
                <th className="table-header-goldPercent">gold percent</th>
                <th className="table-header-goldSmithFee">gold smith fee</th>
              </tr>
            </thead>
            <tbody>
              {
                queryResultData.map((data) => (
                  <tr
                    className={`table-body ${focus === data.gold_detail_id ? 'highlight' : ''}`}
                    onClick={() => {
                      SelectQuery(
                        data.gold_detail_id,
                        data.code,
                        data.type,
                        data.weight,
                        data.gold_percent,
                        data.gold_smith_fee,
                      );
                    }}
                    key={data.gold_detail_id}
                  >
                    <td>this is picture</td>
                    <td>{data.code}</td>
                    <td>{data.type}</td>
                    <td>{data.detail}</td>
                    <td>{data.weight}</td>
                    <td>{data.gold_percent}</td>
                    <td>{data.gold_smith_fee}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      {/* Form Add By Query */}
      <form
        onSubmit={save}
        className={`form-add-by-query ${queryState === 1 ? 'active' : ''}`}
      >
        {/* Other Detail */}
        <div className="label input-otherDetail">
          <span>other detail</span>
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
          <div className={`important-mark ${fillAll || quantity !== 0 ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Fill All Message */}
        <div className={`label invalid-fillall-message ${fillAll || quantity !== 0 ? '' : 'show'}`}>
          <span />
          plaese fill quantity
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
          />
        </div>
      </form>
    </div>
  );
}
