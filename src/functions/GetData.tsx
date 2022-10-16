import axios from 'axios';
import api from '../assets/api/apiPath';

async function GetUserProfile(token: string) {
  const userProfile = await axios.get(`${api.IP}${api.getUserProfile}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return userProfile.data;
}

export default GetUserProfile;
