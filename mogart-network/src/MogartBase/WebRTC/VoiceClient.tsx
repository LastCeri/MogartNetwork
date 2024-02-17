// VoiceClient.tsx
import React, { useEffect, useRef } from 'react';
import config from './config';

const VoiceClient = () => {
    const webSocketRef = useRef<WebSocket | null>(null);
    const rtcPeerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);

    const initializeWebRTC = () => {
        const { iceServerConfig, mediaConstraints } = config;

        rtcPeerConnectionRef.current = new RTCPeerConnection(iceServerConfig);

        navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(stream => {
                localStreamRef.current = stream;

                stream.getTracks().forEach(track => {
                    rtcPeerConnectionRef.current?.addTrack(track, stream);
                });
            })
            .catch(error => {
                console.error('getUserMedia Error:', error);
            });

        rtcPeerConnectionRef.current.onicecandidate = event => {
            if (event.candidate) {
                webSocketRef.current?.send(JSON.stringify({
                    type: 'candidate',
                    candidate: event.candidate
                }));
            }
        };
    };

    const initializeWebSocket = () => {
        const { voiceChatServer, websocketTimeout } = config;

        try {
            webSocketRef.current = new WebSocket(voiceChatServer);

            webSocketRef.current.onopen = () => {
                console.log('WebSocket connection established');
            };

            webSocketRef.current.onmessage = event => {
                const message = JSON.parse(event.data);
                console.log('Received message:', message);

                if (message.type === 'offer') {
                    // Process offer
                } else if (message.type === 'answer') {
                    // Process answer
                } else if (message.type === 'candidate') {
                    // Process ICE candidate
                }
            };

            webSocketRef.current.onerror = error => {
                console.error('WebSocket Error:', error);
            };
        } catch (error) {
            console.error('WebSocket Connection Error:', error);
        }
    };

    useEffect(() => {
        initializeWebRTC();
        initializeWebSocket();
    }, []);

    return null;
};

export default VoiceClient;
