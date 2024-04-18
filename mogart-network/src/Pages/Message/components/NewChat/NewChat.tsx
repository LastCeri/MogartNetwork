import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import { API_URL, PostStartChat } from '../../../../MogartBase/Api/Api';
import { useData } from '../../../../MogartBase/Context/DataContext';

interface Friend {
    id:string;
    name: string;
    status: string;
    image: string;
}

interface NewChatModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const NewChat: React.FC<NewChatModalProps> = ({ isOpen, setIsOpen}) => {
    const { isLoggedIn, isLoading, data,userAuthToken } = useData();
    const [friendsList, setFriendsList] = useState<Friend[]>([]);
    const [hasFriends, setHasFriends] = useState(true);
    
    const handleStartChat = async (friendid: any) => {
        const response = await PostStartChat({friendid,method:'startchat'},userAuthToken);
        setIsOpen(false)
      };
    
    useEffect(() => {
        const fetchFriends = async () => {
            if (!isLoggedIn || isLoading) return;
            try {
                const response = await axios.get(`${API_URL}/GetFriends/${data?.UserName}`, {
                    headers: {
                        'Authorization': `Bearer ${userAuthToken}`
                    }
                });                
                const friendsData = response.data[0]?.friends;
                if (friendsData && friendsData.length > 0) {
                    setFriendsList(friendsData);
                    setHasFriends(true);
                } else {
                    setHasFriends(false);
                }
            } catch (error) {
                console.error('An error occurred during the API request:', error);
            }
            
        };

        if (isOpen) {
            fetchFriends();
        }
    }, [isOpen, isLoggedIn, isLoading, data?.UserName]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-lg w-full">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Select a Friend</h2>
                    {hasFriends ? (
                        <div className="space-y-6 overflow-y-auto max-h-96 pr-2">
                            {friendsList.map((friend, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <img src={friend.image} alt={friend.name} className="w-14 h-14 rounded-full mr-4 shadow" />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{friend.name}</span>
                                            <span className={`mt-2 text-sm font-semibold ${friend.status === 'online' ? 'text-green-500' : friend.status === 'offline' ? 'text-red-500' : 'text-gray-400'}`}>
                                                {friend.status}
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={()=> handleStartChat(friend.id)} className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md px-5 py-2 focus:outline-none shadow transition duration-300 ease-in-out">
                                        <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-700 text-center">You have no friends to message.</p>
                    )}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-6 w-full bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none shadow-lg transition duration-300 ease-in-out"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
    
};

export default NewChat;
