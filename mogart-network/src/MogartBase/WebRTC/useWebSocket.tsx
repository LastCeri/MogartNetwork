// useWebSocket.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../Api/Api';

const useWebSocket = (url: string, onMessage: (event: MessageEvent) => void) => {
    const webSocketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const sendMessage = useCallback((message: Object) => {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
        }
    }, []);

    useEffect(() => {
        const initWebSocket = async () => {
            try {
                const response = await axios.get(`${API_URL}/RpcServerStatus`); 
                console.log("RpcServerStatus",response);
                if (response.statusText === "on") {
                    const ws = new WebSocket(url);
                   
                    ws.onopen = () => {
                        setIsConnected(true);
                        console.log("WebSocket connection established");
                    };
                    
                    ws.onmessage = (event) => {
                        onMessage(event);
                    };
                    
                    ws.onclose = () => {
                        setIsConnected(false);
                        console.log("WebSocket connection closed");
                    };
                    
                    webSocketRef.current = ws;
                } else {
                    console.log("Voice Chat Server Disabled", response.status);
                }
            } catch (error) {
                console.error("Error initializing WebSocket:", error);
            }
        };

        initWebSocket();

        return () => {
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, [url, onMessage]);

    return { sendMessage, isConnected };
};

export default useWebSocket;
