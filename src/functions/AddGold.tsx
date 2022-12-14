import axios from 'axios';
import api from '../assets/api/apiPath';

export async function AddNewGold(
  code: string,
  type: string,
  detail: string,
  weight: number,
  goldPercent: number,
  goldDmithFee: number,
  picture: any,
  note: string,
  quantity: number,
  token: string
) {
  let res = 'incomplete';
  await axios.post(`${api.IP}${api.addNewGold}`, {
    code,
    type,
    detail,
    weight,
    gold_percent: goldPercent,
    gold_smith_fee: goldDmithFee,
    picture,
    note,
    quantity
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

export async function FindQueryGold(
  code: string,
  type: string,
  detail: string,
  weight: number,
  goldPercent: number,
  goldSmithFee: number,
  token: string
) {
  let res: any = [];
  await axios.post(`${api.IP}${api.findQueryGold}`, {
    code,
    type,
    detail,
    weight,
    gold_percent: goldPercent,
    gold_smith_fee: goldSmithFee,
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }).then((result) => {
    if (result.status === 200) {
      res = result.data.data;
    }
  });
  return res;
}

export async function AddQueryGold(
  goldDetailId: number,
  note: string,
  quantity: number,
  token: string
) {
  let res = 'incomplete';
  await axios.post(`${api.IP}${api.addQueryGold}`, {
    gold_detail_id: goldDetailId,
    quantity,
    note
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
