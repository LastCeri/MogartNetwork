import React, { useEffect, useRef } from 'react';
import useWebSocket from './useWebSocket';
import { useData } from '../../MogartBase/Context/DataContext';
import config from './config';

interface VoiceClientProps {
    shouldRender: boolean;
}

const VoiceClient: React.FC<VoiceClientProps> = ({ shouldRender }) => {
    const { isLoggedIn } = useData();
    const rtcPeerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);

    const handleWebSocketMessage = (event: MessageEvent<any>) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
            case 'offer':
                answerCall(message.sdp);
                break;
            case 'answer':
                rtcPeerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(message.sdp));
                break;
            case 'candidate':
                rtcPeerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(message.candidate));
                break;
            default:
                console.log('Unsupported message type:', message.type);
                break;
        }
    };

    const { sendMessage, isConnected } = useWebSocket(config.voiceChatServer, handleWebSocketMessage);

    useEffect(() => {
        if (shouldRender && isLoggedIn && isConnected) {
            startCall();
        }
    }, [shouldRender, isLoggedIn, isConnected]);

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
                sendMessage({
                    type: 'candidate',
                    candidate: event.candidate,
                });
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
            rtcPeerConnectionRef.current?.setLocalDescription(offer).then(() => {
                sendMessage({
                    type: 'offer',
                    sdp: offer.sdp,
                });
            });
        });
    };

    const answerCall = (sdp: string) => {
        createPeerConnection();
        rtcPeerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp })).then(() => {
            rtcPeerConnectionRef.current?.createAnswer().then((answer) => {
                rtcPeerConnectionRef.current?.setLocalDescription(answer).then(() => {
                    sendMessage({
                        type: 'answer',
                        sdp: answer.sdp,
                    });
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