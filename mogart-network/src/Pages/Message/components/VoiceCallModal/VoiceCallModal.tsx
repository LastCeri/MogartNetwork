import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../../../MogartBase/Context/DataContext.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSlash, faMicrophone, faMicrophoneSlash, faHeadphones, faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';

const UserCallModal = () => {
    const { data, isLoading } = useData();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isHeadphonesMuted, setIsHeadphonesMuted] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
  
    useEffect(() => {
      if (isLoading) {
        console.log("Loading data...");
        return;
      }
  
      const voiceDetectionLevel = data.voiceDetectionLevel || 20; 
  
      if (isMuted) {
        console.log("The microphone is muted.");
        return;
      }
  
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((stream) => {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          const audioContext = new AudioContext();
          audioContextRef.current = audioContext;
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 512;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
  
          const checkSpeaking = () => {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            let average = sum / bufferLength;
  
            if (average > voiceDetectionLevel) {
              setIsSpeaking(true);
            } else {
              setIsSpeaking(false);
            }
            requestAnimationFrame(checkSpeaking);
          };
          checkSpeaking();
        })
        .catch((error) => {
          console.error('Failed to access microphone:', error);
        });
        
      return () => {
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
      };
    }, [isMuted, data.voiceDetectionLevel, isLoading]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleHeadphonesMute = () => {
    setIsHeadphonesMuted(!isHeadphonesMuted);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center pb-5 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent bg-opacity-100 backdrop-filter backdrop-blur-lg">
      <div className="relative flex flex-col items-center">
        <img src={data?.ProfileImage} alt="Profile" className={`w-24 h-24 rounded-full border-4 object-cover ${isSpeaking && !isMuted ? 'border-green-500' : 'border-transparent'}`} />
        <div className="flex space-x-2 mt-4">
          <button onClick={toggleMute} className="px-4 py-2 bg-gray-800 text-white rounded-full">
            <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} className="mr-2" />
            {isMuted ? 'Unmute Mic' : 'Mute Mic'}
          </button>
          <button onClick={toggleHeadphonesMute} className="px-4 py-2 bg-gray-800 text-white rounded-full">
            <FontAwesomeIcon icon={isHeadphonesMuted ? faHeadphonesAlt : faHeadphones} className="mr-2" />
            {isHeadphonesMuted ? 'Unmute Headphones' : 'Mute Headphones'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCallModal;
