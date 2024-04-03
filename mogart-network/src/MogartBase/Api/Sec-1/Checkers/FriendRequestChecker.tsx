import { FriendRequest } from "../../../../Pages/Communication/components/FriendRequests";

export const isValidFriendRequest = (data: any): data is FriendRequest => {
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
