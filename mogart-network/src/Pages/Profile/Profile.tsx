// Profile.tsx
import React from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';
import ProfileHeader from './components/ProfileHeader/ProfileHeader.tsx';
import ProfileMainContent from './components/ProfileMainContent/ProfileMainContent.tsx';
import ProfileLeftSidebar from './components/ProfileLeftSidebar/ProfileLeftSidebar.tsx';
import ProfileRightSidebar from './components/ProfileRightSidebar/ProfileRightSidebar.tsx';

function Profile() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <div className="flex flex-col flex-1 pt-4">
          <ProfileHeader />
          <div className="flex justify-center flex-1 overflow-hidden">
            <div className="flex w-full max-w-7xl mx-auto">
              <ProfileLeftSidebar />
              <ProfileMainContent />
              <ProfileRightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
