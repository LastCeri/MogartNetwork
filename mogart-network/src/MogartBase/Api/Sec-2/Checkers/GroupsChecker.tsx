import { MyGroupInterface } from "../../../../Pages/Groups/SubPage/MyGroups/MyGroups";

export const isValidMyGroups = (data: any): data is MyGroupInterface => {
    if (!Array.isArray(data)) {
        return false; 
    }
    
    for (const group of data) {
        if (typeof group.GrpID !== 'string' ||
            typeof group.GrpName !== 'string' ||
            typeof group.GrpDesc !== 'string' ||
            !Array.isArray(group.GrpTags) || 
            typeof group.GrpLogo !== 'string') {
            return false; 
        }
    }

    return true; 
}
