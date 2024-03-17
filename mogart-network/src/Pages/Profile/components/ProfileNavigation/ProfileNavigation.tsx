// ProfileNavigation.tsx
import React from 'react';

interface ProfileNavigationProps {
  onSelect: (selectedContent: string) => void;
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({ onSelect }) => {
  return (
    <div className="mt-8 rounded-lg transition duration-300 ease-in-out hover:shadow-2xl">
      <nav className="flex justify-center space-x-4 py-2">
        <button onClick={() => onSelect('Posts')} className="text-slate-100 hover:text-white bg-transparent border-none">Posts</button>
        <button onClick={() => onSelect('Activity')} className="text-slate-100 hover:text-white bg-transparent border-none">Activity</button>
        <button onClick={() => onSelect('Friends')} className="text-slate-100 hover:text-white bg-transparent border-none">Friends</button>
        <button onClick={() => onSelect('Photos')} className="text-slate-100 hover:text-white bg-transparent border-none">Photos</button>
        <button onClick={() => onSelect('Messages')} className="text-slate-100 hover:text-white bg-transparent border-none">Messages</button>
        <button onClick={() => onSelect('Groups')} className="text-slate-100 hover:text-white bg-transparent border-none">Groups</button>
        <button onClick={() => onSelect('Invitations')} className="text-slate-100 hover:text-white bg-transparent border-none">Invitations</button>
      </nav>
    </div>
  );
};

export default ProfileNavigation;
