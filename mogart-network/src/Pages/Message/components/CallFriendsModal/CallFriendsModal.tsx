import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../../../MogartBase/Api/Api';
import { useData } from '../../../../MogartBase/Context/DataContext';

interface Friend {
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
    onStartCall: (friendName: string, friendImage: string) => void;
    setIsOpen: (isOpen: boolean) => void;
}


const CallFriendsModal: React.FC<CallFriendsModalProps> = ({ isOpen, onStartCall, setIsOpen }) => {
    const { isLoggedIn, isLoading, data } = useData();
    const [friendsList, setFriendsList] = useState<Friend[]>([]);
    const [hasFriends, setHasFriends] = useState(true);

    useEffect(() => {
        const fetchFriends = async () => {
            if (!isLoggedIn || isLoading) return;

            try {
                const response = await axios.get(`${API_URL}/GetFriends/${data?.UserName}`);
                const friendsData = response.data[0]?.friends;
                if (friendsData && friendsData.length > 0) {
                    setFriendsList(friendsData);
                    setHasFriends(true);
                } else {
                    setHasFriends(false);
                }
            } catch (error) {
                console.error('Friends list fetching failed:', error);
                setHasFriends(false);
            }
        };

        if (isOpen) {
            fetchFriends();
        }
    }, [isOpen, isLoggedIn, isLoading, data?.UserName]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-4 max-w-md w-full">
                    <h2 className="text-lg font-semibold mb-4">Select a friend to call</h2>
                    {hasFriends ? (
                        <div className="space-y-2">
                            {friendsList.map((friend, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src={friend.image} alt={friend.name} className="w-10 h-10 rounded-full mr-2" />
                                        <div>
                                            <span>{friend.name}</span>
                                        </div>
                                        <span className={`text-sm ${friend.status === 'online' ? 'text-green-600' : friend.status === 'offline' ? 'text-red-600' : 'text-gray-600'}`}>
                                            {friend.status}
                                        </span>
                                    </div>
                                    <button onClick={() => onStartCall(friend.name, friend.image)} className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 focus:outline-none shadow-lg transition duration-150 ease-in-out">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>You have no friends to call.</div>
                    )}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-4 w-full bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 focus:outline-none shadow-lg transition duration-150 ease-in-out"
                    >
                        Close
                    </button>
                </div>
            </div>
    );
};

export default CallFriendsModal;
