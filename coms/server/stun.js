var MAGIC_COOKIE = 0X2112A442;
var BINDING_REQUEST = 0X0001;
var BINDING_RESPONSE = 0x0101;
var XOR_MAPED_ADDRESS = 0x0020;

var ipv6ToBytes = function (adr) {
    adr = adr.split(":");
    var len = 8 - adr.length;
    var res = [];
    for (var a of adr) {
        if (a === "") {
            if (len > 0) while (len-- > 0) res.push(0, 0);
            else res.push(0, 0);
        }
        else {
            var a = parseInt(a, 16);
            res.push(a >>> 16 & 0xff, a & 0xff);
        }
    }
    return new Uint8Array(res);
}
var setIpv4 = function (response, address, port) {
    var propLength = 8;
    response[22] = propLength >> 8 & 0xff;
    response[23] = propLength & 0xff;
    response[25] = 0x01// ipv4;
    address = address.split(".");
    response[28] = address[0] ^ response[4];
    response[29] = address[1] ^ response[5];
    response[30] = address[2] ^ response[6];
    response[31] = address[3] ^ response[7];
};

var setIpv6 = function (response, address, port) {
    var propLength = 20;
    response[22] = propLength >> 8 & 0xff;
    response[23] = propLength & 0xff;
    response[25] = 0x02// ipv6;
    address = ipv6ToBytes(address);
    response[28] = address[0] ^ response[4];
    response[29] = address[1] ^ response[5];
    response[30] = address[2] ^ response[6];
    response[31] = address[3] ^ response[7];
    response[32] = address[4] ^ response[8];
    response[33] = address[5] ^ response[9];
    response[34] = address[6] ^ response[10];
    response[35] = address[7] ^ response[11];
    response[36] = address[8] ^ response[12];
    response[37] = address[9] ^ response[13];
    response[38] = address[10] ^ response[14];
    response[39] = address[11] ^ response[15];
    response[40] = address[12] ^ response[16];
    response[41] = address[13] ^ response[17];
    response[42] = address[14] ^ response[18];
    response[43] = address[15] ^ response[19];
    return response;

}
function pickStun(data) {
    if (data.length < 20 || data.readUInt32BE(4) !== MAGIC_COOKIE) return;
    var msgType = data.readUInt16BE(0);
    if (msgType !== BINDING_REQUEST) return;
    this.picked = true;
    var msgLength = data.readUInt16BE(2);
    var remoteAddress = this.remoteAddress;
    var ipv4 = /^(?:\:\:ffff\:)?(\d+(?:\.\d+){3})$/.exec(remoteAddress);
    if (ipv4) remoteAddress = ipv4[1];
    var response = new Uint8Array(ipv4 ? 32 : 44);
    response[0] = BINDING_RESPONSE >>> 8 & 0xff;
    response[1] = BINDING_RESPONSE & 0xff;
    var resLength = 12;
    response[2] = resLength >>> 8 & 0xff;
    response[3] = resLength & 0xff;
    response[4] = MAGIC_COOKIE >>> 24 & 0xff;
    response[5] = MAGIC_COOKIE >>> 16 & 0xff;
    response[6] = MAGIC_COOKIE >>> 8 & 0xff;
    response[7] = MAGIC_COOKIE & 0xff;
    data.copy(response, 8, 8, 20);
    response[20] = XOR_MAPED_ADDRESS >> 8 & 0xff;
    response[21] = XOR_MAPED_ADDRESS & 0xff;
    var port = this.remotePort;
    port = port ^ MAGIC_COOKIE >>> 16;
    response[26] = port >>> 8 & 0xff// ipv4;
    response[27] = port & 0xff// ipv4;
    if (ipv4) setIpv6(response, ipv4[1]);
    else setIpv4(response, remoteAddress);
    return response;
}
module.exports = pickStun;