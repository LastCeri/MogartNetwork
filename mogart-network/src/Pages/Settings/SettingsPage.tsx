import React, { useState } from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

const ProfileSettingsPage = () => {

  const [profileImage, setProfileImage] = useState('path_to_default_profile_image.jpg');
  const registrationDate = 'January 1, 2020';


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
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Profile Settings</h1>
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">

                <div className="flex justify-center mb-6">
                  <label htmlFor="profileImageUpload" className="cursor-pointer">
                    <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-2 border-gray-300"/>
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
                  />
                </div>

                <div>
                  <label htmlFor="emailVerification" className="text-lg text-gray-600">Email Verification</label>
                  <div className="mt-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Verify Email
                    </button>
                  </div>
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
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
