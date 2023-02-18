import React, {
  useState,
  createContext,
  useContext,
  useMemo
} from 'react';

type AlertType = {
    active: boolean,
    message: string
};

  interface AlertContextType {
    alert: AlertType;
    setAlert: React.Dispatch<React.SetStateAction<AlertType>>;
  }

export const AlertContext = createContext<AlertContextType>({
  alert: {
    active: false,
    message: ''
  },
  setAlert: () => {}
});

export function AlertProvider({ children }: any) {
  const [alert, setAlert] = useState<AlertType>({
    active: false,
    message: ''
  });
  const isAlert = useMemo(() => ({ alert, setAlert }), [alert, setAlert]);

  return (
    <AlertContext.Provider value={isAlert}>
      { children }
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
