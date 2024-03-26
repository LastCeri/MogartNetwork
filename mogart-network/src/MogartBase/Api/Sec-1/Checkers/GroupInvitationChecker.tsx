import { GroupInvitation } from "../../../../Pages/Communication/components/GroupInvitation";

export const isValidGroupRequest = (data: any): data is GroupInvitation => {
    return typeof data.ID === 'number' &&
    typeof data.ReqAuthor === 'string' &&
    typeof data.ReqAuthorImage === 'string' &&
    typeof data.ReqContent === 'string' &&
    typeof data.ReqDate === 'string'&&
    typeof data.ReqResponse === 'string'&&
    typeof data.ReqStatus === 'string'&&
    typeof data.ReqTitle === 'string'&&
    typeof data.ReqType === 'string';
}