import axios from 'axios';
import api from '../assets/api/apiPath';

export default async function EditGold(
  code: string,
  type: string,
  detail: string,
  weight: number,
  goldPercent: number,
  goldDmithFee: number,
  picture: any,
  note: string,
  token: string
) {
  let res = 'incomplete';
  await axios.put(`${api.IP}${api.editGold}`, {
    code,
    type,
    detail,
    weight,
    gold_percent: goldPercent,
    gold_smith_fee: goldDmithFee,
    picture,
    note,
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
