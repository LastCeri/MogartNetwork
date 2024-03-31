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
  const [WalletAddress, setWalletAddress] = useState('');
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
      setWalletAddress(data.WalletAddress || '');
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

  const handleCopyWalletAddress = () => {
 
    navigator.clipboard.writeText(WalletAddress)
      .then(() => {
        console.log('Wallet address copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy wallet address: ', err);
      });
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
      <div className="w-full h-full max-w-4xl bg-white rounded-lg shadow-md p-10 mt-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 mt-8">Settings</h1>      
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
                  <div className="space-y-6 bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-center mb-6">
                    <label htmlFor="profileImageUpload" className="cursor-pointer relative">
                      <img src={profileImage || 'defaultProfileImageURL'} alt="Profile" className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm">Update</span>
                      </div>
                      <input type="file" id="profileImageUpload" className="hidden" accept="image/*" onChange={handleProfileImageChange} />
                    </label>
                  </div>
                    <div>
                      <label htmlFor="username" className="block text-md font-medium text-gray-700">Visible Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 transition duration-150 ease-in-out"
                        placeholder="Your visible username"
                        value={visibleUsername}
                        onChange={(e) => setVisibleUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="bio" className="block text-md font-medium text-gray-700">User Biography</label>
                      <textarea
                        id="bio"
                        name="bio"
                        className="mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 transition duration-150 ease-in-out"
                        placeholder="Tell us a little about yourself"
                        value={userBio}
                        onChange={(e) => setUserBio(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div>
                      <label htmlFor="walletAddress" className="block text-md font-medium text-gray-700">Wallet Address</label>
                      <input
                        type="text"
                        id="walletAddress"
                        name="walletAddress"
                        className="mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 transition duration-150 ease-in-out"
                        placeholder="Your wallet address"
                        value={WalletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-md font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 transition duration-150 ease-in-out"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end mt-8">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </TabPanel>
              <TabPanel>
                <div className="p-6 bg-white shadow rounded-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                  <form onSubmit={handlePrivacySettingsSubmit}>
                    <div className="mb-6">
                      <label htmlFor="profileVisibility" className="block text-md font-semibold text-gray-800 mb-2">Profile Visibility</label>
                      <select
                        id="profileVisibility"
                        name="profileVisibility"
                        value={profileVisibility}
                        onChange={(e) => setProfileVisibility(e.target.value)}
                        className="mt-1 block w-full pl-4 pr-10 py-2 bg-white text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="public">Public</option>
                        <option value="friends">Friends</option>
                        <option value="onlyMe">Only Me</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="activityStatus" className="block text-md font-semibold text-gray-800 mb-2">Activity Status</label>
                      <select
                        id="activityStatus"
                        name="activityStatus"
                        value={activityStatus}
                        onChange={(e) => setActivityStatus(e.target.value)}
                        className="mt-1 block w-full pl-4 pr-10 py-2 bg-white text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="visible">Visible to everyone</option>
                        <option value="friends">Visible to friends only</option>
                        <option value="hidden">Hidden from everyone</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                      >
                        Save Privacy Settings
                      </button>
                    </div>
                  </form>
                </div>
              </TabPanel>
                <TabPanel>
                  <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                    <form onSubmit={handleNotificationsSettingsSubmit}>
                      <div className="mb-6">
                        <label htmlFor="appNotifications" className="flex items-center cursor-pointer">
                          <input
                            id="appNotifications"
                            type="checkbox"
                            checked={appNotifications}
                            onChange={(e) => setAppNotifications(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-2"
                          />
                          <span className="text-md text-gray-700">App Notifications</span>
                        </label>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="emailNotifications" className="flex items-center cursor-pointer">
                          <input
                            id="emailNotifications"
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-2"
                          />
                          <span className="text-md text-gray-700">Email Notifications</span>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      >
                        Save Notification Settings
                      </button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                    <div className="mb-6">
                      <label className="block text-md font-semibold text-gray-800 mb-2">Email Verification</label>
                      <div className="mt-2">
                        {emailVerified ? (
                          <span className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-full text-green-800 bg-green-100">
                            Your email is verified
                            <svg className="ml-2 -mr-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                          </span>
                        ) : (
                          <button
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                          >
                            Verify Email
                          </button>
                        )}
                      </div>
                    </div>
                    <form onSubmit={handleSecuritySettingsSubmit}>
                      <div className="mb-6">
                        <label htmlFor="twoFactorAuth" className="flex items-center cursor-pointer">
                          <input id="twoFactorAuth" type="checkbox" checked={twoFactorAuthentication} onChange={(e) => setTwoFactorAuthentication(e.target.checked)} className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-2" />
                          <span className="text-sm font-medium text-gray-800">Enable Two Factor Authentication</span>
                        </label>
                      </div>
                      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                        Save Security Settings
                      </button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Wallet Settings</h2>
                    <div className="mb-6">
                      <label className="block text-md font-semibold text-gray-800 mb-2">Current Wallet Address</label>
                      <div className="flex gap-4 mb-4 items-center">
                        <input
                          type="text"
                          readOnly
                          value={WalletAddress}
                          className="flex-1 mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                        />
                        <button
                        onClick={handleCopyWalletAddress}
                          className="px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150">
                          Copy Address
                        </button>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-md font-semibold text-gray-800 mb-2">Change Wallet</label>
                      <button
                        className="mt-2 px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150">
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
