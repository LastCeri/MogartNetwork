import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faPhone, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../MogartBase/Api/Api';
import ChatUserList from './components/ChatUserList/ChatUserList';
import VoiceChat from '../VoiceChat/VoiceChat';
import axios from 'axios';

const MessagePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, data } = useData();
  const [chatData, setChatData] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [contextMenuContent, setContextMenuContent] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [longPressTimeoutId, setLongPressTimeoutId] = useState(null);
  
  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      navigate('/login');
    } 
    const fetchChatData = async () => {
      try {
        const response = await axios.get(`${API_URL}/ChatData/${data?.UserName}`);
        setChatData(response.data);
      } catch (error) {
        console.error('Chat data fetching failed:', error);
      }
    };

    fetchChatData();
  }, [isLoggedIn, isLoading, navigate, data?.UserName]);

  const handleChatSelect = async (selectedChatId: any) => {
    setSelectedChatId(selectedChatId);
    try {
      const response = await axios.get(`${API_URL}/ChatData/${data?.UserName}/Messages/${selectedChatId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Fetching messages failed:', error);
    }
  };

  const SendMessage = async (selectedChatId: any, messageContent: string) => {
    if (!selectedChatId || !messageContent) {
      console.error('Selected chat or message content is missing.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/ChatData/${data?.UserName}/SendMessage`, {
        chatId: selectedChatId,
        content: messageContent
      });
      const newMessage = response.data;
      setMessages(prevMessages => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Sending message failed:', error);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
  </div>;

  const copyMessage = (messageContent: any) => {
    navigator.clipboard.writeText(messageContent);
    alert("Message copied!");
  };

  const forwardMessage = (messageContent: any) => {
    navigator.clipboard.writeText(messageContent);
    alert("The message is ready to be delivered!");
  };

  const handleSelectMessage = (messageId: any, messageContent: string) => {
    console.log('Selected Message ID:', messageId);
    
    setSelectedMessageId(messageId);
    setContextMenuContent(messageContent);
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(selectedMessages.filter(id => id !== messageId));
    } else {
      setSelectedMessages([...selectedMessages, messageId]);
    }
  };


  const ContextMenu = () => {
    if (!showContextMenu) return null;
    return (
      <div className="absolute z-10 right-0 bottom-0 mb-4 mr-4 top-10 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h1 className="text-lg font-semibold text-gray-900 px-4 py-2 border-b border-gray-200">Smart Bar</h1>
        <button onClick={copyMessage} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
          Copy
        </button>
        <button onClick={forwardMessage} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
          Forward
        </button>
      </div>
    );
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
                  <button
                    onClick={() => setIsCallModalOpen(true)}
                    className="inline-flex items-center bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition duration-150 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    Call
                  </button>
                  <button
                    onClick={() => {}}
                    className="inline-flex items-center bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition duration-150 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faCommentAlt} className="mr-2" />
                    New Chat
                  </button>
                </div>
              </div>
              <VoiceChat isCallModalOpen={isCallModalOpen} setIsCallModalOpen={setIsCallModalOpen} />
              <ChatUserList chatData={chatData} onChatSelect={handleChatSelect} />
            </div>
            <div className="w-2/3 bg-white overflow-y-auto shadow-lg rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">
                  {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`message-container relative flex items-center cursor-pointer p-3 my-2 mx-4 rounded-lg transition-all duration-200 ease-in-out ${
                            selectedMessages.includes(message.MessageID) ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-white border border-gray-200'
                          }`}
                          onClick={() => handleSelectMessage(message.MessageID, message.MessageContent)}
                        >
                          <div
                            className={`ml-4 ${selectedMessages.includes(message.MessageID) ? 'text-green-500' : 'opacity-0'}`}
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </div>
                          <div
                            className={`message flex items-center rounded-lg shadow-sm p-4 ${
                              message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            <p>{message.MessageContent}</p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
              <div className="border-t border-gray-300 p-4 flex items-center">
                <input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="flex-1 rounded-full border-gray-300 p-2 mr-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type a message..."
                />
                <button
                  className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => SendMessage(selectedChatId, messageContent)}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagePage;
