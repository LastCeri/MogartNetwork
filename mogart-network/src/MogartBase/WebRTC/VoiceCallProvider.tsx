import React, { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_URL } from '../Api/Api';
import config from '../WebRTC/config';
import useVoiceWebSocket from '../WebRTC/VoiceWebSocketService';
import { Handler } from '../WebRTC/Handler/Handler';
import { useData } from '../Context/DataContext';


interface VoiceCallContextType {
    isRTCServerOn: boolean;
    checkRTCServerStatus: () => void;
    startCall: (data: object) => void;
    answerCall: (sdp: any) => void;
    endCall: () => void;
    isCallModalOpen: boolean;
    setIsCallModalOpen: (isOpen: boolean) => void;
    callStatus: string;
    setCallStatus: (status: string) => void;
}

const VoiceCallContext = createContext<VoiceCallContextType | null>(null);

interface VoiceCallProviderProps {
    children: ReactNode;
}

export const VoiceCallProvider: React.FC<VoiceCallProviderProps> = ({ children }) => {
    const rtcPeerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const [isRTCServerOn, setRTCServerOn] = useState(false);
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [callStatus, setCallStatus] = useState('');
    const { webSocket, sendMessage } = useVoiceWebSocket();
    const { data, userAuthID,userAuthToken } = useData();

    useEffect(() => {
        if (!rtcPeerConnectionRef.current) {
            rtcPeerConnectionRef.current = new RTCPeerConnection(config?.iceServerConfig);
        }

        return () => {
            if (rtcPeerConnectionRef.current) {
                rtcPeerConnectionRef.current.close();
                rtcPeerConnectionRef.current = null; 
            }
        };
    }, []); 

    const checkRTCServerStatus = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/RtcServerStatus`);
            const serverStatus = response.data.status;
            if (serverStatus === 'on' || serverStatus === 'off') {
                setRTCServerOn(serverStatus === 'on');
            } else {
                console.error('Error: Invalid server status');
            }
        } catch (error) {
            console.error('Error checking RTC Server status:', error);
        }
    }, []);
  
    const handleWebSocketMessage = useCallback((message: any) => {
        if (!isRTCServerOn || !rtcPeerConnectionRef.current) return;
        const soketmessage = JSON.parse(message.data);

        if (webSocket) {
            Handler(soketmessage, webSocket, userAuthID, data,userAuthToken);
        }
    }, [webSocket, userAuthID, data, isRTCServerOn]);




    const setupMedia = useCallback(async () => {
        if (!isRTCServerOn || !rtcPeerConnectionRef.current) return;
    
        try {
            const stream = await navigator.mediaDevices.getUserMedia(config.mediaConstraints);
            stream.getTracks().forEach((track) => {
                rtcPeerConnectionRef.current?.addTrack(track, stream); 
            });
        } catch (error) {
            console.error("Error accessing media devices.", error);
        }
    }, [isRTCServerOn]);
    

    useEffect(() => {
        checkRTCServerStatus();
    }, [checkRTCServerStatus]);



    useEffect(() => {
        if (webSocket) {
            webSocket.onmessage = handleWebSocketMessage;
            return () => {
                webSocket.onmessage = null;
            };
        }
    }, [webSocket, handleWebSocketMessage]);



    useEffect(() => {
        if (!isRTCServerOn || !rtcPeerConnectionRef.current) return;
        rtcPeerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                sendMessage({ type: 'candidate', candidate: event.candidate });
            }
        };

        rtcPeerConnectionRef.current.ontrack = (event) => {
            console.log('ontrack event:', event.streams[0]);
        };

        setupMedia();

        return () => {
            if (!isRTCServerOn || !rtcPeerConnectionRef.current) return;
            rtcPeerConnectionRef.current.close();
            rtcPeerConnectionRef.current = new RTCPeerConnection(config.iceServerConfig);
        };
    }, [sendMessage, setupMedia]);



    const startCall = useCallback((data: object) => {
        sendMessage(data);
    }, [sendMessage]);


    const answerCall = useCallback((sdp: RTCSessionDescriptionInit) => {
        if (!isRTCServerOn || !rtcPeerConnectionRef.current) return;
        rtcPeerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(sdp)).then(() => {
            if (!isRTCServerOn || !rtcPeerConnectionRef.current) return;
            rtcPeerConnectionRef.current.createAnswer().then((answer) => {
                if (!isRTCServerOn || !rtcPeerConnectionRef.current) return;
                rtcPeerConnectionRef.current.setLocalDescription(answer).then(() => {
                    sendMessage({ type: 'answer', sdp: answer.sdp });
                });
            });
        });
    }, [sendMessage]);


    const endCall = useCallback(() => {
        if (!isRTCServerOn || !rtcPeerConnectionRef.current) return;
        rtcPeerConnectionRef.current.close();
        rtcPeerConnectionRef.current = new RTCPeerConnection(config.iceServerConfig); 
    }, []);

    
    const value: VoiceCallContextType = {
        isRTCServerOn,
        checkRTCServerStatus,
        startCall,
        answerCall,
        endCall,
        isCallModalOpen,
        setIsCallModalOpen,
        callStatus,
        setCallStatus,
    };

    return <VoiceCallContext.Provider value={value}>{children}</VoiceCallContext.Provider>;
};


export const useVoiceCall = () => {
    const context = useContext(VoiceCallContext);
    if (!context) {
        throw new Error('useVoiceCall must be used within a VoiceCallProvider');
    }
    return context;
};