import React from 'react';

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
  startVoiceCall: () => void;
  onChatSelect: (selectedChatId: string) => void;
}

const ChatUserList: React.FC<ChatListProps> = ({ chatData, startVoiceCall, onChatSelect }) => {
  return (
    <div className="w-full">
        {chatData.map((user) => (
            <div key={user.MessageID} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 transition duration-150 ease-in-out" onClick={() => onChatSelect(user.MessageAuthor)}>
                <img src={user.MessageAuthorImage} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-gray-200" />
                <div>
                    <div className="text-lg font-semibold">{user.MessageAuthor}</div>
                    <div className="text-xs text-gray-500">{user.MessageLastAction ? `${user.MessageLastAction.substring(0, 20)}...` : ''}</div>
                </div>
            </div>
        ))}
    </div>
  );
};

export default ChatUserList;
