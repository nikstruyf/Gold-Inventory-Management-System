import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signinpage.css';
import { useCookies } from 'react-cookie';

import SigninClick from '../../functions/Signin';

function SignInPage() {
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['access-token']);

  const [userID, setUserID] = useState<string>('');
  const [userPasswd, setUserPasswd] = useState<string>('');

  const [showInvalid, setShowInvalid] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const signin = await SigninClick(userID, userPasswd);
    if (signin.res) {
      setShowInvalid(false);
      setCookie('access-token', signin.token, { expires: new Date(Date.now() + 86400000 * 2) });
      navigate('/inventory');
    } else {
      setShowInvalid(true);
    }
  };

  return (
    <div className="background">
      <div className="container-signin">
        <div className="header-signin">sign in</div>
        <form onSubmit={handleSubmit}>
          <input
            className="input-userid"
            type="text"
            placeholder="USER ID"
            onChange={(e) => setUserID(e.target.value)}
          />
          <input
            className="input-passwd"
            type="password"
            placeholder="PASSWORD"
            onChange={(e) => setUserPasswd(e.target.value)}
          />
          <a className="link-forgotpass" href="/">forgot password?</a>
          <div className={`input-incorrect ${showInvalid ? 'show' : ''}`}>
            invalid username or password
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
