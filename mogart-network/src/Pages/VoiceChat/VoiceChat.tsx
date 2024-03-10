import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import VoiceCallModal from './components/VoiceCall/VoiceCall';
import VoiceClient from '../../MogartBase/WebRTC/VoiceClient';
import CallFriendsModal from './components/CallFriendsModal/CallFriendsModal';
import IncomingCallModal from './components/IncomingCallModal/IncomingCallModal';
import config from '../../MogartBase/WebRTC/config';
import useWebSocket from '../../MogartBase/WebRTC/useWebSocket';
import { useData } from '../../MogartBase/Context/DataContext';
import { useNavigate } from 'react-router-dom';


interface VoiceChatProps {
    isCallModalOpen: boolean;
    setIsCallModalOpen: (isOpen: boolean) => void;
}


const VoiceChat: React.FC<VoiceChatProps> = ({ isCallModalOpen, setIsCallModalOpen }) => {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading, data } = useData();
    const [isCalling, setIsCalling] = useState(false);
    const [callStatus, setCallStatus] = useState('');
    const [callingFriendName, setCallingFriendName] = useState('');
    const [callingFriendImage, setCallingFriendImage] = useState('');
    const [isCallIncoming, setIsCallIncoming] = useState(false);

    const { sendMessage, isConnected } = useWebSocket(config.voiceChatServer, (event: any) => {
        console.log("WebSocket message received:", event.data);
    });

    useEffect(() => {
        if (isLoading) return;
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, isLoading, navigate, data?.UserName]);

    const handleStartCall = (friendName: string, friendImage: string) => {
        if (isConnected) {
            sendMessage({
                type: 'call-initiate',
                name: friendName,
                image: friendImage,
            });
        }
    };
        const simulateIncomingCall = () => {
        setIsCallIncoming(true);
    };

    return (
        <>
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
            <IncomingCallModal
                isOpen={isCallIncoming}
                callerName=""
                onAccept={() => {
                    setIsCallIncoming(false);
                }}
                onDecline={() => {
                    setIsCallIncoming(false);
                }}
            />
        </>
    );
};

export default VoiceChat;

