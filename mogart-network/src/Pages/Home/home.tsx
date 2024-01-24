import React from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';

import MainContent from '../../MogartBase/ThemeParts/PagePart/HomePart/Main/Main.tsx';
import LeftSidebar from '../../MogartBase/ThemeParts/PagePart/HomePart/LeftSidebar/LeftSidebar.tsx'; 
import RightSidebar from '../../MogartBase/ThemeParts/PagePart/HomePart/RightSidebar/RightSidebar.tsx';

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