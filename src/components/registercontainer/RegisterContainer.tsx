import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './registercontainer.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SignUpClick from '../../functions/SignUp';

function RegisterContainer() {
  const navigate = useNavigate();

  const [cookies] = useCookies(['access-token']);

  const [username, setUsername] = useState<string>('');
  const [userPasswd, setUserPasswd] = useState<string>('');
  const [confirmUserPasswd, setComfirmUserPasswd] = useState<string>('');
  const [userType, setUserType] = useState<string>('');

  const [matchPasswd, setMatchPasswd] = useState<boolean>(true);
  const [fillAll, setFillAll] = useState<boolean>(true);

  function checkPasswdMatch() {
    if (userPasswd === confirmUserPasswd) {
      return true;
    }
    return false;
  }

  async function handleSubmit() {
    if (checkPasswdMatch()) {
      const signup = await SignUpClick(cookies['access-token'], username, userPasswd, userType);
      if (signup === 'complete') {
        setFillAll(true);
        setUsername('');
        setUserPasswd('');
        setComfirmUserPasswd('');
        setUserType('');
        navigate('/organization');
      } else if (signup === 'empty') {
        setFillAll(false);
      } else if (signup === 'incomplete') {
        alert('incomplete to register!?');
      }
    }
  }

  useEffect(() => {
    setMatchPasswd(checkPasswdMatch());
  }, [userPasswd, confirmUserPasswd]);

  return (
    <div className="organization-page-register">
      <div className="goback-account">
        <button
          className="goback-account-button"
          type="button"
          onClick={() => { navigate('/organization'); }}
        >
          <ArrowBackIcon />
        </button>
      </div>
      <div className="register-main-container">
        {/* -- Container Header -- */}
        <div className="register-header">
          register owner/employee account
        </div>
        {/* -- Container Form -- */}
        <div className="register-form">
          <input
            type="text"
            placeholder="Account Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Account Password"
            value={userPasswd}
            onChange={(e) => setUserPasswd(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Account Password"
            value={confirmUserPasswd}
            onChange={(e) => setComfirmUserPasswd(e.target.value)}
          />
          <div
            className={`
              input-password-match
              ${matchPasswd ? '' : 'invalid'}
            `}
          >
            password dose not match
          </div>
          <label htmlFor="account-type">
            select role
            <select
              id="account-type"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >

              <option value="" disabled hidden>select . . .</option>
              <option value="owner">owner</option>
              <option value="employee">employee</option>
            </select>
          </label>
          <div
            className={`
              input-fillall
              ${fillAll ? '' : 'invalid'}
            `}
          >
            please fill all
          </div>
          <button
            className="button-signup"
            type="button"
            onClick={() => { handleSubmit(); }}
          >
            sign up account
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterContainer;
