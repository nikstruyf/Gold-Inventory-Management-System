import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './signinpage.css';
import { useCookies } from 'react-cookie';

import { useLoading } from '../../contexts/LoadingContext';
import { useAlert } from '../../contexts/AlertContext';

import SigninClick from '../../functions/Signin';

function SignInPage() {
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['access-token']);

  const { setLoading } = useLoading();
  const { setAlert } = useAlert();

  const [userID, setUserID] = useState<string>('');
  const [userPasswd, setUserPasswd] = useState<string>('');

  const [showInvalid, setShowInvalid] = useState<boolean>(false);

  useEffect(() => {
    setShowInvalid(false);
  }, [userID, userPasswd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const signin = await SigninClick(userID, userPasswd);
    if (signin.res) {
      setShowInvalid(false);
      setCookie('access-token', signin.token, { expires: new Date(Date.now() + 86400000 * 2) });
      if (signin.role === 'employee') {
        navigate('/checking');
      } else {
        navigate('/inventory');
      }
    } else {
      setShowInvalid(true);
      setAlert({
        active: true,
        message: 'invalid username or password'
      });
    }
    setLoading(false);
  };

  return (
    <div className="background">
      <div className="container-signin">
        <div className="header-signin">sign in</div>
        <form onSubmit={handleSubmit}>
          <input
            className="input-userid"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserID(e.target.value)}
          />
          <input
            className="input-passwd"
            type="password"
            placeholder="Password"
            onChange={(e) => setUserPasswd(e.target.value)}
          />
          {/* <a className="link-forgotpass" href="/">forgot password?</a> */}
          <div className={`input-incorrect ${showInvalid ? 'show' : ''}`}>
            {
              userID === '' || userPasswd === ''
                ? 'please enter username and password'
                : 'invalid username or password'
            }
          </div>
          <button
            className="button-signin"
            type="submit"
          >
            sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
