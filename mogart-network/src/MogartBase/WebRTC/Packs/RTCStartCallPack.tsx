import { getRandomPacketId } from "./Packs";

export async function RTCStartCallPack(CallerName:string,CallerID:string){
    const StartCallPack = {
    packetid: getRandomPacketId(),
        type: 6,
        PersonToName:CallerName,
        PersonToId: CallerID
  };
return StartCallPack;
}