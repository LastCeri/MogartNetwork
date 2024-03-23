import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface MessageRequests {
    id: number;
    name: string;
    date: string;
    location: string;
    description: string;
  }
  

const MessageRequests = () => {
 const [messages, setRequests] = useState<MessageRequests[]>([]);


  useEffect(() => {
    fetchMessageRequests();
  }, []);

  const fetchMessageRequests = async () => {
    setRequests([
      { id: 1, name: 'Spring Gathering', date: '2024-04-15', location: 'Central Park', description: 'Join us for a fun day out in the sun to welcome the spring season!' },
      { id: 2, name: 'Tech Conference 2024', date: '2024-05-20', location: 'Tech Arena', description: 'A gathering of tech enthusiasts to explore the latest in technology.' }
    ]);
  };

  const handleAccept = (invitationId:any) => {
    console.log(`Accepted Message: ${invitationId}`);
  };

  const handleDecline = (invitationId:any) => {
    console.log(`Declined Message: ${invitationId}`);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Message Requests</h2>
      {messages.map((messages) => (
        <div key={messages.id} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-xl font-bold">{messages.name}</h3>
            <p className="text-sm text-gray-500">{messages.date} | {messages.location}</p>
            <p className="mt-2 text-gray-700">{messages.description}</p>
          </div>
          <div className="flex justify-end space-x-2 p-4 border-t">
            <button onClick={() => handleAccept(messages.id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150">Accept</button>
            <button onClick={() => handleDecline(messages.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150">Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageRequests;
