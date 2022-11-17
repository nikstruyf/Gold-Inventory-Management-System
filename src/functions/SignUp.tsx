import axios from 'axios';
import api from '../assets/api/apiPath';

const SignUpClick = async (token: string, username: string, password: string, role: string) => {
  let res = 'incomplete';
  if (username === '' || password === '' || role === '') {
    res = 'empty';
    return res;
  }
  await axios.post(`${api.IP}${api.register}`, {
    username,
    password,
    role
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
};

export default SignUpClick;
