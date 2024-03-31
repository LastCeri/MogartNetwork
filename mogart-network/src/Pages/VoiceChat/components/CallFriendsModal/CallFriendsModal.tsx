import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../../../MogartBase/Api/Api';
import { useData } from '../../../../MogartBase/Context/DataContext';

interface Friend {
    id:string;
    name: string;
    status: string;
    image: string;
}

interface User {
    name: string;
    profileImage: string;
    friends: Friend[];
}

interface CallFriendsModalProps {
    isOpen: boolean;
    onStartCall: (friendName: string, friendImage: string,friendid: string) => void;
    setIsOpen: (isOpen: boolean) => void;
}


const CallFriendsModal: React.FC<CallFriendsModalProps> = ({ isOpen, onStartCall, setIsOpen }) => {
    const { isLoggedIn, isLoading, data,userAuthToken } = useData();
    const [friendsList, setFriendsList] = useState<Friend[]>([]);
    const [hasFriends, setHasFriends] = useState(true);

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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full">
                <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Select a friend to call</h2>
                {hasFriends ? (
                    <div className="space-y-4 overflow-y-auto max-h-80">
                    {friendsList.map((friend, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow transition-all duration-200 ease-in-out hover:shadow-lg transform hover:-translate-y-1">
                        <div className="flex items-center">
                            <img src={friend.image} alt={friend.name} className="w-12 h-12 rounded-full mr-3 shadow" />
                            <div className="flex flex-col">
                            <span className="font-medium text-gray-800">{friend.name}</span>
                            <span className={`mt-1 text-sm font-semibold ${friend.status === 'online' ? 'text-green-500' : friend.status === 'offline' ? 'text-red-500' : 'text-gray-500'}`}>
                                {friend.status}
                            </span>
                            </div>
                        </div>
                        <button onClick={() => onStartCall(friend.name, friend.image,friend.id)} className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 focus:outline-none shadow transition duration-200 ease-in-out">
                            <FontAwesomeIcon icon={faPhone} className="text-lg" />
                        </button>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">You have no friends to call.</p>
                )}
                <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 focus:outline-none shadow-lg transition duration-200 ease-in-out"
                >
                    Close
                </button>
                </div>
            </div>
            </div>
    );
};

export default CallFriendsModal;
