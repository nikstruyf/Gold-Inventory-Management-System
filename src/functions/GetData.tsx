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

export async function getGoldDetailJoinInventoyBySerial(
  serial: number,
  token: string
) {
  const goldDetailJoinInventory = await axios.get(`${api.IP}${api.getGoldDetailJoinInventoyBySerial}${serial}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return goldDetailJoinInventory.data;
}

export async function GetFrontGold(token: string) {
  const storeFrontGold = await axios.get(`${api.IP}${api.getFrontGold}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return storeFrontGold.data;
}

export async function GetAllTransactionJoinGold(token: string) {
  const allTransactionDetail = await axios.get(`${api.IP}${api.getAllTransactionJoinGold}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return allTransactionDetail.data;
}

export async function GetTransactionDashboard(
  from: string | null,
  to: string | null,
  token: string
) {
  const transactionDashboard = await axios.get(`${api.IP}${api.getTransactionDashboard}?from=${from}&to=${to}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return transactionDashboard.data;
}
