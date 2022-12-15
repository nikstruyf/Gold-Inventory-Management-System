import React, { useState } from 'react';
import './inventorytable.css';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ConvertWeight from '../../functions/ConvertWeight';
import ConvertDateAndTimeForDisplay from '../../functions/ConvertDateAndTimeForDisplay';

import { GoldDetailDataType, GoldInventoryDataType } from '../../interfaces/GoldData';

export default function InventoryTable(
  props: {
    goldData: GoldDetailDataType[],
    status: string,
    type: string
  }
) {
  const {
    goldData,
    status,
    type
  }: {
      goldData: GoldDetailDataType[],
      status: string,
      type: string
    } = props;

  const [weightUnit, setWeightUnit] = useState<string>('gram');

  const [expand, setExpand] = useState<number>(0);

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
      a.inventories = a.inventories.filter((
        inventoryData: GoldInventoryDataType
      ) => inventoryData.status === status);
      if (a.inventories.length > 0) {
        res.push(a);
      }
    }
    return res;
  }
  const goldInventoryData = constructData();

  return (
    <div className="table-main">
      <table>
        {/* Table Header */}
        <thead>
          <tr>
            <th className="head-action">
              expand
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
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {
            goldInventoryData
              ?.filter((el: GoldDetailDataType) => (
                type === 'all'
                  ? el
                  : el.type === type
              ))
              .map((detailData: GoldDetailDataType, index: number) => (
                <React.Fragment key={detailData.gold_detail_id}>
                  {/* Row By Type Detail */}
                  <tr
                    className={`table-main-items ${index % 2 !== 0 ? 'odd' : 'even'}`}
                  >
                    <td className="body-action">
                      <button
                        type="button"
                        onClick={
                        () => {
                          setExpand(
                            expand === detailData.gold_detail_id ? 0 : detailData.gold_detail_id
                          );
                        }
                      }
                      >
                        {
                        expand === detailData.gold_detail_id
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
                      {detailData.inventories?.length}
                    </td>
                    <td className="body-type">
                      {detailData.type}
                    </td>
                    <td className="body-detail">
                      {detailData.detail}
                    </td>
                    <td className="body-picture">
                      {weightUnit === 'Baht' ? ConvertWeight(detailData.weight, 'gram') : detailData.weight}
                    </td>
                    <td className="body-picture">
                      {detailData.gold_percent}
                    </td>
                    <td className="body-picture">
                      {detailData.gold_smith_fee}
                    </td>
                  </tr>
                  {/* Row By Piece Detail */}
                  <tr className={`row-table-piece ${expand === detailData.gold_detail_id ? 'expand' : ''}`}>
                    <td colSpan={9} className={`body-table-piece ${index % 2 !== 0 ? 'odd' : 'even'}`}>
                      <table className="table-piece">
                        {/* Header Piece Detail */}
                        <thead>
                          <tr>
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
                              <td className="body-id">
                                {inventoryData.gold_inventory_id}
                              </td>
                              <td className="body-status">
                                {inventoryData.status}
                              </td>
                              <td className="body-datein">
                                {ConvertDateAndTimeForDisplay(inventoryData.date_in)}
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
