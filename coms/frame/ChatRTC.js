var {
    RTCPeerConnection,
    RTCDataChannel,
    RTCSessionDescription,
    RTCIceCandidate,
} = window;
var port = location.port;
if (!port) port = /https\:/.test(location.href) ? 443 : 80;
var configuration = {
    iceServers: [
        // { urls: "stun:stun.stunprotocol.org:3478" },
        { urls: "stun:" + location.host + ":" + port }
    ]
};
var enabled = !!RTCPeerConnection;
class ChatRTC {
    static enabled = enabled;
    enabled = enabled;
    local = null;
    remote = null;
    localStream = null;
    /**
     * @type {RTCPeerConnection}
     */
    peerConnection = null;
    candidates = [];
    constructor() {
        this.peerConnection = new RTCPeerConnection(configuration);
    }
    async setOffer(offer) {
        var pc = this.peerConnection;
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        var answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        flushDidate(this);
        return answer;
    }
    async setAnswer(answer) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        flushDidate(this);
    }
    async addDidate(candidate) {
        candidate = candidate ? new RTCIceCandidate(candidate) : { candidate: '' };
        if (!this.candidates) {
            await this.peerConnection.addIceCandidate(candidate);
        }
        else {
            this.candidates.push(candidate);
        }
    }
    // 开始获取本地媒体
    async initMedia(audioOnly) {
        var localStream = this.localStream;
        if (!localStream) localStream = this.localStream = await navigator.mediaDevices.getUserMedia({ video: !audioOnly, audio: true });
        var local = this.local;
        local.srcObject = localStream;
        local.play();
        addTracks(this.peerConnection, localStream);
    }
    async initChannel() { }
    async call(ondate, offer) {
        var peerConnection = this.peerConnection;
        await this.initMedia();
        // 处理 ICE 候选
        peerConnection.remote = this.remote;
        peerConnection.emitDidate = ondate;
        peerConnection.onicecandidate = oncandidate;
        // 处理远程流
        peerConnection.ontrack = ontrack;
        if (offer) return this.setOffer(offer);
        offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        return offer;
    };
    async hangup() {
        var { peerConnection, localStream, local, remote } = this;
        if (peerConnection) peerConnection.close();
        stopTracks(localStream);
        this.tracks = null;
        this.candidates = null;
        if (local) local.srcObject = null;
        if (remote) remote.srcObject = null;
    };
}
/**
 * @param {ChatRtc} rtc
 */
function flushDidate(rtc) {
    if (rtc.candidates) {
        var cds = rtc.candidates;
        rtc.candidates = null;
        var peerConnection = rtc.peerConnection;
        for (var d of cds) peerConnection.addIceCandidate(d);
    }
}
var ontrack = function (event) {
    var remote = this.remote;
    remote.srcObject = event.streams[0];
};
var addTracks = function (peerConnection, localStream) {
    var tracks = localStream?.getTracks();
    // 将本地流添加到 PeerConnection
    if (tracks) for (var track of tracks) {
        peerConnection.addTrack(track, localStream);
    }
};
var stopTracks = function (localStream) {
    var tracks = localStream?.getTracks();
    if (tracks) for (var track of tracks) {
        track.stop();
    }
}
var oncandidate = function (event) {
    var candidate = event.candidate;
    if (!candidate) return this.emitDidate(null);
    var { sdpMid, candidate, sdpMLineIndex, usernameFragment } = candidate;
    this.emitDidate({ sdpMid, candidate, sdpMLineIndex, usernameFragment });
}
