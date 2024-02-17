import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import ChatList from './components/ChatList/ChatList';
import VoiceCallModal from './components/VoiceCall/VoiceCall'; 
import VoiceClient from '../../MogartBase/WebRTC/VoiceClient';

// Example DATA
const initialChatData = [
    { id: '1', name: 'User 1', message: 'Hello, how are you?', profileImage: 'https://via.placeholder.com/50' },
    { id: '2', name: 'User 2', message: 'What is the current status of the project?', profileImage: 'https://via.placeholder.com/50' },
    { id: '3', name: 'User 3', message: 'The meeting is tomorrow at 10:00.', profileImage: 'https://via.placeholder.com/50' },
    { id: '4', name: 'User 4', message: 'I sent the report, could you please check it?', profileImage: 'https://via.placeholder.com/50' },
    { id: '5', name: 'User 5', message: 'Have you seen the new tasks?', profileImage: 'https://via.placeholder.com/50' },
];

const MessagePage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading } = useData();
    const [chatData, setChatData] = useState(initialChatData);
    const [isCalling, setIsCalling] = useState(false); 
    const [callStatus, setCallStatus] = useState('');

    useEffect(() => {
        if (isLoading) return;

        // Ensure isLoggedIn is checked before navigation
        if (!isLoggedIn) {
            navigate('/login');
        }
        // Call VoiceClient unconditionally
    }, [isLoggedIn, isLoading, navigate]);

    const startVoiceCall = () => {
        setIsCalling(true);
        setCallStatus('Bağlanıyor...');

        setTimeout(() => {
            setCallStatus('Çalıyor...');
            setTimeout(() => {
                setCallStatus('Arama başladı');
            }, 3000); 
        }, 2000);
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
                                        <button onClick={startVoiceCall} className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition duration-150 ease-in-out transform hover:-translate-y-1">
                                            Call
                                        </button>
                                        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition duration-150 ease-in-out transform hover:-translate-y-1">
                                            New Chat
                                        </button>
                                    </div>
                                </div>
                            <div className="w-full">
                                <ChatList chatData={chatData} startVoiceCall={startVoiceCall} />
                                <VoiceClient shouldRender={isLoggedIn} /> {/* VoiceClient component is called here */}
                                <VoiceCallModal isCalling={isCalling} callStatus={callStatus} setIsCalling={setIsCalling} name='User 1' profileImage='https://cdn.discordapp.com/attachments/1188239847408803891/1200054787408932924/EmilyClark.png' />
                            </div>
                        </div>
                        <div className="w-2/3 bg-white overflow-y-auto shadow-lg rounded-lg">
                            <div className="flex flex-col h-full">
                                <div className="flex-1 overflow-y-auto">
                                    {/* Chat messages go here */}
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
