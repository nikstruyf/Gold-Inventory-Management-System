import React from 'react';
import './signinpage.css';
// import SigninClick from '../../functions/Signin';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  function SigninClick() {
    const navigate = useNavigate();
    navigate('/inventory');
  }

  return (
    <div className="background">
      <div className="container-signin">
        <div className="header-signin">sign in</div>
        <input className="input-userid" type="text" placeholder="USER ID" />
        <input className="input-passwd" type="password" placeholder="PASSWORD" />
        <a className="link-forgotpass" href="/">forgot password?</a>
        <div className="input-incorrect">invalid username or password</div>
        <button
          className="button-signin"
          type="submit"
          onClick={() => { SigninClick(); }}
          onKeyDown={() => {}}
        >
          sign in
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
