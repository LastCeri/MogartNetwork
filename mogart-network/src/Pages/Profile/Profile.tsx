// Profile.tsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext.tsx';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';
import ProfileHeader from './components/ProfileHeader/ProfileHeader.tsx';
import ProfileMainContent from './components/ProfileMainContent/ProfileMainContent.tsx';
import ProfileLeftSidebar from './components/ProfileLeftSidebar/ProfileLeftSidebar.tsx';
import ProfileRightSidebar from './components/ProfileRightSidebar/ProfileRightSidebar.tsx';

function Profile() {
  const navigate = useNavigate();
  const { profileid } = useParams<{ profileid: string }>();
  const { isLoggedIn, isLoading } = useData();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [profileid, navigate, isLoggedIn, isLoading]);

  if (!profileid) {
    return <div>Profile ID Required.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Navbar />
      <div className="flex flex-1">
        <div className="flex">
          <div className="w-16 bg-blue-900"> </div>
          <div className="min-w-[250px] bg-white pt-16 h-screen">
            <ProfileLeftSidebar />
          </div>
        </div>
                
        <div className="flex flex-col flex-1 pt-4">
          <ProfileHeader userId={profileid} />
          <div className="flex justify-center flex-1 overflow-hidden">
            <ProfileMainContent />
          </div>
        </div>
        
        <div className="w-1/4 bg-white pt-24">
          <ProfileRightSidebar />
        </div>
      </div>
    </div>
  );
}

export default Profile;
