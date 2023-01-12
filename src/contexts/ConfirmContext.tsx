import React, {
  useState,
  createContext,
  useContext,
  useMemo
} from 'react';

type ConfirmType = {
    active: boolean,
    message: string,
    action: string,
    status: string
};

  interface ConfirmContextType {
    confirm: ConfirmType;
    setConfirm: React.Dispatch<React.SetStateAction<ConfirmType>>;
  }

export const ConfirmContext = createContext<ConfirmContextType>({
  confirm: {
    active: false,
    message: '',
    action: '',
    status: ''
  },
  setConfirm: () => {}
});

export function ConfirmProvider({ children }: any) {
  const [confirm, setConfirm] = useState<ConfirmType>({
    active: false,
    message: '',
    action: '',
    status: ''
  });
  const isConfirm = useMemo(() => ({ confirm, setConfirm }), [confirm, setConfirm]);

  return (
    <ConfirmContext.Provider value={isConfirm}>
      { children }
    </ConfirmContext.Provider>
  );
}

export const useConfirm = () => useContext(ConfirmContext);
