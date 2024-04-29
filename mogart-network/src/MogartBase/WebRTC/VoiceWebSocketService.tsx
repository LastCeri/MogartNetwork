import { useState, useRef, useEffect } from 'react';
import config from './config';
import { useData } from '../Context/DataContext';

const useVoiceWebSocket = () => {
    const { userAuthID, data: userData } = useData();
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [status, setStatus] = useState('CONNECTING');
    const webSocketRef = useRef<WebSocket | null>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (webSocketRef.current) {
            webSocketRef.current.onclose = (event) => {
                console.log('WebSocket connection closed', event.wasClean ? 'cleanly' : `with error: Code ${event.code}, Reason: ${event.reason}`);
                setStatus("CLOSED");
            };
        }
    }, [webSocket, userAuthID, userData]);

    const  connectWebSocket = async () => {
        if (!webSocketRef.current || webSocketRef.current.readyState === WebSocket.CLOSED || webSocketRef.current.readyState === WebSocket.CLOSING) {
            
            if (!userData.VoiceChatStatus) return;

            const ws = new WebSocket(config.voiceChatServer);

            ws.onopen = () => {
                console.log("WebSocket connection established");
                setStatus("OPEN");
            };

            ws.onclose = (event) => {
                console.log('WebSocket connection closed', event.wasClean ? 'cleanly' : `with error: Code ${event.code}, Reason: ${event.reason}`);
                setStatus("CLOSED");
            };
    

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                setStatus("ERROR");
            };

            webSocketRef.current = ws;
            setWebSocket(ws);
        }
    };

    useEffect(() => {

        const ConnectToSocket = async () => {
            if (isFirstRender.current) {
                const response = await connectWebSocket();
                console.error("WebSocket response:", response);
                   
                isFirstRender.current = false;
            }
        }

        ConnectToSocket();
    }, []);

    const closeWebSocket = () => {
        webSocketRef.current?.close();
        setStatus("CLOSED");
    };

    const sendMessage = (message: object) => {
        console.log("Message sendMessage:", message);
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
            console.log("Message sent:", message);
        } else {
            console.error("WebSocket is not open. Cannot send message.");
        }
    };

    return { webSocket, status, closeWebSocket, sendMessage };
};

export default useVoiceWebSocket;