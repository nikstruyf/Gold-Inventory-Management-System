import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './formaddquerygold.css';

import { useLoading } from '../../contexts/LoadingContext';
import { useConfirm } from '../../contexts/ConfirmContext';

import { FindQueryGold, AddQueryGold } from '../../functions/AddGold';
import { ConvertWeight, CheckWeight } from '../../functions/ConvertWeight';
import Delay from '../../functions/Delay';

import { GoldDetailByQuery } from '../../interfaces/GoldData';

export default function FormAddQueryGold() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access-token']);

  const { setLoading } = useLoading();
  const { confirm, setConfirm } = useConfirm();

  const [queryState, setQueryState] = useState<number>(0);
  const queryResultRef = useRef<null | HTMLDivElement>(null);

  const [queryResultData, setQueryResultData] = useState<GoldDetailByQuery[]>([]);

  const [goldDetailId, setGoldDetailId] = useState<number>(0);
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [goldPercent, setGoldPercent] = useState<number>(0);
  const [goldSmithFee, setGoldSmithFee] = useState<number>(0);
  const [note, setNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  const [unit, setUnit] = useState<string>('gram');
  const [weightUnit, setWeightUnit] = useState<string>('gram');

  const [focus, isFocus] = useState<number>(0);

  const [submit, isSubmit] = useState<boolean>(false);

  function CheckFillAll() {
    if (code === ''
      || type === ''
      || detail === ''
      || weight === 0
      || goldPercent === 0
      || goldSmithFee === 0
      || quantity === 0
    ) {
      return false;
    }
    return true;
  }

  function ConvertWeightUnit() {
    if (weightUnit === 'gram') {
      setWeightUnit('Baht');
    } else {
      setWeightUnit('gram');
    }
  }

  const query = async (e: any) => {
    e.preventDefault();
    setQueryState(1);
    setLoading(true);
    if (unit === 'baht') {
      setWeight(ConvertWeight(weight, unit));
    }
    const queryResult = await FindQueryGold(
      code,
      type,
      detail,
      CheckWeight(weight, unit),
      goldPercent,
      goldSmithFee,
      cookies['access-token']
    );
    setQueryResultData(queryResult);
    await Delay(100);
    setLoading(false);
    queryResultRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function SelectQuery(
    GoldDetailId: number,
    Code: string,
    Type: string,
    Detail: string,
    Weight: number,
    GoldPercent: number,
    GoldSmithFee: number,
  ) {
    setGoldDetailId(GoldDetailId);
    setCode(Code);
    setType(Type);
    setDetail(Detail);
    setWeight(Weight);
    setGoldPercent(GoldPercent);
    setGoldSmithFee(GoldSmithFee);
    isFocus(GoldDetailId);
  }

  const save = (e: any) => {
    e.preventDefault();
    isSubmit(true);
    if (CheckFillAll()) {
      setConfirm({
        active: true,
        message: 'confirm save ?',
        action: 'addquerygold',
        status: ''
      });
    }
  };

  async function PutData() {
    setLoading(true);
    const addQueryResult = await AddQueryGold(
      goldDetailId,
      note,
      quantity,
      cookies['access-token']
    );
    if (addQueryResult === 'complete') {
      navigate('/inventory');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (confirm.status === 'confirm' && confirm.action === 'addquerygold') {
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
              <option value="">all</option>
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
                onChange={(e) => { setUnit(e.target.value); }}
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
          <div className="result-count">
            result:
            {queryResultData === null ? ' 0' : ` ${queryResultData?.length}`}
          </div>
          {/* Query Table */}
          <div className="query-result-table">
            <table>
              <thead>
                <tr className="table-header">
                  <th className="table-header-picture">picture</th>
                  <th className="table-header-code">code</th>
                  <th className="table-header-type">type</th>
                  <th className="table-header-detail">detail</th>
                  <th className="table-header-weight">
                    weight
                    <button
                      className="add-query table-weight-unit"
                      type="button"
                      onClick={() => { ConvertWeightUnit(); }}
                    >
                      {weightUnit}
                    </button>
                  </th>
                  <th className="table-header-goldPercent">gold percent</th>
                  <th className="table-header-goldSmithFee">gold smith fee</th>
                </tr>
              </thead>
              <tbody>
                {
                  queryResultData?.map((data) => (
                    <tr
                      className={`table-body ${focus === data.gold_detail_id ? 'highlight' : ''}`}
                      onClick={() => {
                        SelectQuery(
                          data.gold_detail_id,
                          data.code,
                          data.type,
                          data.detail,
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
                      <td className="body-value">
                        {
                          weightUnit === 'Baht'
                            ? ConvertWeight(data.weight, 'gram')
                            : data.weight
                        }
                      </td>
                      <td className="body-value">{data.gold_percent}</td>
                      <td className="body-value">{data.gold_smith_fee}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
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
          <div className={`important-mark ${CheckFillAll() || quantity !== 0 ? '' : 'show'}`}>
            *
          </div>
        </div>
        {/* Fill All Message */}
        <div className={`label invalid-fillall-message ${CheckFillAll() || !submit ? '' : 'show'}`}>
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
