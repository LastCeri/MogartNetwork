import { LoginRTC } from "../../../Api/Api";
import { RTCLoginPack } from "../../Packs/RTCLoginCallPack";

export async function RTC_Func_Login(ws:WebSocket, userAuthID: any, userData: any, socketid:any,token:any) {
    const RTClogin = await LoginRTC({userid: userAuthID, socketid: socketid},token);
    const loginpack = await RTCLoginPack(userAuthID, userData);
    ws.send(loginpack);
}
