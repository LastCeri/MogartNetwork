import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VoiceCallSidebar from '../VoiceCallSidebar/VoiceCallSidebar';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import UserCallModal from '../VoiceCallModal/VoiceCallModal';

interface VoiceCallModalProps {
  isCalling: boolean;
  callStatus: string;
  setIsCalling: (isCalling: boolean) => void;
  name: string;
  profileImage: string;
  isRinging: boolean;
}

const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isCalling,
  callStatus,
  setIsCalling,
  profileImage,
  name,
  isRinging,
}) => {
  const [callDuration, setCallDuration] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalling && callStatus === 'Chat Connection Started') {
      interval = setInterval(() => {
        setCallDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }

    return () => {
      clearInterval(interval);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [isCalling, callStatus]);

  useEffect(() => {
    if (callStatus === 'Ringing...') {
      const newAudio = new Audio('./ringtone.mp3');
      newAudio.play();
      setAudio(newAudio);
    } else if (callStatus === 'Chat Connection Started') {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  };

  return (
    isCalling && (
      <>
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
          <VoiceCallSidebar />
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4" style={{ maxWidth: '700px', maxHeight: '800px' }}>
            <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover" />
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-lg text-gray-500">{callStatus} - {formatDuration(callDuration)}</p>
            <div className="flex space-x-4 justify-center">
              {callStatus === 'Chat Connection Started' && (
                <button onClick={() => setIsCalling(false)} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-150 ease-in-out">
                  <FontAwesomeIcon icon={faPhoneSlash} className="mr-2" />
                  End Call
                </button>
              )}
            </div>
          </div>
          <UserCallModal />
        </div>
      </>
    )
  );
};

export default VoiceCallModal;
