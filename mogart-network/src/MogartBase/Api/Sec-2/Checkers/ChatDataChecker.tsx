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
    return typeof data.MessageID === 'string' &&
    typeof data.Sender === 'string' &&
    typeof data.messageText === 'string' &&
    typeof data.messageVideoUrlList === 'string' &&
    typeof data.messageUrlList === 'string'&&
    typeof data.messageImageList === 'string'&&
    typeof data.messageTimeStamp === 'string';
}
