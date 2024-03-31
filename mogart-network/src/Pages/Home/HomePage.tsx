import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';
import MainContent from '../../MogartBase/ThemeParts/PagePart/HomePart/Main/Main.tsx';
import LeftSidebar from '../../MogartBase/ThemeParts/PagePart/HomePart/LeftSidebar/LeftSidebar.tsx'; 
import RightSidebar from '../../MogartBase/ThemeParts/PagePart/HomePart/RightSidebar/RightSidebar.tsx';
import Notification from '../../MogartBase/ThemeParts/Notification/Notification.tsx';
import { API_URL } from '../../MogartBase/Api/Api.tsx';
import { useData } from '../../MogartBase/Context/DataContext.tsx';
import { SiteData } from '../../MogartBase/Context/DataContext.tsx';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const {siteData, setSiteData, isLoading} = useData();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<SiteData[]>(`${API_URL}/MogartSiteData`)
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const siteData: SiteData = response.data[0];
          setSiteData(siteData);
        } else {
          console.error('Site data is empty or in an unexpected format');
        }
      })
      .catch(error => {
        if (error.code === "ERR_NETWORK") {
          console.error('Network error:', error);
          navigate('/NetworkError');
        } else if (error.response) {
          console.error('MogartSiteData data fetching failed:', error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      });
  }, [setSiteData]);
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      {siteData && siteData.SiteStatus === "1" ? (
        <div className="flex flex-1 pt-16"> 
          <Navbar />
          <div className="flex flex-1 pl-16">
            <LeftSidebar />
            <MainContent />
            <RightSidebar />
          </div>
        </div>
       ) : (
        <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat">
        <div className="absolute w-full h-full bg-gradient-to-r from-white to-slate-100 opacity-70 animate-pulse"></div>
        <div className="absolute w-full h-full mix-blend-lighten bg-cover bg-center"></div>
    
       <div className="animate-spin h-16 w-16 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
          <path d="M12 2C6.48 2 2 6.48 2 12v8h20v-8c0-5.52-4.48-10-10-10zm0 2c4.41 0 8 3.59 8 8h-3.68c-.73-2.88-3.1-5-5.82-5s-5.09 2.12-5.82 5H4c0-4.41 3.59-8 8-8zm-1 5c0-.55.45-1 1-1s1 .45 1 1v1h-2v-1zm1 3c-1.1 0-2 .9-2 2h4c0-1.1-.9-2-2-2zm-4 5H5v-2h3v2zm7 0h-6v-2h6v2zm4 0h-3v-2h3v2z"/>
        </svg>
      </div>

        <h1 className="text-4xl text-slate-800 font-bold text-center shadow-lg">
          {siteData ? siteData.SiteStatusText : 'Site is under maintenance'}
        </h1>
      </div>
      
      )}
    </div>
  );
}

export default HomePage;
