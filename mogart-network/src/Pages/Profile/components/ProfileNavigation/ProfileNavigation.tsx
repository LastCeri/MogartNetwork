import React, { useState } from 'react';
import { useData } from '../../../../MogartBase/Context/DataContext';

interface ProfileNavigationProps {
  onSelect: (selectedContent: string) => void;
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({ onSelect }) => {
  const [activeItem, setActiveItem] = useState<string>('Posts');
  let navItems = ['Posts', 'Activity', 'Friends', 'Photos', 'Groups'];
  const { data } = useData();

  const isProfilePage = window.location.pathname === '/Profile' || window.location.pathname.includes(data?.UserName);

  if (isProfilePage) {
    navItems = [...navItems, 'Invitations'];
  }

  const handleSelect = (item: string) => {
    setActiveItem(item);
    onSelect(item);
  };

  return (
    <div className="mt-8 bg-black bg-opacity-20 rounded-lg transition duration-300 ease-in-out hover:shadow-2xl">
      <nav className="flex justify-center space-x-4 py-2">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => handleSelect(item)}
            className={`px-3 py-1 rounded-lg text-slate-100 hover:text-white transition duration-150 ease-in-out ${
              activeItem === item ? 'bg-white bg-opacity-20' : 'bg-transparent'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileNavigation;
