import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../MogartBase/Api/Api';
import { useData } from '../../../MogartBase/Context/DataContext';
import { isValidFriendRequest } from '../../../MogartBase/Api/Sec-1/Checkers/FriendRequestChecker';

export interface FriendRequest {
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
  
const FriendRequests = () => {
 const [requests, setRequests] = useState<FriendRequest[]>([]);
 const { isLoggedIn, isLoading, data, userAuthToken } = useData();

 useEffect(() => {
  if (isLoading) {  return; }
  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get<FriendRequest[]>(`${API_URL}/GetRequest/${data?.UserName}/Friend`, {
        headers: {
            'Authorization': `Bearer ${userAuthToken}`
        }
    });  

      if (!response.data || !Array.isArray(response.data) || response.data.some(invite => !isValidFriendRequest(invite))) {
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

  const handleAccept = async (requestId:any) => {
    try {
      await axios.post(`${API_URL}/friend-requests/accept`, { requestId });
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  };

  const handleReject = async (requestId:any) => {
    try {
      await axios.post(`${API_URL}/friend-requests/reject`, { requestId });
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 items-center min-h-screen">
      <h2 className="text-2xl font-semibold text-center">Friend Requests</h2>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {requests.map((request) => (
            <div key={request.ID} className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img src={request.ReqAuthorImage} alt="Profile" className="w-full h-56 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900">{request.ReqAuthor}</h3>
                <p className="text-sm text-gray-500 mb-4">{request.ReqDate}</p>
                <h4 className="text-md text-gray-700 font-semibold">{request.ReqTitle}</h4>
                <p className="text-gray-600 mb-4">{request.ReqContent}</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => handleAccept(request.ID)} className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 shadow-lg transition duration-300 ease-in-out">
                    Accept
                  </button>
                  <button onClick={() => handleReject(request.ID)} className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 shadow-lg transition duration-300 ease-in-out">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-800">No friend requests at the moment.</p>
      )}
    </div>
  );
  
  
};

export default FriendRequests;
