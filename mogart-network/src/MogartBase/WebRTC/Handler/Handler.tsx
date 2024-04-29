// Import statements remain unchanged
import {
    RTC_Func_Login
} from "./HandlerFunc/RTCLogin";

export async function Handler(data: any, ws: WebSocket, userAuthID: string, userData: any, authtoken:string): Promise < void > {
    console.log("HandShake =>> ", data);

    switch (data.type) {
        case 1:
            console.log('Handling type1');
            break;
        case 2:
            console.log('Handling type2');
            break;
        case 3:
            console.log('Handling type2');
            break;
        case 4:
            console.log('Handling type2');
            break;
        case 5:
            console.log('Handling type2');
            break;
        case 6:
            console.log('Handling type2');
            break;
        case 7:
            console.log('Handling type2');
            break;
        case 8:
            console.log('Handling type2');
            break;
        case 9:
            console.log('Handling type2');
            break;
            // Additional cases as needed...
        case 10:
            const socketid = data.ClientID;
            console.log('Handling type10 process_to Login 1 ', ws);
            console.log('Handling type10 process_to Login 2 ', userAuthID);
            console.log('Handling type10 process_to Login 3 ', userData);

            await RTC_Func_Login(ws, userAuthID, userData, socketid,authtoken);
            break;
        case 11:
            console.log('Handling type11');
            break;
        case 12:
                console.log('Handling type12',data);

                break;
        default:
            console.log('Unknown type');
            break;
    }
}
