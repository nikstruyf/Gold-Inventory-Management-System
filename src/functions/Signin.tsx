import axios from 'axios';
import api from '../assets/api/apiPath';

interface signinRes {
  res: boolean,
  token: string,
  username: string
}

const SigninClick = async (username: string, password: string) => {
  let res: signinRes = {
    res: false,
    token: '',
    username: ''
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
        username: result.data.username
      };
    }
  });
  return res;
};

export default SigninClick;
