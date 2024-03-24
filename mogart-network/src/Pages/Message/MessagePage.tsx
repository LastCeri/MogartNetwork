import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faPhone, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../MogartBase/Api/Api';
import ChatUserList from './components/ChatUserList/ChatUserList';
import VoiceChat from '../VoiceChat/VoiceChat';
import axios from 'axios';

interface ChatMessageDetail {
  MessageID: string;
  Sender: string;
  messageText: string;
  messageVideoUrlList: string;
  messageUrlList: string;
  messageImageList: string;
  messageTimeStamp: string;
}

interface ChatMessage {
  MessageID: string;
  MessageAuthor: string;
  MessageAuthorImage: string;
  MessageAuthorTo: string;
  MessageContent: string; 
  MessageDate: string;
  MessageLastAction: string;
  MessageActions: string;
}

const MessagePage = () => {
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const { isLoggedIn, isLoading, data,userAuthToken } = useData();
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageDetail[]>([]);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [longPressTimeoutId, setLongPressTimeoutId] = useState<number | null>(null);
  const [longPress, setLongPress] = useState(false);

  useEffect(() => {
    if (longPress) {
      setShowContextMenu(true);
      setLongPress(false); 
    }
  }, [longPress]);
  
  useEffect(() => {
    if (longPress) {
      setShowContextMenu(true);
      setLongPress(false);
    }
  }, [longPress]);

  const handleMouseDown = (messageId: string) => {
    setLongPressTimeoutId(window.setTimeout(() => {
      setLongPress(true);
      setSelectedMessageId(messageId);
    }, 500) as unknown as number);
  };
  
  const handleMouseUp = () => {
    if (longPressTimeoutId !== null) {
      clearTimeout(longPressTimeoutId);
      setLongPressTimeoutId(null);
  
      if (longPress) {
        setShowContextMenu(true); 
        setLongPress(false);
      }
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  
    const fetchChatData = async () => {
      try {
        const response = await axios.get(`${API_URL}/ChatData/${data?.UserName}`, {
          headers: {
              'Authorization': `Bearer ${userAuthToken}`
          }
      });  
        setChatData(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ERR_NETWORK") {
            console.error('Network error:', error);
            navigate('/NetworkError');
          } else if (error.response) {
            console.error('Chat data fetching failed:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
        } else {
          console.error('An unexpected error occurred', error);
        }
      }
    };
    fetchChatData();
  }, [isLoggedIn, isLoading, navigate, data?.UserName]);


  const fetchMoreData = async () => {
    try {
      const response = await axios.get(`${API_URL}/ChatData/${data?.UserName}`);
      const newMessages = response.data;

      if (newMessages.length === 0 || newMessages.length < 0) {
        setHasMore(false); 
        return;
      }

      setChatData(prevMessages => [...prevMessages, ...newMessages]);
    } catch (error) {
      console.error('Fetching more messages failed:', error);
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

const handleChatSelect = async (selectedChatId: string) => {
    setSelectedChatId(selectedChatId);
    try {
      const response = await axios.get<ChatMessage[]>(`${API_URL}/ChatData/${data?.UserName}/Messages/${selectedChatId}`);
      const firstMessage = response.data[0];
      if (firstMessage && firstMessage.MessageContent) {
        const parsedContent = JSON.parse(firstMessage.MessageContent) as ChatMessageDetail[];
        setMessages(parsedContent);
      } else {
        console.error("MessageContent is undefined or not in expected format");
      }
    } catch (error) {
      console.error('Fetching messages failed:', error);
    }
  };
  
  const handleMessageSelect = async (selectedChatId: any) => {
    setSelectedMessages(selectedChatId);
   
  };
  const ContextMenu = () => {

    interface Position {
      x: number;
      y: number;
    }
    
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rel, setRel] = useState<Position | null>(null);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !rel) return;
    
        let newX = e.pageX - rel.x;
        let newY = e.pageY - rel.y;
    
        const menuWidth = document.getElementById('contextMenu')?.offsetWidth || 0;
        const menuHeight = document.getElementById('contextMenu')?.offsetHeight || 0;
    
        newX = Math.min(window.innerWidth - menuWidth, Math.max(0, newX));
        newY = Math.min(window.innerHeight - menuHeight, Math.max(0, newY));
    
        setPosition({ x: newX, y: newY });
    };
    
    

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, rel]);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.button !== 0) return; 
      const pos: Position = {
        x: e.pageX - position.x,
        y: e.pageY - position.y,
      };
      setRel(pos);
      setIsDragging(true);
      e.stopPropagation();
      e.preventDefault();
    };
    

    if (!showContextMenu || !selectedMessageId) return null;
    const selectedMessage = messages.find(message => message.MessageID === selectedMessageId);

    const handleCopyMessage = () => {
      if (!selectedMessage) return;
      navigator.clipboard.writeText(selectedMessage.messageText);
      handleMessageSelect("");
      setShowContextMenu(false);
    };

    const handleForwardMessage = () => {
      if (!selectedMessage) return;
      console.log("Forwarding message:", selectedMessage.messageText);
      setShowContextMenu(false);
    };

    return (
      <div className="absolute z-20 bg-white rounded-md shadow-xl overflow-hidden" id="contextMenu" style={{ left: `${position.x}px`, top: `${position.y}px`, cursor: isDragging ? 'grabbing' : 'grab' }} 
      onMouseDown={onMouseDown}>
        
        <h1 className="text-xl font-semibold text-gray-900 bg-gray-100 px-6 py-3">Smart Bar</h1>
        <ul className="flex flex-col">
          <li>
            <button onClick={handleCopyMessage} className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
              Copy
            </button>
          </li>
          <li>
            <button onClick={handleForwardMessage} className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
              Forward
            </button>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col pl-16 pt-16 bg-gray-100 h-screen min-h-screen">
        <div className="flex flex-grow">
          <div className="flex w-full h-full">
            <div className="w-1/3 overflow-y-auto border-r border-gray-300 bg-white">
                <div className="p-5 flex justify-between items-center bg-white shadow-sm border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Chats</h2>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsCallModalOpen(true)}
                      className="flex items-center justify-center bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full px-4 py-2 hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 shadow transition duration-200 ease-in-out transform hover:scale-105"
                    >
                      <FontAwesomeIcon icon={faPhone} className="text-lg mr-2" />
                      <span>Call</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full px-4 py-2 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow transition duration-200 ease-in-out transform hover:scale-105"
                    >
                      <FontAwesomeIcon icon={faCommentAlt} className="text-lg mr-2" />
                      <span>New Chat</span>
                    </button>
                  </div>
                </div>
                  <VoiceChat isCallModalOpen={isCallModalOpen} setIsCallModalOpen={setIsCallModalOpen} />
                  <ChatUserList chatData={chatData} onChatSelect={handleChatSelect} />
                </div>
                <div className="w-2/3 bg-white overflow-hidden shadow-lg rounded-lg flex flex-col h-screem">
                <InfiniteScroll
                     dataLength={chatData.length}
                     next={fetchMoreData}
                     hasMore={hasMore}
                    loader={hasMore ? <h4 className=' text-center text-lg text-purple-600 font-semibold ml-4'>Loading...</h4> : null}
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>Yay! All Message Read.</b>
                      </p>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                  <div className="flex-1 overflow-y-auto p-4 bg-white" id="scrollableDiv">
                  {messages.map((message, index) => {
                      const isUserMessage = message.Sender === data?.UserName;
                      const isSelected = selectedMessages.includes(message.MessageID);
                      const messageClasses = `relative z-10 max-w-2xl w-full p-4 rounded-lg shadow ${
                        isUserMessage ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border border-gray-300'
                      } ${isSelected ? (isUserMessage ? 'border-r-4 border-green-700' : 'border-l-4 border-green-500') : ''}`;
                      const iconPosition = isUserMessage ? '-top-3 -right-3' : '-top-3 -left-3';
                      return (
                        <div
                          key={index}
                          onMouseDown={() => handleMouseDown(message.MessageID)}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp} 
                          className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} my-2`}
                        >
                          <div
                            className={messageClasses}
                            onClick={() => handleMessageSelect(message.MessageID)}
                            style={{ cursor: 'pointer' }}
                          >
                            {isSelected && (
                              <div className={`absolute ${iconPosition}`}>
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                              </div>
                            )}
                            <p className="whitespace-pre-line break-words">{message.messageText}</p>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  </InfiniteScroll>
                  
                  <div className="flex-none border-t border-gray-200 p-4 flex items-center">
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
                    <ContextMenu/>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default MessagePage;
