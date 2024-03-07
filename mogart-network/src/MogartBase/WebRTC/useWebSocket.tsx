// useWebSocket.tsx
import { useEffect, useRef, useState, useCallback } from 'react';

const useWebSocket = (url:any, onMessage:any) => {
    const webSocketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const sendMessage = useCallback((message: Object) => {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
        }
    }, []);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            setIsConnected(true);
            console.log("WebSocket connection established");
        };

        ws.onmessage = (event) => {
            if(onMessage) {
                onMessage(event);
            }
        };

        ws.onclose = () => {
            setIsConnected(false);
            console.log("WebSocket connection closed");
        };

        webSocketRef.current = ws;

        return () => {
            ws.close();
        };
    }, [url, onMessage]);

    return { sendMessage, isConnected };
};

export default useWebSocket;
