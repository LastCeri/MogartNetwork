// Profile.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext.tsx';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';
import ProfileHeader from './components/ProfileHeader/ProfileHeader.tsx';
import ProfileMainContent from './components/ProfileMainContent/ProfileMainContent.tsx';
import ProfileLeftSidebar from './components/ProfileLeftSidebar/ProfileLeftSidebar.tsx';
import ProfileRightSidebar from './components/ProfileRightSidebar/ProfileRightSidebar.tsx';

function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn } = useData();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <div className="flex flex-row flex-1">
        <ProfileLeftSidebar />
        <div className="flex flex-col flex-1 pt-4">
          <ProfileHeader />
          <div className="flex justify-center flex-1 overflow-hidden">
            <ProfileMainContent />
          </div>
        </div>
        <ProfileRightSidebar />
      </div>
    </div>
  );
}


export default Profile;
