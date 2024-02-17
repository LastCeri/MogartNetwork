// config.ts

const config = {
    voiceChatServer: 'wss://voicechat.mogartnetwork.deswu.co:443',
    iceServerConfig: {
        iceServers: [
            { urls: 'stun:stun.mogartnetwork.deswu.co' }, 
            { urls: 'turn:turn.mogartnetwork.deswu.co', username: 'notset', credential: 'notset' } 
        ]
    },
    mediaConstraints: {
        audio: true,
        video: false
    },
    websocketTimeout: 5000
};

export default config;
