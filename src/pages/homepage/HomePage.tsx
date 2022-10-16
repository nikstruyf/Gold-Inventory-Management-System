import React from 'react';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="header">
        Gold Inventory Management System
      </div>
      <div className="button">
        <button
          className="button-go-signin"
          type="submit"
          onClick={() => { navigate('/signin'); }}
          onKeyDown={() => {}}
        >
          sign in
        </button>
        <div className="button-gooooooo">
          <button
            className="button-go-start"
            type="submit"
            onClick={() => { navigate('/inventory'); }}
            onKeyDown={() => { }}
          >
            start
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
