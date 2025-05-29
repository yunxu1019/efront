var {
    RTCPeerConnection,
    RTCDataChannel,
    RTCSessionDescription,
    RTCIceCandidate,
} = window;
var port = location.port;
if (!port) port = /^https\:/.test(location.href) ? 443 : 80;
var configuration = {
    iceServers: [
        // { urls: "stun:stun.stunprotocol.org:3478" },
        { urls: "stun:" + location.host + ":" + port }
    ],
};

var enabled = !!RTCPeerConnection;
class ChatRTC {
    static enabled = enabled;
    enabled = enabled;
    local = null;
    remote = null;
    channel = null;
    localStream = null;
    /**
     * @type {RTCPeerConnection}
     */
    peerConnection = null;
    candidates = [];
    constructor() {
        this.peerConnection = new RTCPeerConnection(configuration);
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
    async createChannel(id, options) {
        return this.peerConnection.createDataChannel(id, options);
    }
    waitChannel() {
        return new Promise((ok) => {
            if (this.channel) return ok(this.channel);
            this.peerConnection.ondatachannel = (event) => {
                this.channel = event.channel;
                ok(this.channel);
            };
        });
    }
    async init(ondate, offer) {
        var peerConnection = this.peerConnection;
        peerConnection.emitDidate = ondate;
        peerConnection.onicecandidate = oncandidate;
        peerConnection.ondatachannel = event => this.channel = event.channel;
        if (offer) return takeOffer(this, offer);
        offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        return offer;
    }
    async call(ondate, offer) {
        await this.initMedia();
        var peerConnection = this.peerConnection;
        // 处理 ICE 候选
        peerConnection.remote = this.remote;
        peerConnection.ontrack = ontrack;
        return this.init(ondate, offer);
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
async function takeOffer(rtc, offer) {
    var pc = rtc.peerConnection;
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    var answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    flushDidate(rtc);
    return answer;
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
