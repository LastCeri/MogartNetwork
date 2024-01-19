import React, { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const profileImageURL = localStorage.getItem('profileImageURL') || 'https://cdn.discordapp.com/attachments/1188239804756926474/1196953627827388527/9131529.png';

  return (
    <>
      <header className="fixed top-0 left-16 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://cdn.discordapp.com/attachments/1190676022480355339/1190676084505722960/Mogart-Network-Icon.ico" alt="Mogart Network Logo" className="h-8 w-8 mr-2"/>
            <span className="font-bold text-xl text-gray-800">Mogart Network</span>
          </div>

          {isLoggedIn ? (
            <nav className="flex">
              <a href="/Activity" className="p-2 text-gray-800 hover:text-blue-500">Activity</a>
              <a href="/Groups" className="p-2 text-gray-800 hover:text-blue-500">Groups</a>
            </nav>
          ) : null}
          
          {isLoggedIn ? (
            <div className="flex items-center relative" ref={dropdownRef}>
              <img 
                src={profileImageURL}
                alt="User Profile" 
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {isLoggedIn && isDropdownOpen && (
                <div className="absolute right-0 mt-36 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <a href="/Settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Settings</a>
                  <a href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Profile</a>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
}
