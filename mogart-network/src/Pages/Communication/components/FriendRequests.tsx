import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../MogartBase/Api/Api';

interface FriendRequest {
    id: number;
    name: string;
  }
  
const FriendRequests = () => {
 const [requests, setRequests] = useState<FriendRequest[]>([]);


  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/friend-requests`);
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch friend requests:', error);
    }
  };

  const handleAccept = async (requestId:any) => {
    try {
      await axios.post(`${API_URL}/friend-requests/accept`, { requestId });
      // Refresh the list of requests
      fetchFriendRequests();
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  };

  const handleReject = async (requestId:any) => {
    try {
      await axios.post(`${API_URL}/friend-requests/reject`, { requestId });
      // Refresh the list of requests
      fetchFriendRequests();
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request.id} className="flex items-center justify-between w-full max-w-md p-2 mb-2 border rounded">
            <span>{request.name}</span>
            <div>
              <button onClick={() => handleAccept(request.id)} className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600">Accept</button>
              <button onClick={() => handleReject(request.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>No friend requests at the moment.</p>
      )}
    </div>
  );
};

export default FriendRequests;
