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
  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
