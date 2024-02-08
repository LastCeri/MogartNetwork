import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface UserData {
  ProfileImage: string;
  Birthdate: string;
  Displayname: string;
  UserName: string;
  Followers: string;
  Following: string;
  Score: string;
  SocialNetworkAdress: string;
  Details: string;
  walletAddress: string;
  Email: string;
}

const initialUserData: UserData = {
  ProfileImage:  '',
  Birthdate:  '',
  UserName:"",
  Displayname: '',
  Followers:  '',
  Following:  '',
  Score: '',
  SocialNetworkAdress:  '',
  Details: '',
  walletAddress:  '',
  Email: ''
};

const DataContext = createContext({
  data: initialUserData,
  csrfToken: '',
  isLoggedIn: false,
  userAuthToken: '',
  userAuthID: '',
  isLoading: true,
  updateData: (newData: UserData) => {},
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
  const [useEffectCounter, setUseEffectCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    if (savedIsLoggedIn) {
      setIsLoggedIn(savedIsLoggedIn === 'true');
    }
    if (savedUserAuthToken) {
      setUserAuthToken(savedUserAuthToken);
    }
    if (savedUserAuthID) {
      setUserAuthID(savedUserAuthID);
    }
    setIsLoading(false);
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
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
