export async function RTCLoginPack(userAuthID: string, userData: any) {
  const RTCLoginPacket = JSON.stringify({
      username: userData.UserName,
      userauthid: userAuthID,
      type: 2
  });

  return RTCLoginPacket;
}
