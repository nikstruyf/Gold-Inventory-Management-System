import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const AuthUserContext = createContext<boolean | null>(null);

export function AuthUserProvider({ children }: any) {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access-token']);
  const [valid, isValid] = useState<boolean>(false);

  const checking = () => {
    const cookie = cookies['access-token'];
    if (!cookie) {
      isValid(false);
      navigate('/signin');
    } else {
      isValid(true);
    }
  };
  useEffect(() => {
    checking();
  }, []);

  return (
    <AuthUserContext.Provider value={valid}>{ children }</AuthUserContext.Provider>
  );
}
