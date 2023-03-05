import axios from 'axios';
import api from '../assets/api/apiPath';

interface signinRes {
  res: boolean,
  token: string,
  username: string,
  role: string
}

const SigninClick = async (username: string, password: string) => {
  let res: signinRes = {
    res: false,
    token: '',
    username: '',
    role: ''
  };
  if (username === '' || password === '') {
    return res;
  }
  await axios.post(`${api.IP}${api.signin}`, {
    username,
    password,
  }).then((result) => {
    if (result) {
      res = {
        res: true,
        token: result.data.accesstoken,
        username: result.data.username,
        role: result.data.role
      };
    }
  }).catch(() => res);
  return res;
};

export default SigninClick;
