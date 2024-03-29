import { useState, useEffect, useRef } from 'react';
import config from './config';
const useWebSocket = (onMessage:any) => {
    const webSocketRef = useRef<WebSocket | null>(null);
    const [status, setStatus] = useState('CONNECTING');

    const sendMessage = (message:any) => {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
        }
    };

    const connect = () => {
        return new Promise<void>((resolve, reject) => {
            const ws = new WebSocket(config.voiceChatServer);

            ws.onopen = () => {
                console.log("WebSocket connection established");
                setStatus("OPEN");
                resolve();
            };

            ws.onclose = (event) => {
                if (event.wasClean) {
                    console.log('WebSocket connection closed');
                } else {
                    console.error('WebSocket connection closed: Code ' + event.code + ', Reason: ' + event.reason);
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                reject(error);
            };

            ws.onmessage = (data) => {
                onMessage(data);
            };

            webSocketRef.current = ws;
        });
    };

    useEffect(() => {
        if (!webSocketRef.current) {
            connect().catch((error) => {
                console.error("WebSocket connection failed:", error);
            });
        }

        return () => {
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, [onMessage]);

    return { sendMessage, status };
};

export default useWebSocket;
