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
  WalletAddress: string;
  Email: string;
  EmailVerified: boolean;
  Theme: string;
  Language: string;
  VoiceChatStatus: string;
  ChatData: ChatMessage[];
  voiceDetectionLevel: number;
}

export interface SiteData {
  SiteName: string;
  SiteDesc: string;
  SiteLogo: string;
  SiteStatus: string;
  SiteStatusText: string;
  SiteLoginBackgroundURL:string;
  SiteRegisterBackgroundURL:string;
  SiteDefaultProfileImageURL:string;
  SiteDefaultProfileBackgroundImageURL:string;
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
  WalletAddress: '',
  Email: '',
  Theme: '',
  Language: '',
  VoiceChatStatus: '',
  EmailVerified: false,
  ChatData: [],
  voiceDetectionLevel: 50, 
};

const initialSiteData: SiteData = {
  SiteName: '',
  SiteDesc:'',
  SiteLogo:'',
  SiteStatus:'',
  SiteStatusText: '',
  SiteLoginBackgroundURL:'',
  SiteRegisterBackgroundURL:'',
  SiteDefaultProfileImageURL:'',
  SiteDefaultProfileBackgroundImageURL:'',
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
    try {
      setSiteData(newSiteData);
      localStorage.setItem('sitedata', JSON.stringify(newSiteData));
    } catch (error) {
      console.error('SetSiteData error:', error);
    }
  };
  
  const updateData = (newData: UserData) => {
    try {
      setData(newData);
      localStorage.setItem('data', JSON.stringify(newData));
    } catch (error) {
      console.error('updateData error:', error);
    }
  };
  
  const setCsrfTokenHandler = (token: string) => {
    try {
      setCsrfToken(token);
      localStorage.setItem('csrfToken', token);
    } catch (error) {
      console.error('setCsrfTokenHandler error:', error);
    }
  };
  
  const setLoginStatus = (status: boolean) => {
    try {
      setIsLoggedIn(status);
      localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
    } catch (error) {
      console.error('setLoginStatus error:', error);
    }
  };
  
  const setUserAuthTokenHandler = (token: string) => {
    try {
      setUserAuthToken(token);
      localStorage.setItem('userAuthToken', token);
    } catch (error) {
      console.error('setUserAuthTokenHandler error:', error);
    }
  };
  
  const setUserAuthIDHandler = (id: string) => {
    try {
      setUserAuthID(id);
      localStorage.setItem('userAuthID', id);
    } catch (error) {
      console.error('setUserAuthIDHandler error:', error);
    }
  };
  
  const setVoiceDetectionLevelHandler = (level: number) => {
    try {
      setVoiceDetectionLevel(level);
      updateData({ ...data, voiceDetectionLevel: level });
      localStorage.setItem('voiceDetectionLevel', level.toString());
    } catch (error) {
      console.error('setVoiceDetectionLevelHandler error:', error);
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
      updateData:updateData,
      setChatData:setChatData,
      setSiteData:SetSiteData,
      setCsrfToken: setCsrfTokenHandler,
      setLoginStatus: setLoginStatus,
      setUserAuthToken: setUserAuthTokenHandler,
      setUserAuthID: setUserAuthIDHandler,
      setVoiceDetectionLevel: setVoiceDetectionLevelHandler,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
