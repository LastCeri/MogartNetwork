import React, { createContext, useContext, useState, ReactNode } from 'react';

const DataContext = createContext({
  data: null,
  csrfToken: '',
  updateData: (newData: any) => {},
  setCsrfToken: (token: string) => {},
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [csrfToken, setCsrfToken] = useState(''); 

  const updateData = (newData: any) => {
    setData(newData);
  };

  const handleSetCsrfToken = (token: string) => {
    setCsrfToken(token);
  };

  return (
    <DataContext.Provider value={{ data, updateData, csrfToken, setCsrfToken: handleSetCsrfToken }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
