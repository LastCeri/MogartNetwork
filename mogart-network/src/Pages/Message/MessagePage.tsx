import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import VoiceCallModal from './components/VoiceCall/VoiceCall';
import VoiceClient from '../../MogartBase/WebRTC/VoiceClient';
import CallFriendsModal from './components/CallFriendsModal/CallFriendsModal';
import IncomingCallModal from './components/IncomingCallModal/IncomingCallModal';
import config from '../../MogartBase/WebRTC/config';
import useWebSocket from '../../MogartBase/WebRTC/useWebSocket';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import axios from 'axios';
import { API_URL } from '../../MogartBase/Api/Api';
import ChatUserList from './components/ChatUserList/ChatUserList';

export interface ChatData {
  MessageID: string;
  MessageAuthor: string;
  MessageAuthorImage: string;
  MessageAuthorTo: string;
  MessageDate: string;
  MessageLastAction: string;
  MessageActions: string;
}

const MessagePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, data } = useData();
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState('');
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callingFriendName, setCallingFriendName] = useState(''); 
  const [callingFriendImage, setCallingFriendImage] = useState(''); 
  const [isCallIncoming, setIsCallIncoming] = useState(false); 
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]); 
  const [currentMessage, setCurrentMessage] = useState('');

    const { sendMessage, isConnected } = useWebSocket(config.voiceChatServer, (event:any) => {
        console.log("WebSocket message received:", event.data);
    });

    useEffect(() => {
        if (isLoading) return;
        if (!isLoggedIn) {
            navigate('/login');
        }
        const fetchChatData = async () => {
            try {
                const response = await axios.get<ChatData[]>(`${API_URL}/ChatData/${data?.UserName}`);
                setChatData(response.data);
            } catch (error) {
                console.error('Chat data fetching failed:', error);
            }
        };

        fetchChatData();
    }, [isLoggedIn, isLoading, navigate, data?.UserName]);

    const startVoiceCall = () => {
        setIsCallModalOpen(true);
      };

      const handleStartCall = (friendName: string, friendImage: string) => {
        if (isConnected) {
            sendMessage({
                type: 'call-initiate',
                name: friendName,
                image: friendImage,
            });
        }
    };

    const handleChatSelect = async (selectedChatId:any) => {
        setSelectedChatId(selectedChatId); 
        try {
          const response = await axios.get(`${API_URL}/ChatData/${data?.UserName}/Messages/${selectedChatId}`);
          setMessages(response.data); 
        } catch (error) {
          console.error('Fetching messages failed:', error);
        }
      };
      
      if (isLoading) return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
    </div>;

    const simulateIncomingCall = () => {
        setIsCallIncoming(true);
    };
    return (
        <>
            <Header />
            <Navbar />
            <div className="flex flex-col pl-16 pt-16 bg-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 45px)' }}>
                <div className="flex flex-grow">
                    <div className="flex w-full h-full">
                        <div className="w-1/3 overflow-y-auto border-r border-gray-300 bg-white">
                            <div className="p-4 flex justify-between items-center border-b border-gray-300">
                                <h2 className="text-lg font-semibold">Chats</h2>
                                <div className="space-x-2">
                                    <button onClick={startVoiceCall} className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition duration-150 ease-in-out">
                                        <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                        Call
                                    </button>
                                    <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition duration-150 ease-in-out">
                                        <FontAwesomeIcon icon={faCommentAlt} className="mr-2" />
                                        New Chat
                                    </button>
                                </div>
                            </div>
                            <ChatUserList chatData={chatData} startVoiceCall={startVoiceCall} onChatSelect={handleChatSelect} />
                            <VoiceClient shouldRender={isLoggedIn} />
                            <VoiceCallModal 
                                isCalling={isCalling} 
                                callStatus={callStatus} 
                                setIsCalling={setIsCalling} 
                                name={callingFriendName}
                                profileImage={callingFriendImage}
                                isRinging={false} 
                            />
                            <CallFriendsModal 
                                isOpen={isCallModalOpen} 
                                onStartCall={handleStartCall} 
                                setIsOpen={setIsCallModalOpen} 
                            />
                        </div>
                        <div className="w-2/3 bg-white overflow-y-auto shadow-lg rounded-lg">
                            <div className="flex flex-col h-full">
                                <div className="flex-1 overflow-y-auto">
                                    {messages.map((message, index) => (
                                            <div key={index}>{message.MessageContent}</div>
                                        ))}
                                </div>
                                <div className="border-t border-gray-300 p-4 flex items-center">
                                    <input
                                        type="text"
                                        className="flex-1 rounded-full border-gray-300 p-2 mr-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Type a message..."
                                    />
                                    <button className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg transition duration-150 ease-in-out"> 
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>         
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessagePage;
