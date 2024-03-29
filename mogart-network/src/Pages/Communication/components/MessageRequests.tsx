import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useData } from '../../../MogartBase/Context/DataContext';
import { API_URL } from '../../../MogartBase/Api/Api';
import { isValidMessageRequest } from '../../../MogartBase/Api/Sec-1/Checkers/MessageRequests';


export interface MessageRequests {
    ID: number;
    ReqAuthor: string;
    ReqAuthorImage: string;
    ReqContent: string;
    ReqDate: string;
    ReqResponse: string;
    ReqStatus: string; 
    ReqTitle: string;
    ReqType: string;
  }
  

const MessageRequests = () => {
 const [messages, setRequests] = useState<MessageRequests[]>([]);
 const { isLoggedIn, isLoading, data, userAuthToken } = useData();

 useEffect(() => {
  if (isLoading) {  return; }
  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get<MessageRequests[]>(`${API_URL}/GetRequest/${data?.UserName}/Message`, {
        headers: {
            'Authorization': `Bearer ${userAuthToken}`
        }
    });  

      if (!response.data || !Array.isArray(response.data) || response.data.some(invite => !isValidMessageRequest(invite))) {
        console.error('API response is not an array or contains invalid data');
        return;
      }
      
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch friend requests:', error);
    }
  };

  if (isLoggedIn) {
    fetchFriendRequests();
  }
}, [isLoading,isLoggedIn]);

  const handleAccept = (invitationId:any) => {
    console.log(`Accepted Message: ${invitationId}`);
  };

  const handleDecline = (invitationId:any) => {
    console.log(`Declined Message: ${invitationId}`);
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Message Requests</h2>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.ID} className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
            <img src={message.ReqAuthorImage} alt="Profile" className="w-20 h-20 rounded-full object-cover mr-4 mb-4 md:mb-0"/>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{message.ReqAuthor}</h3>
              <p className="text-sm text-gray-500">{message.ReqDate} | {message.ReqTitle}</p>
              <p className="mt-2 text-gray-700">{message.ReqContent}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-4 md:mt-0">
              <button onClick={() => handleAccept(message.ID)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded hover:from-blue-600 hover:to-blue-700 transition duration-150">Accept</button>
              <button onClick={() => handleDecline(message.ID)} className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded hover:from-red-600 hover:to-red-700 transition duration-150">Decline</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-800">No Message Requests at the moment.</p>
      )}
    </div>
  );
}
export default MessageRequests;
