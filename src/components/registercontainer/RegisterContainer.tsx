import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './registercontainer.css';

import SignUpClick from '../../functions/SignUp';

function RegisterContainer() {
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

  const handleSubmit = async (e: any) => {
    if (checkPasswdMatch()) {
      const signup = await SignUpClick(cookies['access-token'], username, userPasswd, userType);
      e.preventDefault();
      if (signup === 'complete') {
        setFillAll(true);
      } else if (signup === 'empty') {
        setFillAll(false);
      } else {
        alert('imcomplete to register!?');
      }
    }
  };

  useEffect(() => {
    setMatchPasswd(checkPasswdMatch());
  }, [userPasswd, confirmUserPasswd]);

  return (
    <div className="register-main-container">
      {/* -- Container Header -- */}
      <div className="register-header">
        register owner/employee account
      </div>
      {/* -- Container Form -- */}
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Account Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Account Password"
            onChange={(e) => setUserPasswd(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Account Password"
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
              defaultValue=""
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
            type="submit"
          >
            sign up account
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterContainer;
