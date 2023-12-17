// ProfileHeader.tsx
import React from 'react';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';

const ProfileHeader = () => {
  return (
    <div className="flex justify-center items-end pt-16">
    <div className="w-full max-w-7xl mx-auto p-12 mt-8 rounded-xl"  style={{ 
      backgroundImage: 'url(https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="flex items-center justify-between mt-12">
          <div className="flex items-center space-x-4">
            <img
              className="h-24 w-24 rounded-full border-4 border-white"
              src="https://cdn.discordapp.com/attachments/1184268083385348096/1184268122543358013/Mogart-Login-Background.png?ex=658b5aa3&is=6578e5a3&hm=883d5c6717096fa516ff5324ddad301c0207b0a08ced28c4ba35f68e7bbb848f&"
              alt="DarkRice"
            />
            <div className="text-white">
              <h2 className="text-4xl font-bold">DarkRice</h2>
              <p className="text-md">@darkrice - Joined January 17, 2021</p>
              <p className="text-md">10 Followers · 5 Following · 500 Points</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:text-white">Following</button>
            <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:text-white">Friends</button>
          </div>
        </div>
        <ProfileNavigation />
        </div>
    </div>
  );
};

export default ProfileHeader;
