import React, { useState, useEffect } from 'react';
import VoiceCallModal from './components/VoiceCall/VoiceCall';
import CallFriendsModal from './components/CallFriendsModal/CallFriendsModal';
import IncomingCallModal from './components/IncomingCallModal/IncomingCallModal';
import { useData } from '../../MogartBase/Context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useVoiceCall } from '../../MogartBase/Context/VoiceCallProvider';
import { RTCStartCallPack } from '../../MogartBase/WebRTC/Packs/RTCStartCallPack';


interface VoiceChatProps {
    isCallModalOpen: boolean;
    setIsCallModalOpen: (isOpen: boolean) => void;
}


const VoiceChat: React.FC<VoiceChatProps> = ({ isCallModalOpen, setIsCallModalOpen }) => {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading, data } = useData();
    const { startCall, isCallModalOpen: isVoiceCallModalOpen, setCallStatus: setVoiceCallStatus } = useVoiceCall();
    const [isCalling, setIsCalling] = useState(false);
    const [callStatus, setCallStatus] = useState('');
    const [callingFriendName, setCallingFriendName] = useState('');
    const [callingFriendImage, setCallingFriendImage] = useState('');
    const [isCallIncoming, setIsCallIncoming] = useState(false);

    useEffect(() => {
        if (isLoading) return;
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, isLoading, navigate, data?.UserName]);

    const handleStartCall = async (friendName: string, friendImage: string, friendId: string) => {
  
        const callPacket = await RTCStartCallPack(friendName, friendId);
        startCall(callPacket);
    
        setCallingFriendName(friendName);
        setCallingFriendImage(friendImage);
        setIsCallModalOpen(false);
        setIsCalling(true);
        setCallStatus('Calling...');
    };
    

    return (
        <>
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

