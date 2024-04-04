import { MessageRequests } from "../../../../Pages/Communication/components/MessageRequests";

export const isValidMessageRequest = (data: any): data is MessageRequests => {
    return typeof data.ID === 'string' &&
    typeof data.ReqAuthor === 'string' &&
    typeof data.ReqAuthorImage === 'string' &&
    typeof data.ReqContent === 'string' &&
    typeof data.ReqDate === 'string'&&
    typeof data.ReqResponse === 'string'&&
    typeof data.ReqStatus === 'string'&&
    typeof data.ReqTitle === 'string'&&
    typeof data.ReqType === 'string';
}