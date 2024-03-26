import { MyGroupInterface } from "../../../../Pages/Groups/SubPage/MyGroups/MyGroups";


export const isValidMyGroups = (data: any): data is MyGroupInterface => {
    return typeof data.GrpID === 'number' &&
           typeof data.GrpName === 'string' &&
           typeof data.GrpDesc === 'string' &&
           typeof data.GrpTags === 'string' &&
           typeof data.GrpLogo === 'string';
  }
