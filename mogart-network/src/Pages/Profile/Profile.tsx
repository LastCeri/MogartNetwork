// Profile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext.tsx';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';
import ProfileHeader from './components/ProfileHeader/ProfileHeader.tsx';
import ProfileMainContent from './components/ProfileContent/MainContent/ProfileMainContent.tsx';
import ProfileLeftSidebar from './components/ProfileLeftSidebar/ProfileLeftSidebar.tsx';
import ProfileRightSidebar from './components/ProfileRightSidebar/ProfileRightSidebar.tsx';
import ProfilePhotosContent from './components/ProfileContent/PhotosContent/ProfilePhotosContent.tsx';
import ProfileInvitationsContent from './components/ProfileContent/InvitationsContent/ProfileInvitationsContent.tsx';
import ProfileGroupsContent from './components/ProfileContent/GroupsContent/ProfileGroupsContent.tsx';
import ProfileActivityContent from './components/ProfileContent/ActivityContent/ProfileActivityContent.tsx';
import ProfileFriendsContent from './components/ProfileContent/FriendsContent/ProfileFriendsContent.tsx';
import { API_URL } from '../../MogartBase/Api/Api.tsx';
import axios from 'axios'; 

export interface UserData {
  VisibleID: string;
  UsrName: string;
  UsrDisplayName: string;
  UsrEmail: string;
  UsrDetail: string;
  UsrRegisterDate: string;
  UsrBirdDate: string;
  UsrBackgroundImage: string;
  UsrProfileImage: string;
  UsrSocialNetworkAdress: string;
  UsrSocialNetwork: string;
  UsrFriends: Friend[];
  UsrFollowers: Follower; 
  UsrFollowing: [];
  UsrScore: number; 
  Posts:PostType[];
  Photos: PhotoType[];
}
export interface PostType {
  Author: string;
  Avatar: string;
  GlobalId: string;
  Content: string; 
  Date: string;
  CommentCount:string;
  LikeCount:string;
  VideoTitle?: string;
  VideoDesc?: string;
  ImageUrl?: string;
  VideoUrl?: [];
}

export interface PhotoType {
  PhotoID: number;
  PhotoURL: string;
  PhotoDescription: string | null;
  UploadDate: string; 
}

export interface Friend {
  name: string;
  status: string;
  image: string;
}

export interface Follower {
  name: string;
  image: string;
}

export interface Followed {
  name: string;
  image: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { username: urlUsername } = useParams<{ username?: string }>();
  const { isLoggedIn, isLoading, data,siteData,userAuthToken } = useData();
  const [userData, setUserData] = useState<UserData | null>(null);
  const username = urlUsername || (isLoggedIn ? (data?.UserName || '') : '');
  const [selectedContent, setSelectedContent] = useState('Posts');

  const handleSelect = (selected:any) => {
    setSelectedContent(selected);
  };

  let contentComponent;
  switch (selectedContent) {
    case 'Posts':
      contentComponent = <ProfileMainContent userData={userData} />;
      break;
    case 'Photos':
      contentComponent = <ProfilePhotosContent userData={userData} />;
      break;
    case 'Invitations':
        contentComponent = <ProfileInvitationsContent userData={userData} />;
      break;
    case 'Groups':
      contentComponent = <ProfileGroupsContent userData={userData} />;
      break;    
    case 'Activity':
      contentComponent = <ProfileActivityContent userData={userData} />;
      break;    
    case 'Friends':
        contentComponent = <ProfileFriendsContent userData={userData} />;
        break;    
    default:
      contentComponent = <ProfileMainContent userData={userData} />;
  }

  useEffect(() => {
    if (isLoading) return;
    if(siteData.SiteStatus != "1") navigate('/');

    const fetchUserData = async () => {
      try {
          const response = await axios.get<UserData[]>(`${API_URL}/GetUserData/${username}`, {
            headers: {
                'Authorization': `Bearer ${userAuthToken}`
            }
        });  
        if (response.data && response.data.length > 0) {
          let fetchedUserData = response.data[0];
          if (fetchedUserData.Photos && typeof fetchedUserData.Photos === 'string') {
            fetchedUserData.Photos = JSON.parse(fetchedUserData.Photos);
          }
          if (!fetchedUserData.UsrBackgroundImage && siteData && siteData.SiteDefaultProfileBackgroundImageURL) {
            fetchedUserData = { ...fetchedUserData, UsrBackgroundImage: siteData?.SiteDefaultProfileBackgroundImageURL };
          }
          setUserData(fetchedUserData); 
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ERR_NETWORK") {
            console.error('Network error:', error);
            navigate('/NetworkError');
          } else if (error.response) {
            console.error('Profile data fetching failed:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
        } else {
          console.error('An unexpected error occurred', error);
        }
      }
    };   

    if (username) {
      fetchUserData();
    }
  }, [username, isLoading]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Navbar />
      <div className="flex flex-1">
        <div className="flex">
          <div className="w-16 bg-blue-900"> </div>
          <div className="min-w-[250px] bg-white pt-16 h-screen">
            <ProfileLeftSidebar userData={userData} />
          </div>
        </div>
                
        <div className="flex flex-col flex-1 pt-4">
          <ProfileHeader userData={userData} onSelect={handleSelect} />

          <div className="flex justify-center flex-1 overflow-hidden">
            {contentComponent}
          </div>
        </div>
        
        <div className="w-1/4 bg-white pt-24">
          <ProfileRightSidebar userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
