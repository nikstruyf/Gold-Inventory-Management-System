import axios from 'axios';
import api from '../assets/api/apiPath';

export default async function SetSerialNumber(
  goldInventoryId: number,
  tagSerialNumber: number,
  token: string
) {
  let res = 'incomplete';
  await axios.patch(`${api.IP}${api.setSerialNumber}`, {
    gold_inventory_id: goldInventoryId,
    tag_serial_number: tagSerialNumber
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
