import { ChatMessage, ChatMessageDetail } from "../../../../Pages/Message/MessagePage";

export const isValidChatData = (data: any): data is ChatMessage => {
    return typeof data.MessageID === 'string' &&
    typeof data.MessageAuthor === 'string' &&
    typeof data.MessageAuthorImage === 'string' &&
    typeof data.MessageAuthorTo === 'string' &&
    typeof data.MessageContent === 'string'&&
    typeof data.MessageDate === 'string'&&
    typeof data.MessageLastAction === 'string'&&
    typeof data.MessageActions === 'string';
}


export const isValidChatDetailData = (data: any): data is ChatMessageDetail => {
    if (
        typeof data.MessageID !== 'string' && typeof data.MessageID !== 'number' ||
        typeof data.Sender !== 'string' ||
        typeof data.messageText !== 'string' && data.messageText !== '' ||
        !Array.isArray(data.messageVideoUrlList) || !data.messageVideoUrlList.every((url: any) => typeof url === 'string') ||
        !Array.isArray(data.messageUrlList) || !data.messageUrlList.every((url: any) => typeof url === 'string') ||
        !Array.isArray(data.messageImageList) || !data.messageImageList.every((url: any) => typeof url === 'string') ||
        typeof data.messageTimeStamp !== 'string'
    ) {
        return false;
    }
    
    return true;
}


