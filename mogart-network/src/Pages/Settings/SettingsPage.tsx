import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'tr', label: 'Türkçe' },
];

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const ProfileSettingsPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, data, siteData, isLoading } = useData();
  const [profileImage, setProfileImage] = useState('');
  const [visibleUsername, setVisibleUsername] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [email, setEmail] = useState('');
  const [userBio, setUserBio] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [activityStatus, setActivityStatus] = useState('visible');
  const [appNotifications, setAppNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorAuthentication, setTwoFactorAuthentication] = useState(false);


  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setProfileImage(data?.ProfileImage ||siteData?.SiteDefaultProfileBackgroundImageURL);
      setVisibleUsername(data.Displayname || '');
      setWalletAddress(data.walletAddress || '');
      setEmail(data.Email || '');
      setUserBio(data.Details || '');
      setSelectedLanguage(languageOptions.find(option => option.value === data.Language) || languageOptions[0]);
      setSelectedTheme(themeOptions.find(option => option.value === data.Theme) || themeOptions[0]);
      setEmailVerified(data.EmailVerified || false);
    }
  }, [isLoggedIn, navigate, isLoading, data]);

  const handleFormSubmit = (e:any) => {
    e.preventDefault();

  };

  const handleProfileImageChange = (e:any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePrivacySettingsSubmit = (e:any) => {
    e.preventDefault();
    console.log('Privacy Settings Saved:', { profileVisibility, activityStatus });
  };
  const handleNotificationsSettingsSubmit = (e:any)  => {
    e.preventDefault();
    console.log('Notification Settings Saved:', { appNotifications, emailNotifications });
  };
  
  const handleSecuritySettingsSubmit = (e:any) => {
    e.preventDefault();
    console.log('Security Settings Saved:', { twoFactorAuthentication });
  };
  
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col h-screen">
        <main className="flex-1 flex justify-center items-center p-4 bg-gray-100">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-20">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Profile Settings</h1>
            <Tabs>
              <TabList>
                <Tab>General</Tab>
                <Tab>Privacy</Tab>
                <Tab>Notifications</Tab>
                <Tab>Security</Tab>
                <Tab>Wallet</Tab>
              </TabList>
              <TabPanel>
                <form onSubmit={handleFormSubmit}>
                  <div className="space-y-4">
                    <div className="flex justify-center mb-6">
                      <label htmlFor="profileImageUpload" className="cursor-pointer">
                        <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-2 border-gray-300" />
                        <input type="file" id="profileImageUpload" className="hidden" onChange={handleProfileImageChange} />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="username" className="text-lg text-gray-600">Visible Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full border-gray-300 rounded-md shadow-sm mt-2 p-2"
                        placeholder="Your visible username"
                        value={visibleUsername}
                        onChange={(e) => setVisibleUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="bio" className="text-lg text-gray-600">User Biography</label>
                      <textarea
                        id="bio"
                        name="bio"
                        className="w-full border-gray-300 rounded-md shadow-sm mt-2 p-2"
                        placeholder="Tell us a little about yourself"
                        value={userBio}
                        onChange={(e) => setUserBio(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="walletAddress" className="text-lg text-gray-600">Wallet Address</label>
                      <input
                        type="text"
                        id="walletAddress"
                        name="walletAddress"
                        className="w-full border-gray-300 rounded-md shadow-sm mt-2 p-2"
                        placeholder="Your wallet address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-lg text-gray-600">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border-gray-300 rounded-md shadow-sm mt-2 p-2"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </TabPanel>
              <TabPanel>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h2>
                    <form onSubmit={handlePrivacySettingsSubmit}>
                      <div className="mb-4">
                        <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700">Profile Visibility</label>
                        <select
                          id="profileVisibility"
                          name="profileVisibility"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          value={profileVisibility}
                          onChange={(e) => setProfileVisibility(e.target.value)}
                        >
                          <option value="public">Public</option>
                          <option value="friends">Friends</option>
                          <option value="onlyMe">Only Me</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="activityStatus" className="block text-sm font-medium text-gray-700">Activity Status</label>
                        <select
                          id="activityStatus"
                          name="activityStatus"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          value={activityStatus}
                          onChange={(e) => setActivityStatus(e.target.value)}
                        >
                          <option value="visible">Visible to everyone</option>
                          <option value="friends">Visible to friends only</option>
                          <option value="hidden">Hidden from everyone</option>
                        </select>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-md"
                        >
                          Save Privacy Settings
                        </button>
                      </div>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h2>
                    <form onSubmit={handleNotificationsSettingsSubmit}>
                      <div className="mb-4">
                        <label className="flex items-center">
                          <input type="checkbox" checked={appNotifications} onChange={(e) => setAppNotifications(e.target.checked)} className="mr-2" />
                          App Notifications
                        </label>
                      </div>
                      <div className="mb-4">
                        <label className="flex items-center">
                          <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="mr-2" />
                          Email Notifications
                        </label>
                      </div>
                      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Notification Settings</button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Email Verification</label>
                      <div className="mt-2">
                        {emailVerified ? (
                          <p className="text-green-600">Your email is verified.</p>
                        ) : (
                          <button
                            className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                          >
                            Verify Email
                          </button>
                        )}
                      </div>
                    </div>
                    <form onSubmit={handleSecuritySettingsSubmit}>
                      <div className="mb-4">
                        <label className="flex items-center">
                          <input type="checkbox" checked={twoFactorAuthentication} onChange={(e) => setTwoFactorAuthentication(e.target.checked)} className="mr-2" />
                          Two Factor Authentication
                        </label>
                      </div>
                      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Security Settings</button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Wallet Settings</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Current Wallet Address</label>
                      <div className="mt-1 mb-4">
                        <input
                          type="text"
                          readOnly
                          value={walletAddress}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"/>
                        <button
                        
                          className="mt-2 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                          Copy Address
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Change Wallet</label>
                      <button className="mt-2 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                        Connect to a Different Wallet
                      </button>
                    </div>
                  </div>
                </TabPanel>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
