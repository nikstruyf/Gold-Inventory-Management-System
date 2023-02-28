import axios from 'axios';
import api from '../assets/api/apiPath';

export default async function DiaryChecking(
  arrayOfItem: number[],
  token: string
) {
  const CheckingRes = await axios.post(`${api.IP}${api.checkGold}`, {
    tag_serial_array: arrayOfItem
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return CheckingRes.data.result;
}
