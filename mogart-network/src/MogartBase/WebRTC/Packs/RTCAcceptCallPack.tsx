import { getRandomPacketId } from "./Packs";

export async function RTCAcceptCallPack(CallerName:string,CallerID:string) {
  const AcceptCallPack = JSON.stringify({
    packetid: getRandomPacketId(),
    type: 8,
    PersonToName:CallerName,
    PersonToId: CallerID
  });
return AcceptCallPack;
}