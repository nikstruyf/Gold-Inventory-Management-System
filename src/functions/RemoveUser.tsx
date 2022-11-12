import axios from 'axios';
import api from '../assets/api/apiPath';

async function RemoveUser(username: string, token: string) {
  await axios.delete(`${api.IP}${api.removeUser}${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
}

export default RemoveUser;
