import { getRandomPacketId } from "./Packs";

export async function RTCRejectCallPack(CallerName:string,CallerID:string) {
  const RejectCallPack = JSON.stringify({
    packetid: getRandomPacketId(),
    type: 9,
    PersonToName:CallerName,
    PersonToId: CallerID
  });
return RejectCallPack;
}