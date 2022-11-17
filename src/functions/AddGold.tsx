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
  otherDetail: string,
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
    other_detail: otherDetail,
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

export async function AddQueryGold(
  code: string,
  type: string,
  detail: string,
  weight: number,
  goldPercent: number,
  goldDmithFee: number,
  otherDetail: string,
  token: string
) {
  let res: any = [];
  await axios.post(`${api.IP}${api.addQueryGold}`, {
    code,
    type,
    detail,
    weight,
    gold_percent: goldPercent,
    gold_smith_fee: goldDmithFee,
    otherDetail,
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }).then((result) => {
    if (result.status === 200) {
      res = result.data;
    }
  });
  return res;
}
