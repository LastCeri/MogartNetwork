import React, { createContext, useContext, useState, ReactNode } from 'react';

const DataContext = createContext({
  data: null,
  csrfToken: '',
  isLoggedIn: false,
  userAuthToken: '',
  updateData: (newData: any) => {},
  setCsrfToken: (token: string) => {},
  setLoginStatus: (status: boolean) => {},
  setUserAuthToken: (token: string) => {}
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthToken, setUserAuthToken] = useState('');

  const updateData = (newData: any) => {
    setData(newData);
  };

  const handleSetCsrfToken = (token: string) => {
    setCsrfToken(token);
  };

  const setLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        updateData,
        csrfToken,
        setCsrfToken: handleSetCsrfToken,
        isLoggedIn,
        setLoginStatus,
        userAuthToken,
        setUserAuthToken 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
