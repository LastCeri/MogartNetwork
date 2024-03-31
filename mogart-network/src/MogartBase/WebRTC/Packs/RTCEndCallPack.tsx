import { getRandomPacketId } from "./Packs";


export async function RTCEndCallPack(CallerName:string,CallerID:string) {

  const EndCallPack = JSON.stringify({
    packetid: getRandomPacketId(),
        type: 7,
        PersonToName:CallerName,
        PersonToId: CallerID
  });

return EndCallPack;
}