import React from 'react';
import Header from '../../Part/ThemePart/Header/Header.tsx';
import Navbar from '../../Part/ThemePart/Navbar/Navbar.tsx';

import MainContent from '../../Part/PagePart/HomePart/Main/Main.tsx';
import LeftSidebar from '../../Part/PagePart/HomePart/LeftSidebar/LeftSidebar.tsx'; 
import RightSidebar from '../../Part/PagePart/HomePart/RightSidebar/RightSidebar.tsx';


// HomePage.tsx
function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16"> 
        <Navbar />
        <div className="flex flex-1 pl-16">
          <LeftSidebar />
          <MainContent />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default HomePage;