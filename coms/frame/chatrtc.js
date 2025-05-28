export var local = null;
export var remote = null;
var port = location.port;
if (!port) port = /https\:/.test(location.href) ? 443 : 80;


var configuration = {
    iceServers: [
        // { urls: "stun:stun.stunprotocol.org:3478" },
        { urls: "stun:" + location.host + ":" + port }
    ]
};
let localStream;
let peerConnection;
var flushCandidate = function () {
    if (!peerConnection) return;
    if (candidates) {
        var cds = candidates;
        candidates = null;
        cds.forEach(addDidate);
    }
}
// 信令服务器（示例中使用 WebSocket，需自行实现后端）
export async function setOffer(offer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    var answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    flushCandidate();
    return answer;
}

export async function setAnswer(answer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    flushCandidate();
}
var candidates = null;
export async function addDidate(candidate) {
    candidate = new RTCIceCandidate(candidate);
    if (peerConnection && !candidates) {
        await peerConnection.addIceCandidate(candidate);
    }
    else {
        if (!candidates) candidates = [];
        candidates.push(candidate);
    }
}
// 开始获取本地媒体
async function start() {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    local.srcObject = localStream;
    local.play();
}
var ontrack = function (event) {
    remote.srcObject = event.streams[0];
    remote.play();
};
var setDidate = null;
var oncandidate = function (event) {
    var candidate = event.candidate;
    if (!candidate) return;
    var { sdpMid, candidate, sdpMLineIndex, usernameFragment } = candidate;
    setDidate({ sdpMid, candidate, sdpMLineIndex, usernameFragment });
}
// 发起呼叫
export async function call(ondate, offer) {
    candidates = [];
    await start();
    peerConnection = new RTCPeerConnection(configuration);
    // 处理 ICE 候选
    setDidate = ondate;
    peerConnection.onicecandidate = oncandidate;

    // 处理远程流
    peerConnection.ontrack = ontrack;
    var tracks = localStream?.getTracks();
    // 将本地流添加到 PeerConnection
    if (tracks) tracks.forEach(track => peerConnection.addTrack(track, localStream));
    if (offer) return setOffer(offer);
    offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
}


// 挂断
export function hangup() {
    if (peerConnection) peerConnection.close();
    var tracks = localStream?.getTracks();
    if (tracks) tracks.forEach(a => a.stop());
    tracks = null;
    candidates = null;
    peerConnection = null;
    if (local) local.srcObject = null;
    if (remote) remote.srcObject = null;
}
