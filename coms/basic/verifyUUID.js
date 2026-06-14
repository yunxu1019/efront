function validUUID(uuid, sign) {
    var match = /^([0-9a-f]{8})\-([0-9a-f]{4})\-([0-9a-f]{4})\-([0-9a-f]{4})\-([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})$/i.exec(uuid);
    if (!match) return false;
    var random = new Uint16Array(6);
    var mask = parseInt(match[1], 16);
    random[0] = parseInt(match[2], 16);
    random[1] = parseInt(match[3], 16);
    random[2] = parseInt(match[4], 16);
    random[3] = parseInt(match[5], 16) ^ mask & 0xffff;
    random[4] = parseInt(match[6], 16) ^ mask & 0xffff;
    random[5] = parseInt(match[7], 16) ^ mask & 0xffff;
    var mask1 = 0;
    for (var cx = 0, dx = random.length + sign.length; cx < dx; cx++) {
        mask1 = mask1 << 1 ^ sign.charCodeAt((cx + random[cx % 6]) % dx);
    }
    mask1 = mask1 >>> 0;
    return mask === mask1;
}
