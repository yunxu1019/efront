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
    waiters = {};
    channels = {};
    constructor(ondate) {
        var peerConnection = this.peerConnection = new RTCPeerConnection(configuration);
        peerConnection.ondatachannel = (event) => {
            var channel = event.channel;
            var label = channel.label;
            var waiter = this.waiters[label];
            console.log('data-channel', channel, waiter);
            if (waiter) {
                delete this.waiters[label];
                waiter(channel);
                return;
            }
            this.channels[label] = channel;
        };
        this.ready = new Promise((ok, oh) => {
            peerConnection.oniceconnectionstatechange = function () {
                console.log('completed', this.iceConnectionState)
                if (this.iceConnectionState === 'completed') {
                    ok();
                }
                else if (this.iceConnectionState === 'failed') {
                    oh();
                }
            }
        });

        peerConnection.onicecandidate = oncandidate;
        peerConnection.emitDidate = ondate;
    }
    async setAnswer(answer) {
        if (this.answer) return;
        this.answer = answer;
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
    async createChannel(label, options) {
        try {
            // await this.ready;
            return this.peerConnection.createDataChannel(label, options);
        } catch (e) {
            alert('无法建立连接', 'error');
        }
    }
    waitChannel(label) {
        return new Promise((ok) => {
            if (this.channels[label]) {
                var channel = this.channels[label];
                delete this.channels[label];
                return ok(channel);
            }
            this.waiters[label] = ok;
        });
    }
    async initOffer() {
        var peerConnection = this.peerConnection;
        var offer = this.offer;
        if (offer) return offer;
        delete this.answer;
        offer = this.offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        return offer;
    }
    takeOffer(offer) {
        if (this.offer) return this.answer;
        this.offer = offer;
        return this.answer = takeOffer(this, offer);
    }
    async call(offer) {
        await this.initMedia();
        var peerConnection = this.peerConnection;
        // 处理 ICE 候选
        peerConnection.remote = this.remote;
        peerConnection.ontrack = ontrack;
        return this.takeOffer(offer);
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
    rtc.answer = answer;
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
    console.log(event, 'icedidate');
    var candidate = event.candidate;
    if (!candidate) return this.emitDidate(null);
    var { sdpMid, candidate, sdpMLineIndex, usernameFragment } = candidate;
    this.emitDidate({ sdpMid, candidate, sdpMLineIndex, usernameFragment });
}
