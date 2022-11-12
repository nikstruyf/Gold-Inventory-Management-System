import React from 'react';
import './usercard.css';
import { useCookies } from 'react-cookie';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BadgeIcon from '@mui/icons-material/Badge';

import RemoveUser from '../../functions/RemoveUser';

function UserCard(props: {username: any, role: any}) {
  const { username, role }: {username: any, role: any} = props;

  const [cookies] = useCookies(['access-token']);

  async function removeUser(user: string, token: string) {
    await RemoveUser(user, token);
    window.location.reload();
  }

  return (
    <div className="user-card">
      <div className="user-card-content">
        <div className="user-card-icon">
          {role === 'owner'
            ? <AccountBoxIcon sx={{ fontSize: 50 }} />
            : <BadgeIcon sx={{ fontSize: 50 }} />}
        </div>
        <div className="user-card-username">
          {username}
        </div>
        <div className="user-card-role">
          {role}
        </div>
        <button
          className="remove-user-button"
          type="button"
          onClick={() => removeUser(username, cookies['access-token'])}
        >
          remove
        </button>
      </div>
    </div>
  );
}

export default UserCard;
