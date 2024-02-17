import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

//Example DATA
const initialChatData = [
    { id: '1', name: 'User 1', message: 'Hello, how are you?', profileImage: 'https://via.placeholder.com/50' },
    { id: '2', name: 'User 2', message: 'What is the current status of the project?', profileImage: 'https://via.placeholder.com/50' },
    { id: '3', name: 'User 3', message: 'The meeting is tomorrow at 10:00.', profileImage: 'https://via.placeholder.com/50' },
    { id: '4', name: 'User 4', message: 'I sent the report, could you please check it?', profileImage: 'https://via.placeholder.com/50' },
    { id: '5', name: 'User 5', message: 'Have you seen the new tasks?', profileImage: 'https://via.placeholder.com/50' },
];

const MessagePage = () => {
    const navigate = useNavigate();
    const { isLoggedIn,isLoading } = useData();
    const [chatData, setChatData] = useState(initialChatData);

    useEffect(() => {
        if (isLoading) return;
      if (!isLoggedIn) {
        navigate('/login');
      }
    }, [isLoggedIn, navigate]);

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
                                <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 mt-14">
                                    New Chat
                                </button>
                            </div>
                            <div className="w-full">
                                {chatData.map((user) => (
                                    <div key={user.id} className="p-4 hover:bg-gray-200 cursor-pointer flex items-center gap-4">
                                    <img src={user.profileImage} alt="Profile" className="w-20 h-20 rounded-full p-5" />
                                    <div>
                                        <div className="text-sm font-semibold">{user.name}</div>
                                        <div className="text-xs text-gray-600">{user.message ? `${user.message.substring(0, 20)}...` : ''}</div>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-2/3 bg-white overflow-y-auto">
                            <div className="flex flex-col h-full">
                                <div className="flex-1 overflow-y-auto">
                                
                                </div>
                                <div className="border-t border-gray-300 p-4 flex items-center">
                                    <input
                                        type="text"
                                        className="flex-1 rounded-full border-gray-300 p-2 mr-2 shadow-sm"
                                        placeholder="Type a message..."
                                    />
                                    <button className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 shadow-md"> 
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
