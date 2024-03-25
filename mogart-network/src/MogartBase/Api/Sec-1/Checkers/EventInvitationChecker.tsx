import { EventInvitation } from "../../../../Pages/Communication/components/EventInvitation";

export const isValidEventInvitation = (data: any): data is EventInvitation => {
    return typeof data.ID === 'number' &&
           typeof data.ReqAuthor === 'string' &&
           typeof data.ReqAuthorImage === 'string' &&
           typeof data.ReqContent === 'string' &&
           typeof data.ReqDate === 'string' &&
           typeof data.ReqResponse === 'string' &&
           typeof data.ReqTitle === 'string' &&
           typeof data.ReqType === 'string';
  }
