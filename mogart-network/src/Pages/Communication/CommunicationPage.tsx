import React, { useEffect,useState } from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import FriendRequests from './components/FriendRequests';
import EventInvitations from './components/EventInvitation';
import GroupInvitation from './components/GroupInvitation';
import MessageRequests from './components/MessageRequests';
import { useData } from '../../MogartBase/Context/DataContext';
import { useNavigate } from 'react-router-dom';
import FollowRequests from './components/FollowRequests';


const CommunicationPage = () => {
  const [activeModule, setActiveModule] = useState('friendRequests');
  const { isLoggedIn, isLoading,siteData} = useData();
  const navigate = useNavigate();

  useEffect(() => {  
    if (isLoading) return;
    if(siteData.SiteStatus != "1") navigate('/');
    if (!isLoggedIn) {
      navigate('/login');
    }
  });

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen overflow-auto mt-24">
        <div className="md:w-1/4 lg:w-1/5 bg-gray-100 text-gray-800 overflow-auto ml-20 shadow-lg">
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-5">Communication Requests</h2>
            <div className="space-y-3">
            <button onClick={() => setActiveModule('friendRequests')} className={`w-full text-left font-medium ${activeModule === 'friendRequests' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} py-3 px-5 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md`}>
                Friend Requests
            </button>
            <button onClick={() => setActiveModule('followRequests')} className={`w-full text-left font-medium ${activeModule === 'followRequests' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} py-3 px-5 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md`}>
                Follow Requests
            </button>
            <button onClick={() => setActiveModule('eventRequests')} className={`w-full text-left font-medium ${activeModule === 'eventRequests' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} py-3 px-5 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md`}>
                Event Invitations
            </button>
            <button onClick={() => setActiveModule('groupRequests')} className={`w-full text-left font-medium ${activeModule === 'groupRequests' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} py-3 px-5 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md`}>
                Group Invitations
            </button>
            <button onClick={() => setActiveModule('messageRequests')} className={`w-full text-left font-medium ${activeModule === 'messageRequests' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} py-3 px-5 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md`}>
                Message Requests
            </button>
            </div>
        </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-gray-100 p-4 shadow-md">
            <h3 className="text-lg font-semibold">Requests List</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {activeModule === 'friendRequests' && <FriendRequests />}
            {activeModule === 'eventRequests' && <EventInvitations />}
            {activeModule === 'followRequests' && <FollowRequests />}
            {activeModule === 'groupRequests' && <GroupInvitation />}
            {activeModule === 'messageRequests' && <MessageRequests />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunicationPage;
