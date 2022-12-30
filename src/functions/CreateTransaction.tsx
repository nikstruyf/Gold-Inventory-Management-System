import axios from 'axios';
import api from '../assets/api/apiPath';

export async function BuyTransaction(
  goldPrice: string,
  weight: number,
  price: number,
  note: string,
  token: string
) {
  let res = 'incomplete';
  await axios.post(`${api.IP}${api.createBuyTransaction}`, {
    transaction_type: 'buy',
    gold_price: goldPrice,
    weight,
    price,
    note
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

export async function FindQueryGoldByInventory(
  code: string,
  type: string,
  weight: number,
  goldPercent: number,
  token: string
) {
  let res: any = [];
  await axios.post(`${api.IP}${api.findQueryGoldByInventory}`, {
    code,
    type,
    weight,
    gold_percent: goldPercent
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }).then((result) => {
    if (result.status === 200) {
      res = result.data.data;
    }
  });
  return res;
}

export async function SellTransaction(
  goldInventoryId: number,
  goldPrice: string,
  price: number,
  note: string,
  token: string
) {
  let res = 'incomplete';
  await axios.post(`${api.IP}${api.createSellTransaction}`, {
    gold_inventory_id: goldInventoryId,
    transaction_type: 'sell',
    gold_price: goldPrice,
    price,
    note
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

export async function TradeTransaction() {
  const res = 'incomplete';
  return res;
}
