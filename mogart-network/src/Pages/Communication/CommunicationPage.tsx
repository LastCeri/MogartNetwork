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


export interface RequestsNull{
  RequestsAuthor: string;
  Requests:string;
  IsNull: boolean;
}

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
        <div className="md:w-1/4 lg:w-1/5 bg-white text-gray-800 overflow-auto ml-20 shadow-xl rounded-lg">
          <div className="p-5">
            <h2 className="text-3xl font-bold mb-5 text-gray-900">Communication Requests</h2>
            <div className="space-y-4">
              <button onClick={() => setActiveModule('friendRequests')} className={`w-full text-left font-medium py-4 px-6 rounded-lg transition duration-300 ease-in-out shadow-md ${activeModule === 'friendRequests' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:shadow-lg`}>
                Friend Requests
              </button>
              <button onClick={() => setActiveModule('followRequests')} className={`w-full text-left font-medium py-4 px-6 rounded-lg transition duration-300 ease-in-out shadow-md ${activeModule === 'followRequests' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:shadow-lg`}>
                Follow Requests
              </button>
              <button onClick={() => setActiveModule('eventRequests')} className={`w-full text-left font-medium py-4 px-6 rounded-lg transition duration-300 ease-in-out shadow-md ${activeModule === 'eventRequests' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:shadow-lg`}>
                Event Invitations
              </button>
              <button onClick={() => setActiveModule('groupRequests')} className={`w-full text-left font-medium py-4 px-6 rounded-lg transition duration-300 ease-in-out shadow-md ${activeModule === 'groupRequests' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:shadow-lg`}>
                Group Invitations
              </button>
              <button onClick={() => setActiveModule('messageRequests')} className={`w-full text-left font-medium py-4 px-6 rounded-lg transition duration-300 ease-in-out shadow-md ${activeModule === 'messageRequests' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:shadow-lg`}>
                Message Requests
              </button>
            </div>
          </div>
        </div>
  
        <div className="flex-1 flex flex-col">
          <div className="bg-white p-5 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900">Requests List</h3>
          </div>
  
          <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
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
