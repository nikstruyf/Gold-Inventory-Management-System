import axios from 'axios';
import api from '../assets/api/apiPath';

export async function GetUserProfile(token: string) {
  const userProfile = await axios.get(`${api.IP}${api.getUserProfile}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return userProfile.data;
}

export async function GetQueryAllUser(token: string) {
  const queryAllUser = await axios.get(`${api.IP}${api.getQueryAllUser}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return queryAllUser.data;
}

export async function GetAllGoldDetailJoinInventory(token: string) {
  const allGoldDetail = await axios.get(`${api.IP}${api.getAllGoldDetailJoinInventory}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return allGoldDetail.data;
}
