import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import './showalluser.css';

import { GetQueryAllUser } from '../../functions/GetData';

import UserCard from '../usercard/UserCard';

interface userDataType {
    username: string,
    role: string
}

function ShowAllUser() {
  const navigate = useNavigate();

  const [cookies] = useCookies(['access-token']);

  const [userData, setUserData] = useState<userDataType[]>([]);

  useEffect(() => {
    GetQueryAllUser(cookies['access-token']).then((res) => {
      setUserData(res.data);
    });
    console.log(userData);
  }, []);

  return (
    <div className="organization-page-user">
      <div className="register-account">
        <button
          className="register-account-button"
          type="button"
          onClick={() => { navigate('/organization/register'); }}
        >
          register
        </button>
      </div>
      <div className={`noAccount ${userData === null || userData.length === 0 ? 'active' : ''}`}>
        <PersonAddAltIcon sx={{ fontSize: 100 }} />
        no account? let&rsquo;s register first!
      </div>
      <div className="organization-alluser-view">
        {
                userData
                  ?.sort((c: userDataType) => (c.role === 'owner' ? -1 : 1))
                  .map((item: userDataType) => (
                    <UserCard
                      username={item.username}
                      role={item.role}
                      key={item.username}
                    />
                  ))
            }
      </div>
    </div>
  );
}

export default ShowAllUser;
