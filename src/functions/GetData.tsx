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

export async function GetGoldDetailById(id: string | null, token: string) {
  const goldDetail = await axios.get(`${api.IP}${api.getGoldDetailById}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return goldDetail.data;
}

export async function GetAllTransactionJoinGold(token: string) {
  const allTransactionDetail = await axios.get(`${api.IP}${api.getAllTransactionJoinGold}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return allTransactionDetail.data;
}
