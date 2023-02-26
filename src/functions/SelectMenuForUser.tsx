import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
// import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';

const AdminMenu = [
  {
    icon: ViewListRoundedIcon,
    name: 'inventory',
    path: '/inventory'
  },
  {
    icon: FactCheckIcon,
    name: 'checking',
    path: '/checking'
  },
  {
    icon: ReceiptIcon,
    name: 'transaction',
    path: '/transaction'
  },
  {
    icon: AssessmentIcon,
    name: 'report',
    path: '/report'
  },
  {
    icon: GroupsIcon,
    name: 'organization',
    path: '/organization'
  }
];

const OwnerMenu = [
  {
    icon: ViewListRoundedIcon,
    name: 'inventory',
    path: '/inventory'
  },
  {
    icon: FactCheckIcon,
    name: 'checking',
    path: '/checking'
  },
  {
    icon: ReceiptIcon,
    name: 'transaction',
    path: '/transaction'
  },
  {
    icon: AssessmentIcon,
    name: 'report',
    path: '/report'
  },
  // {
  //   icon: BadgeIcon,
  //   name: 'employee',
  //   path: '/employee'
  // }
];

const EmployeeMenu = [
  {
    icon: FactCheckIcon,
    name: 'checking',
    path: '/checking'
  },
  {
    icon: ReceiptIcon,
    name: 'transaction',
    path: '/transaction'
  }
];

function selectMenuForUser(userType: string) {
  let menu = [];
  if (userType === 'admin') {
    menu = AdminMenu;
  } else if (userType === 'owner') {
    menu = OwnerMenu;
  } else {
    menu = EmployeeMenu;
  }
  return menu;
}

export default selectMenuForUser;
