import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const DataContext = createContext({
  data: null,
  csrfToken: '',
  isLoggedIn: false,
  userAuthToken: '',
  userAuthID: '',
  updateData: (newData: any) => {},
  setCsrfToken: (token: string) => {},
  setLoginStatus: (status: boolean) => {},
  setUserAuthToken: (token: string) => {},
  setUserAuthID: (id: string) => {},
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthToken, setUserAuthToken] = useState('');
  const [userAuthID, setUserAuthID] = useState('');

  useEffect(() => {

    const savedData = localStorage.getItem('data');
    const savedCsrfToken = localStorage.getItem('csrfToken');
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUserAuthToken = localStorage.getItem('userAuthToken');
    const savedUserAuthID = localStorage.getItem('userAuthID');

    if (savedData) {
      setData(JSON.parse(savedData));
    }
    if (savedCsrfToken) {
      setCsrfToken(savedCsrfToken);
    }
    if (savedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    if (savedUserAuthToken) {
      setUserAuthToken(savedUserAuthToken);
    }
    if (savedUserAuthID) {
      console.log("savedUserAuthID:  "+savedUserAuthID);
      setUserAuthID(savedUserAuthID);
    }
  }, []);

  const updateData = (newData: any) => {
    setData(newData);

    localStorage.setItem('data', JSON.stringify(newData));
  };

  const handleSetCsrfToken = (token: string) => {
    setCsrfToken(token);

    localStorage.setItem('csrfToken', token);
  };

  const setLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);

    localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
  };

  const handleSetUserAuthToken = (token: string) => {
    setUserAuthToken(token);

    localStorage.setItem('userAuthToken', token);
  };

  const handleSetUserAuthID = (id: string) => {
    setUserAuthID(id);

    localStorage.setItem('userAuthID', id);
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
        setUserAuthToken: handleSetUserAuthToken,
        userAuthID,
        setUserAuthID: handleSetUserAuthID,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
