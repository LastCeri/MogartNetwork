import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../../../../MogartBase/Context/DataContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, data } = useData();

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

  const profileImageURL = data?.ProfileImage || 'https://cdn.discordapp.com/attachments/1188239804756926474/1196953627827388527/9131529.png?ex=65e7a56f&is=65d5306f&hm=b0c2a8fd6cb940e32c9898244f7b5097676a4018a23112c572cc92808c149f1d&';

  return (
    <>
      <header className="fixed top-0 left-16 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://cdn.discordapp.com/attachments/1190676022480355339/1190676084505722960/Mogart-Network-Icon.ico?ex=65ec7e84&is=65da0984&hm=92da7c95779ef83cdee6da075b95fe55f7f90fd8bb602cdcd468d64ae9672aa2&" alt="Mogart Network Logo" className="h-8 w-8 mr-2"/>
            <span className="font-bold text-xl text-gray-800">Mogart Network</span>
          </div>
          
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
                  <Link to="/Settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Settings</Link>
                  <Link to="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Profile</Link>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
}