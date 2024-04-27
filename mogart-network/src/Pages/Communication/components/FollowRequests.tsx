import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, ApiResponseError, PostAcceptFollowRequest, PostRejectFollowRequest } from '../../../MogartBase/Api/Api';
import { useData } from '../../../MogartBase/Context/DataContext';
import { isValidFriendRequest } from '../../../MogartBase/Api/Sec-1/Checkers/FriendRequestChecker';

export interface FollowRequest {
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
  
const FollowRequests = () => {
 const [requests, setRequests] = useState<FollowRequest[]>([]);
 const { isLoggedIn, isLoading, data, userAuthToken } = useData();
 const [acceptingId, setAcceptingId] = useState<number | null>(null);
 const [rejectingId, setRejectingId] = useState<number | null>(null);

 useEffect(() => {
  if (isLoading || !isLoggedIn)  return;

  const fetchFollowRequests = async () => {
    try {
      setRequests([]);
      const response = await axios.get<FollowRequest[] | ApiResponseError>(`${API_URL}/GetRequest/${data?.UserName}/Follow`, {
        headers: {
            'Authorization': `Bearer ${userAuthToken}`
        }
      });  

    if (Array.isArray(response.data)) {
      response.data.forEach(item => {
        if ('IsNull' in item && item.IsNull) {
          setRequests([]);
          return;
        } else if ('ErrorMessage' in item && 'ErrorCode' in item) {
          console.error(`Server error: ${item.ErrorMessage} (Code: ${item.ErrorCode})`);
          setRequests([]);
          return;
        } else if (isValidFriendRequest(item)) {
          setRequests(prev => {
            const exists = prev.some(request => request.ID === item.ID);
            return exists ? prev : [...prev, item];
          });
        }
      });
      } else {
        console.error('API response is not an array or contains invalid data');
        setRequests([]);
      }
    } catch (error) {
      console.error('Failed to fetch friend requests:', error);
    }
  };

  if (!isLoading || isLoggedIn) fetchFollowRequests();
}, [isLoading,isLoggedIn]);

  const handleAccept = async (requestId:any) => {
    if (!data?.UserName) return;
    try {
      const acceptresponse = await PostAcceptFollowRequest({ UserName: data.UserName, RequestId:requestId, type:"Follow", codex:"0x17" },userAuthToken);
      if (acceptresponse[0].status && acceptresponse[0].send) {
        setAcceptingId(requestId);
        setTimeout(() => {
          setRequests(prev => prev.filter(request => request.ID !== requestId));
          setAcceptingId(null);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to accept AcceptFollowRequest:', error);
    }
  };

  const handleReject = async (requestId:any) => {
    if (!data?.UserName) return;
    try {
      const rejectresponse = await PostRejectFollowRequest({ UserName: data.UserName, RequestId:requestId, type:"Follow", codex:"0x19" },userAuthToken);
      if (rejectresponse[0].status && rejectresponse[0].send) {
        setRejectingId(requestId);
        setTimeout(() => {
          setRequests(prev => prev.filter(request => request.ID !== requestId));
          setRejectingId(null);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to reject RejectFollowRequest:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 items-center min-h-screen">
      <h2 className="text-2xl font-semibold text-center">Follow Requests</h2>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {requests.map((request) => (
              <div key={request.ID} className={`bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm hover:shadow-xl transition duration-300 ease-in-out ${acceptingId === request.ID ? 'fade-out-bounce' : rejectingId === request.ID ? 'fade-out-reject' : ''}`}>
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

export default FollowRequests;
