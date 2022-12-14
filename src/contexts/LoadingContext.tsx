import React, {
  useState,
  createContext,
  useContext,
  useMemo
} from 'react';

interface LoadingContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {}
});

export function LoadingProvider({ children }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const isLoading = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);

  return (
    <LoadingContext.Provider value={isLoading}>
      { children }
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
