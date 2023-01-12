import axios from 'axios';
import api from '../assets/api/apiPath';

export async function EditGold(
  id: number,
  code: string,
  type: string,
  detail: string,
  weight: number,
  goldPercent: number,
  goldDmithFee: number,
  picture: any,
  token: string
) {
  let res = 'incomplete';
  await axios.put(`${api.IP}${api.editGold}`, {
    gold_detail_id: id,
    code,
    type,
    detail,
    weight,
    gold_percent: goldPercent,
    gold_smith_fee: goldDmithFee,
    picture,
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }).then((result) => {
    if (result.status === 200) {
      res = 'complete';
    }
  });
  return res;
}

export async function SetGoldStatus(
  goldInventoryId: number[],
  status: string,
  token: string
) {
  console.log(goldInventoryId, status, token);
  let res = 'incomplete';
  await axios.patch(`${api.IP}${api.setGoldStatus}`, {
    gold_inventory_id: goldInventoryId,
    status
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }).then((result) => {
    if (result.status === 200) {
      res = 'complete';
    }
  });
  return res;
}
