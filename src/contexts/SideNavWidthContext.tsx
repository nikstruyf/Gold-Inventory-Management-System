import React, {
  useState,
  createContext,
  useContext,
  useMemo
} from 'react';

  interface SideNavWidthContextType {
    sideNavWidth: string;
    setSideNavWidth: React.Dispatch<React.SetStateAction<string>>;
  }

export const SideNavWidthContext = createContext<SideNavWidthContextType>({
  sideNavWidth: 'expand',
  setSideNavWidth: () => {}
});

export function SideNavWidthProvider({ children }: any) {
  const [sideNavWidth, setSideNavWidth] = useState<string>('expand');
  const isSideNavWidth = useMemo(() => (
    { sideNavWidth, setSideNavWidth }
  ), [sideNavWidth, setSideNavWidth]);

  return (
    <SideNavWidthContext.Provider value={isSideNavWidth}>
      { children }
    </SideNavWidthContext.Provider>
  );
}

export const useSideNavWidth = () => useContext(SideNavWidthContext);
