import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-16 right-0 bg-white shadow-md z-10">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
  {/* Logo and Title */}
        <div className="flex items-center">
          <img src="https://cdn.discordapp.com/attachments/1184569870357110934/1184569916821602374/Mogart-Network-Icon.ico" alt="Mogart Network Logo" className="h-8 w-8 mr-2"/>
          <span className="font-bold text-xl text-gray-800">Mogart Network</span>
        </div>

  {/* Search Bar */}
        <div className="flex">
          <input 
            type="search" 
            className="form-input w-full px-4 py-2 rounded-md" 
            placeholder="Search community" 
          />
        </div>

  {/* Navigation Menu */}
        <nav className="flex">
          <a href="#" className="p-2 text-gray-800 hover:text-blue-500">Activity</a>
          <a href="#" className="p-2 text-gray-800 hover:text-blue-500">Groups</a>
  {/* Other navigation links */}
        </nav>

  {/* User Profile Icon */}
        <div className="flex items-center">
          <img src="https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&" alt="User Profile" className="h-10 w-10 rounded-full"/>
        </div>
      </div>
    </header>
  );
}
