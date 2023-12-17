// ProfileNavigation.tsx
import React from 'react';

const ProfileNavigation = () => {
  return (
    <div className="mt-8 rounded-lg transition duration-300 ease-in-out hover:shadow-2xl">
      <nav className="flex justify-center space-x-4 py-2">
        <a href="/activity" className="text-slate-100 hover:text-white">Activity</a>
        <a href="/friends" className="text-slate-100 hover:text-white">Friends</a>
        <a href="/photos" className="text-slate-100 hover:text-white">Photos</a>
        <a href="/messages" className="text-slate-100 hover:text-white">Messages</a>
        <a href="/groups" className="text-slate-100 hover:text-bwhite">Groups</a>
        <a href="/profile" className="text-slate-100 hover:text-white">Profile</a>
        <a href="/invitations" className="text-slate-100 hover:text-white">Invitations</a>
        <a href="/forums" className="text-slate-100 hover:text-white">Forums</a>
        <a href="/settings" className="text-slate-100 hover:text-white">Settings</a>
        <a href="/points" className="text-slate-100 hover:text-white">Points</a>
      </nav>
    </div>
  );
};

export default ProfileNavigation;
