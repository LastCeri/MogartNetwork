import React from 'react';

// ChatItem type and ChatListProps interface definition
type ChatItem = {
  id: string;
  name: string;
  message: string;
  profileImage: string;
};

interface ChatListProps {
  chatData: ChatItem[];
  startVoiceCall: () => void;
}

// Applying ChatListProps type to ChatList component
const ChatList: React.FC<ChatListProps> = ({ chatData, startVoiceCall }) => {
  return (
    <div className="w-full">
        {chatData.map((user) => (
            <div key={user.id} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 transition duration-150 ease-in-out">
                <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-gray-200" />
                <div>
                    <div className="text-lg font-semibold">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.message ? `${user.message.substring(0, 20)}...` : ''}</div>
                </div>
            </div>
        ))}
    </div>
  );
};

export default ChatList;
