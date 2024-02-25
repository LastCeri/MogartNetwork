import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';
import MainContent from '../../MogartBase/ThemeParts/PagePart/HomePart/Main/Main.tsx';
import LeftSidebar from '../../MogartBase/ThemeParts/PagePart/HomePart/LeftSidebar/LeftSidebar.tsx'; 
import RightSidebar from '../../MogartBase/ThemeParts/PagePart/HomePart/RightSidebar/RightSidebar.tsx';
import Notification from '../../MogartBase/ThemeParts/Notification/Notification.tsx';
import { API_URL } from '../../MogartBase/Api/Api.tsx';

interface SiteData {
  SiteSettingID: number;
  SiteName: string;
  SiteDesc: string;
  SiteLogo: string;
  SiteStatus: number;
  SiteStatusText?: string;
}

// HomePage.tsx
function HomePage() {
  const [siteStatus, setSiteStatus] = useState<SiteData | null>(null);

  useEffect(() => {
    axios.get<SiteData[]>(`${API_URL}/MogartSiteData`)
      .then(response => {
        setSiteStatus(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching site data:', error);
      });
  }, []);

  if (!siteStatus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <Header />
       {/* {siteStatus.SiteStatus === 0 ? ( */}
        <div className="flex flex-1 pt-16"> 
          <Navbar />
          <div className="flex flex-1 pl-16">
            <LeftSidebar />
            <MainContent />
            <RightSidebar />
          </div>
        </div>
      {/* ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl">{siteStatus.SiteStatusText || 'Site is under maintenance.'}</h1>
        </div>
      )} */}
    </div>
  );
}

export default HomePage;
