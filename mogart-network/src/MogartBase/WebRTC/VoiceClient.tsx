import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../Api/Api';
import { useData } from '../Context/DataContext';
import useVoiceWebSocket from './VoiceWebSocketService';
import config from './config';

const VoiceClient: React.FC<{ shouldRender: boolean }> = ({ shouldRender }) => {
    const [isRTCServerOn, setRTCServerOn] = useState(false);
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);
    const rtcPeerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const { isLoggedIn } = useData();

    const onMessage = (event: MessageEvent) => {
        const jsonData = JSON.parse(event.data);
        console.log('Received JSON data:', jsonData);
    };

    const { webSocket, status } = useVoiceWebSocket();

    useEffect(() => {
        const checkRTCServerStatus = async () => {
            try {
                const response = await axios.get(`${API_URL}/RtcServerStatus`);
                setRTCServerOn(response.data.status === "on");
            } catch (error) {
                console.error('Error checking RTC Server status:', error);
            }
        };

        if (shouldRender) {
            checkRTCServerStatus();
        }
    }, [shouldRender]);

    useEffect(() => {
        if (isRTCServerOn && status === 'CONNECTING') {
            // WebSocket bağlantısı başlatma
            console.log('WebSocket connection initiated');
        }
    }, [isRTCServerOn, status]);

    const setupMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(config.mediaConstraints);
            localStreamRef.current = stream;
            stream.getTracks().forEach((track) => {
                rtcPeerConnectionRef.current?.addTrack(track, stream);
            });
        } catch (error) {
            console.error("Error accessing media devices.", error);
        }
    };

    const createPeerConnection = () => {
        rtcPeerConnectionRef.current = new RTCPeerConnection(config.iceServerConfig);

        rtcPeerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
              //  sendMessage({
                 //   type: 'candidate',
                 //   candidate: event.candidate,
               // });
            }
        };

        rtcPeerConnectionRef.current.ontrack = (event) => {
            console.log('ontrack event:', event.streams[0]);
        };

        setupMedia();
    };

    const startCall = () => {
        createPeerConnection();
        rtcPeerConnectionRef.current?.createOffer().then((offer) => {
           // requestAnimationFrametcPeerConnectionRef.current?.setLocalDescription(offer).then(() => {
              //  sendMessage({
               //     type: 'offer',
              //      sdp: offer.sdp,
               // });
           // });
        });
    };

    const answerCall = (sdp: string) => {
        createPeerConnection();
        rtcPeerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp })).then(() => {
            rtcPeerConnectionRef.current?.createAnswer().then((answer) => {
                rtcPeerConnectionRef.current?.setLocalDescription(answer).then(() => {
                  //  sendMessage({
                 //       type: 'answer',
                  ////      sdp: answer.sdp,
                  //  });
                });
            });
        });
    };

    const endCall = () => {
        rtcPeerConnectionRef.current?.close();
        rtcPeerConnectionRef.current = null;
    };


    return null;
};

export default VoiceClient;
