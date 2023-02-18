import axios from 'axios';
import api from '../assets/api/apiPath';

async function RemoveUser(username: string, token: string) {
  let res = 'incomplete';
  await axios.delete(`${api.IP}${api.removeUser}${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }).then((result) => {
    if (result.status === 200) {
      res = 'complete';
    }
  }).catch(() => res);
  return res;
}

export default RemoveUser;
