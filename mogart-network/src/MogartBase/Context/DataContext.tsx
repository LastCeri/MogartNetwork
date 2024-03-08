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
  voiceDetectionLevel: number;
}

export interface SiteData {
  SiteName: string;
  SiteDesc: string;
  SiteLogo: string;
  SiteStatus: number;
  SiteStatusText: string;
  SiteLoginBackgroundURL:string;
  SiteRegisterBackgroundURL:string;
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
  voiceDetectionLevel: 50, 
};

const initialSiteData: SiteData = {
  SiteName: '',
  SiteDesc:'',
  SiteLogo:'',
  SiteStatus: 0,
  SiteStatusText: '',
  SiteLoginBackgroundURL:'',
  SiteRegisterBackgroundURL:'',
};

const DataContext = createContext<{
  data: UserData;
  siteData: SiteData;
  chatData: ChatMessage[];
  csrfToken: string;
  isLoggedIn: boolean;
  userAuthToken: string;
  userAuthID: string;
  isLoading: boolean;
  voiceDetectionLevel: number;
  updateData: (newData: UserData) => void;
  setChatData: (newChatData: ChatMessage[]) => void;
  setSiteData: (newSiteData: SiteData) => void;
  setCsrfToken: (token: string) => void;
  setLoginStatus: (status: boolean) => void;
  setUserAuthToken: (token: string) => void;
  setUserAuthID: (id: string) => void;
  setVoiceDetectionLevel: (level: number) => void;
}>({
  data: initialUserData,
  siteData: initialSiteData,
  chatData: [],
  csrfToken: '',
  isLoggedIn: false,
  userAuthToken: '',
  userAuthID: '',
  isLoading: true,
  voiceDetectionLevel: 50,
  updateData: () => {},
  setChatData: () => {},
  setSiteData: () => {},
  setCsrfToken: () => {},
  setLoginStatus: () => {},
  setUserAuthToken: () => {},
  setUserAuthID: () => {},
  setVoiceDetectionLevel: () => {},
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<UserData>(initialUserData);
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const [siteData, setSiteData] = useState<SiteData>(initialSiteData);
  const [csrfToken, setCsrfToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthToken, setUserAuthToken] = useState('');
  const [userAuthID, setUserAuthID] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [voiceDetectionLevel, setVoiceDetectionLevel] = useState(50);

  useEffect(() => {
    const savedData = localStorage.getItem('data');
    const savedSiteData = localStorage.getItem('sitedata');
    const savedCsrfToken = localStorage.getItem('csrfToken');
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUserAuthToken = localStorage.getItem('userAuthToken');
    const savedUserAuthID = localStorage.getItem('userAuthID');
    const savedVoiceDetectionLevel = localStorage.getItem('voiceDetectionLevel');

    if (savedData) {
      setData(JSON.parse(savedData));
    }
    if (savedSiteData) {
      console.log("saved__datasite",savedSiteData);
      SetSiteData(JSON.parse(savedSiteData));
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
    if (savedVoiceDetectionLevel) {
      setVoiceDetectionLevel(parseInt(savedVoiceDetectionLevel, 10));
    }

    setIsLoading(false);
  }, []);

  const SetSiteData = (newSiteData: SiteData) => {
    setSiteData(newSiteData);
    localStorage.setItem('sitedata', JSON.stringify(newSiteData));
  };
  const updateData = (newData: UserData) => {
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  };

  const setCsrfTokenHandler = (token: string) => {
    setCsrfToken(token);
    localStorage.setItem('csrfToken', token);
  };

  const setLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
  };

  const setUserAuthTokenHandler = (token: string) => {
    setUserAuthToken(token);
    localStorage.setItem('userAuthToken', token);
  };

  const setUserAuthIDHandler = (id: string) => {
    setUserAuthID(id);
    localStorage.setItem('userAuthID', id);
  };

  const setVoiceDetectionLevelHandler = (level: number) => {
    try {
      setVoiceDetectionLevel(level);
      updateData({ ...data, voiceDetectionLevel: level });
      localStorage.setItem('voiceDetectionLevel', level.toString());
    } catch (error) {
      console.error('localStorage error:', error);
    }
  };
  

  return (
    <DataContext.Provider value={{
      data,
      chatData,
      siteData,
      csrfToken,
      isLoggedIn,
      userAuthToken,
      userAuthID,
      isLoading,
      voiceDetectionLevel,
      updateData,
      setChatData,
      setSiteData,
      setCsrfToken: setCsrfTokenHandler,
      setLoginStatus,
      setUserAuthToken: setUserAuthTokenHandler,
      setUserAuthID: setUserAuthIDHandler,
      setVoiceDetectionLevel: setVoiceDetectionLevelHandler,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
