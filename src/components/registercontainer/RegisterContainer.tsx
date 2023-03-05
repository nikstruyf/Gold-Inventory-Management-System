import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './registercontainer.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SignUpClick from '../../functions/SignUp';

import { useLoading } from '../../contexts/LoadingContext';
import { useAlert } from '../../contexts/AlertContext';

function RegisterContainer() {
  const navigate = useNavigate();

  const [cookies] = useCookies(['access-token']);

  const { setLoading } = useLoading();
  const { setAlert } = useAlert();

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
      setLoading(true);
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
        setAlert({
          active: true,
          message: 'Error! can not register.\ntry again later.'
        });
      }
      setLoading(false);
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
      <div className="register-main page-content">
        {/* -- Container Header -- */}
        <div className="page-content-header">
          register owner/employee account
        </div>
        {/* -- Container Form -- */}
        <div className="register-form">
          {/* Input */}
          <input
            className="inputbox register"
            type="text"
            placeholder="Account Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="inputbox register"
            type="password"
            placeholder="Account Password"
            value={userPasswd}
            onChange={(e) => setUserPasswd(e.target.value)}
          />
          <input
            className="inputbox register"
            type="password"
            placeholder="Confirm Account Password"
            value={confirmUserPasswd}
            onChange={(e) => setComfirmUserPasswd(e.target.value)}
          />
          {/* Matching Password Message */}
          <div
            className={`
              input-password-match
              ${matchPasswd ? '' : 'invalid'}
            `}
          >
            password dose not match
          </div>
          {/* Select */}
          <div className="select-accuont-type">
            <span>select role</span>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >

              <option value="" disabled hidden>select . . .</option>
              <option value="owner">owner</option>
              <option value="employee">employee</option>
            </select>
            <span className="register custom-arrow" />
          </div>
          {/* Fill All Input Message */}
          <div className={`input-fillall ${fillAll ? '' : 'invalid'}`}>
            please fill all
          </div>
          {/* Button */}
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
