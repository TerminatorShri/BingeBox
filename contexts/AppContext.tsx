import { useState, useContext, createContext, ReactNode } from "react";

interface AppContextType {
  firstLoad: boolean;
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | null>(null);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{ firstLoad, setFirstLoad }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext<AppContextType | null>(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
