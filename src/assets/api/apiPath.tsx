const api = {
  registerAsAdmin: '/auth/registeradmin',
  signin: '/auth/signin',
  register: '/auth/register',
  getUserProfile: '/auth/profile',
  getQueryAllUser: '/auth/queryalluser',
  removeUser: '/auth/deleteuser/',
  addNewGold: '/inventory/newgold',
  findQueryGold: '/inventory/findgolddetailbydetail',
  addQueryGold: '/inventory/addgold',
  editGold: '/inventory/editgolddetail',
  getAllGoldDetail: '/inventory/getallgolddetail',
  getAllGoldDetailJoinInventory: '/inventory/getalldetailjoininventory',
  getAllTransactionJoinGold: '/transaction/getalltransactionjoingold',
  createBuyTransaction: '/transaction/newbuytransaction',
  findQueryGoldByInventory: '/inventory/getgolddetailjoininventorybydetail',
  createSellTransaction: '/transaction/newselltransaction',
  createChangeTransaction: '/transaction/newchangetransaction',
  IP: 'http://localhost:8080'
};

export default api;
