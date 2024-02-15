import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Select from 'react-select';

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
  const { isLoggedIn, data, isLoading } = useData();
  const [profileImage, setProfileImage] = useState('');
  const [visibleUsername, setVisibleUsername] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [email, setEmail] = useState('');
  const [userBio, setUserBio] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setProfileImage(data.ProfileImage || 'default_image_url');
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
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
