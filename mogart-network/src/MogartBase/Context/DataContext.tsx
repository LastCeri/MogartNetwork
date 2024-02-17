import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

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
  EmailVerified: boolean;
  Theme: string;
  Language: string;
  ChatData: ChatMessage[];
}

const initialUserData: UserData = {
  ProfileImage: '',
  Birthdate: '',
  UserName: "",
  Displayname: '',
  Followers: '',
  Following: '',
  Score: '',
  SocialNetworkAdress: '',
  Details: '',
  walletAddress: '',
  Email: '',
  Theme: '',
  Language: '',
  EmailVerified: false,
  ChatData: [],
};



const DataContext = createContext<{
  data: UserData,
  chatData: ChatMessage[],
  csrfToken: string,
  isLoggedIn: boolean,
  userAuthToken: string,
  userAuthID: string,
  isLoading: boolean,
  updateData: (newData: UserData) => void,
  setChatData: (newChatData: ChatMessage[]) => void,
  setCsrfToken: (token: string) => void,
  setLoginStatus: (status: boolean) => void,
  setUserAuthToken: (token: string) => void,
  setUserAuthID: (id: string) => void,
}>({
  data: initialUserData,
  chatData: [],
  csrfToken: '',
  isLoggedIn: false,
  userAuthToken: '',
  userAuthID: '',
  isLoading: true,
  updateData: () => {},
  setChatData: () => {},
  setCsrfToken: () => {},
  setLoginStatus: () => {},
  setUserAuthToken: () => {},
  setUserAuthID: () => {},
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<UserData>(initialUserData);
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const [csrfToken, setCsrfToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthToken, setUserAuthToken] = useState('');
  const [userAuthID, setUserAuthID] = useState('');
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
    <DataContext.Provider value={{
      data,
      chatData,
      csrfToken,
      isLoggedIn,
      userAuthToken,
      userAuthID,
      isLoading,
      updateData,
      setChatData,
      setCsrfToken,
      setLoginStatus,
      setUserAuthToken,
      setUserAuthID,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
