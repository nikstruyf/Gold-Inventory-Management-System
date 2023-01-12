import React, { useState, useEffect } from 'react';
import './inventorytable.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useLoading } from '../../contexts/LoadingContext';
import { useConfirm } from '../../contexts/ConfirmContext';

import { ConvertWeight } from '../../functions/ConvertWeight';
import { SplitDateAndTime } from '../../functions/ConvertDateAndTimeForDisplay';
import { SetGoldStatus } from '../../functions/EditGold';

import { GoldDetailDataType, GoldInventoryDataType } from '../../interfaces/GoldData';

export default function InventoryTable(
  props: {
    goldData: GoldDetailDataType[],
    status: string,
    type: string,
    code: string
  }
) {
  const {
    goldData,
    status,
    type,
    code
  }: {
      goldData: GoldDetailDataType[],
      status: string,
      type: string,
      code: string
    } = props;

  const navigate = useNavigate();
  const [cookies] = useCookies(['access-token']);

  const { setLoading } = useLoading();
  const { confirm, setConfirm } = useConfirm();

  const [itemSelect, setItemSelect] = useState<number[]>([]);
  const [weightUnit, setWeightUnit] = useState<string>('gram');

  const [expand, setExpand] = useState<number[]>([]);

  function ConvertWeightUnit() {
    if (weightUnit === 'gram') {
      setWeightUnit('Baht');
    } else {
      setWeightUnit('gram');
    }
  }

  function constructData() {
    if (status === 'all') {
      return goldData;
    }
    const res = [];
    for (let i = 0; i < goldData.length; i += 1) {
      const a = { ...goldData[i] };
      a.inventories = (a.inventories || []).filter((
        inventoryData: GoldInventoryDataType
      ) => inventoryData.status === status);
      if (a.inventories.length > 0) {
        res.push(a);
      }
    }
    return res;
  }
  const goldInventoryData = constructData();

  useEffect(() => {
    if (confirm.status === 'confirm' && confirm.action === 'delete item') {
      setConfirm({
        active: false,
        message: '',
        action: '',
        status: ''
      });
      alert('delete');
    }
  }, [confirm.status]);

  async function ChangeStatus(sta: string) {
    setLoading(true);
    const setStatusRes = await SetGoldStatus(itemSelect, sta, cookies['access-token']);
    if (setStatusRes === 'complete') {
      window.location.reload();
    }
    setLoading(false);
  }

  return (
    <div className="inventory table-main">
      {/* Select Item Option */}
      <div className={`inventory table-select ${itemSelect.length > 0 ? 'active' : ''}`}>
        <div className="inventory button-group">
          <button
            className="button move"
            type="button"
            onClick={() => { ChangeStatus('front'); }}
          >
            move to storefront
          </button>
          <button
            className="button move"
            type="button"
            onClick={() => { ChangeStatus('safe'); }}
          >
            move to warehouse
          </button>
        </div>
        <div className="inventory item-qauntity">
          {`${itemSelect.length} items selected`}
        </div>
        <div className="inventory button-group">
          <button
            className="button delete"
            type="button"
          >
            delete
          </button>
        </div>
      </div>
      <table>
        {/* Table Header */}
        <thead>
          <tr>
            <th className="head-action">
              <UnfoldMoreIcon sx={{ fontSize: 32 }} />
            </th>
            <th className="head-picture">
              picture
            </th>
            <th className="head-code">
              code
            </th>
            <th className="head-quantity">
              quantity
            </th>
            <th className="head-type">
              type
            </th>
            <th className="head-detail">
              detail
            </th>
            <th className="head-weight">
              <span>weight</span>
              <button
                className="table-weight-unit"
                type="button"
                onClick={() => { ConvertWeightUnit(); }}
              >
                {weightUnit}
              </button>
            </th>
            <th className="head-goldpercent">
              gold percent
            </th>
            <th className="head-goldsmithfee">
              gold smith fee
            </th>
            <th className="head-edit">
              &#8203;
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {
            goldInventoryData
              ?.filter((el: GoldDetailDataType) => (
                el.code.includes(code)
              ))
              .filter((el: GoldDetailDataType) => (
                type === 'all'
                  ? el
                  : el.type === type
              ))
              .filter((el: GoldDetailDataType) => (
                el.inventories
              ))
              .map((detailData: GoldDetailDataType, index: number) => (
                <React.Fragment key={detailData.gold_detail_id}>
                  {/* Row By Type Detail */}
                  <tr
                    className={`table-main-items ${index % 2 !== 0 ? 'odd' : 'even'}`}
                  >
                    <td
                      className="body-action"
                    >
                      <button
                        type="button"
                        onClick={
                          () => {
                            if (expand.indexOf(detailData.gold_detail_id) === -1) {
                              setExpand([
                                ...expand,
                                detailData.gold_detail_id
                              ]);
                            } else {
                              setExpand([
                                ...expand.slice(0, expand.indexOf(detailData.gold_detail_id)),
                                ...expand.slice(expand.indexOf(detailData.gold_detail_id) + 1)
                              ]);
                            }
                          }
                        }
                      >
                        {
                          expand.indexOf(detailData.gold_detail_id) === -1
                            ? <KeyboardArrowUpIcon sx={{ fontSize: 32 }} />
                            : <KeyboardArrowDownIcon sx={{ fontSize: 32 }} />
                        }
                      </button>
                    </td>
                    <td className="body-picture">
                      {detailData.picture}
                    </td>
                    <td className="body-code">
                      {detailData.code}
                    </td>
                    <td className="body-quantity">
                      {detailData.inventories ? detailData.inventories.length : 0}
                    </td>
                    <td className="body-type">
                      {detailData.type}
                    </td>
                    <td className="body-detail">
                      {detailData.detail}
                    </td>
                    <td className="body-weight">
                      {weightUnit === 'Baht' ? ConvertWeight(detailData.weight, 'gram') : detailData.weight}
                    </td>
                    <td className="body-goldpercent">
                      {detailData.gold_percent}
                    </td>
                    <td className="body-goldsmithfee">
                      {detailData.gold_smith_fee}
                    </td>
                    <td className="body-edit">
                      <button
                        type="button"
                        className="button-edit"
                        onClick={() => { navigate(`/inventory/editgoods?id=${detailData.gold_detail_id}`); }}
                      >
                        edit
                      </button>
                    </td>
                  </tr>
                  {/* Row By Piece Detail */}
                  <tr className={`row-table-piece ${expand.indexOf(detailData.gold_detail_id) !== -1 ? 'expand' : ''}`}>
                    <td colSpan={10} className={`body-table-piece ${index % 2 !== 0 ? 'odd' : 'even'}`}>
                      <table className="table-piece">
                        {/* Header Piece Detail */}
                        <thead>
                          <tr>
                            <th className="head-action">
                              select
                            </th>
                            <th className="head-id">
                              id
                            </th>
                            <th className="head-status">
                              status
                            </th>
                            <th className="head-datein">
                              date in
                            </th>
                            <th className="head-note">
                              note
                            </th>
                          </tr>
                        </thead>
                        {/* Body Piece Detail */}
                        <tbody>
                          {
                          detailData.inventories?.map((inventoryData: GoldInventoryDataType) => (
                            <tr className="table-piece-items" key={inventoryData.gold_inventory_id}>
                              <td className="body-action">
                                <div className="action-checkbox">
                                  <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={
                                      itemSelect.indexOf(inventoryData.gold_inventory_id) !== -1
                                    }
                                    onChange={(e) => {
                                      const { target } = e;
                                      if ((target as HTMLInputElement).checked) {
                                        setItemSelect([
                                          ...itemSelect,
                                          inventoryData.gold_inventory_id
                                        ]);
                                      } else {
                                        setItemSelect([
                                          ...itemSelect.slice(
                                            0,
                                            itemSelect.indexOf(inventoryData.gold_inventory_id)
                                          ),
                                          ...itemSelect.slice(
                                            itemSelect.indexOf(inventoryData.gold_inventory_id) + 1
                                          )
                                        ]);
                                      }
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="body-id">
                                {inventoryData.gold_inventory_id}
                              </td>
                              <td className="body-status">
                                <div className="status-flexbox">
                                  <div className={`status-color ${inventoryData.status}`}>
                                    {
                                      inventoryData.status === 'safe'
                                        ? 'warehouse'
                                        : 'storefront'
                                    }
                                  </div>
                                </div>
                              </td>
                              <td className="body-datein">
                                {SplitDateAndTime(inventoryData.date_in)}
                              </td>
                              <td className="body-note">
                                {inventoryData.note}
                              </td>
                            </tr>
                          ))
                        }
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </React.Fragment>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
