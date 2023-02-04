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
  setSerialNumber: '/inventory/set-tag-serial-number',
  editGold: '/inventory/editgolddetail',
  getGoldDetailById: '/inventory/getgolddetailbygolddetailid/',
  getGoldDetailJoinInventoyBySerial: '/inventory/get-gold-by-tag-serial-number?serial-number=',
  setGoldStatus: '/inventory/setgoldinventorystatus',
  deleteGold: '/inventory/delete-gold-inventory-by-id',
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
