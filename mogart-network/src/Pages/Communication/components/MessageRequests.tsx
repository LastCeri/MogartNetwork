import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useData } from '../../../MogartBase/Context/DataContext';
import { API_URL , ApiResponseError, PostAcceptMessageRequest, PostRejectMessageRequest } from '../../../MogartBase/Api/Api';
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
 const [acceptingId, setAcceptingId] = useState<number | null>(null);
 const [rejectingId, setRejectingId] = useState<number | null>(null);

 useEffect(() => {
  if (isLoading || !isLoggedIn)  return;

  const fetchMessageRequests = async () => {
    try {
      setRequests([]);
      const response = await axios.get<MessageRequests[] | ApiResponseError>(`${API_URL}/GetRequest/${data?.UserName}/Message`, {
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
        } else if (isValidMessageRequest(item)) {
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

  if (!isLoading || isLoggedIn) fetchMessageRequests();
}, [isLoading,isLoggedIn]);

  const handleAccept = async (requestId:any) => {
    if (!data?.UserName) return;
    try {
      const acceptresponse = await PostAcceptMessageRequest({ UserName: data.UserName, RequestId:requestId, type:"Message", codex:"0x17" },userAuthToken);
      if (acceptresponse[0].status && acceptresponse[0].send) {
        setAcceptingId(requestId);
        setTimeout(() => {
          setRequests(prev => prev.filter(request => request.ID !== requestId));
          setAcceptingId(null);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to accept AcceptMessageRequest:', error);
    }
  };

  const handleDecline = async (requestId:any) => {
    if (!data?.UserName) return;
    try {
      const rejectresponse = await PostRejectMessageRequest({ UserName: data.UserName, RequestId:requestId, type:"Message", codex:"0x19" },userAuthToken);
      if (rejectresponse[0].status && rejectresponse[0].send) {
        setRejectingId(requestId);
        setTimeout(() => {
          setRequests(prev => prev.filter(request => request.ID !== requestId));
          setRejectingId(null);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to reject RejectMessageRequest:', error);
    }
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Message Requests</h2>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.ID} className={`flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out p-4 ${acceptingId === message.ID ? 'fade-out-bounce' : rejectingId === message.ID ? 'fade-out-reject' : ''}`}>
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
