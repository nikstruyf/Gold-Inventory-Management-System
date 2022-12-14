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
  getAllGoldDetail: '/inventory/getallgolddetail',
  getAllGoldDetailJoinInventory: '/inventory/getalldetailjoininventory',
  IP: 'http://10.8.0.3:8080'
};

export default api;
