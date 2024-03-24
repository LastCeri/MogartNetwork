import React, { useState } from 'react';

type ChatItem = {
  MessageID: string;
  MessageAuthor: string;
  MessageAuthorImage: string;
  MessageAuthorTo: string;
  MessageDate: string;
  MessageLastAction: string;
  MessageActions: string;
};

interface ChatListProps {
  chatData: ChatItem[];
  onChatSelect: (selectedChatId: string) => void;
}

const ChatUserList: React.FC<ChatListProps> = ({ chatData, onChatSelect }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleChatSelect = (userId: string) => {
    onChatSelect(userId);
    setSelectedUserId(userId);
  };

  return (
    <div className="w-full">
      {chatData.map((user) => (
        <div
          key={user.MessageID}
          className={`p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-4 transition duration-150 ease-in-out rounded-lg ${
            selectedUserId === user.MessageID ? 'bg-blue-50 border-l-4 border-blue-500 shadow-md' : 'bg-white'
          }`}
          onClick={() => handleChatSelect(user.MessageID)}
        >
          <img src={user.MessageAuthorImage} alt="Profile" className="w-16 h-16 rounded-full object-cover shadow-sm" />
          <div>
            <div className="text-lg font-semibold text-gray-800">{user.MessageAuthor}</div>
            <div className="text-sm text-gray-500">{user.MessageLastAction ? `${user.MessageLastAction.substring(0, 25)}...` : ''}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatUserList;
