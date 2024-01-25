import React from 'react';
import './Notification.css'; 

export enum MessageType {
  Error = 'error',
  Success = 'success',
  Info = 'info',
}

interface NotificationProps {
  type: MessageType;
  message: string;
}


const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  let typeClasses = "";

  switch (type) {
    case MessageType.Success:
      typeClasses = "bg-green-700 text-green-800 border-green-500";
      break;
    case MessageType.Error:
      typeClasses = "bg-red-700 text-red-800 border-red-500";
      break;
    case MessageType.Info:
      typeClasses = "bg-blue-700 text-blue-800 border-blue-500";
      break;
    default:
      typeClasses = "bg-gray-700 text-gray-800 border-gray-500";
  }

  return (
    <div 
    className={`notification fixed bottom-0 mb-5 mx-auto ${typeClasses} border-l-4 p-4 rounded shadow-lg transition transform ease-in-out duration-1000 scale-100 hover:shadow-2xl`}
    style={{ maxWidth: '95%', transformOrigin: 'left center', width: '200px' }}
  >
    {message}
  </div>
  );
};



export default Notification;
