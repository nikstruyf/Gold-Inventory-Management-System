import React, { useEffect } from 'react';
import './usercard.css';
import { useCookies } from 'react-cookie';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BadgeIcon from '@mui/icons-material/Badge';

import { useLoading } from '../../contexts/LoadingContext';
import { useConfirm } from '../../contexts/ConfirmContext';
import { useAlert } from '../../contexts/AlertContext';

import RemoveUser from '../../functions/RemoveUser';

function UserCard(props: {username: any, role: any}) {
  const { username, role }: {username: any, role: any} = props;

  const [cookies] = useCookies(['access-token']);

  const { setLoading } = useLoading();
  const { confirm, setConfirm } = useConfirm();
  const { setAlert } = useAlert();

  async function removeUser(user: string, token: string) {
    setLoading(true);
    const removeUserRes = await RemoveUser(user, token);
    if (removeUserRes === 'complete') {
      window.location.reload();
    } else {
      setAlert({
        active: true,
        message: 'Error! can not remover user.\ntry again later.'
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (confirm.status === 'confirm' && confirm.action === `remove ${username}`) {
      removeUser(username, cookies['access-token']);
      setConfirm({
        active: false,
        message: '',
        action: '',
        status: ''
      });
    }
  }, [confirm.status]);

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
          onClick={() => {
            setConfirm({
              active: true,
              message: `confirm ${role} ${username}?`,
              action: `remove ${username}`,
              status: ''
            });
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
}

export default UserCard;
