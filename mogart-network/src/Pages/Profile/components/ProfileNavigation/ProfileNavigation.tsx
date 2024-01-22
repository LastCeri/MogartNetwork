// ProfileNavigation.tsx
import React from 'react';

const ProfileNavigation = () => {
  return (
    <div className="mt-8 rounded-lg transition duration-300 ease-in-out hover:shadow-2xl">
      <nav className="flex justify-center space-x-4 py-2">
        <a href="/Activity" className="text-slate-100 hover:text-white">Activity</a>
        <a href="/Friends" className="text-slate-100 hover:text-white">Friends</a>
        <a href="/Photos" className="text-slate-100 hover:text-white">Photos</a>
        <a href="/Messages" className="text-slate-100 hover:text-white">Messages</a>
        <a href="/Groups" className="text-slate-100 hover:text-bwhite">Groups</a>
        <a href="/Profile" className="text-slate-100 hover:text-white">Profile</a>
        <a href="/Invitations" className="text-slate-100 hover:text-white">Invitations</a>
        <a href="/Forums" className="text-slate-100 hover:text-white">Forums</a>
        <a href="/Settings" className="text-slate-100 hover:text-white">Settings</a>
        <a href="/Points" className="text-slate-100 hover:text-white">Points</a>
      </nav>
    </div>
  );
};

export default ProfileNavigation;
