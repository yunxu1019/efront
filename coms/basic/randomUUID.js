function randomUUID(sign) {
    var random = crypto.getRandomValues(new Uint16Array(6));
    var mask = 0;
    for (var cx = 0, dx = sign.length + random.length; cx < dx; cx++) {
        mask = mask << 1 ^ sign.charCodeAt((cx + random[cx % 6]) % dx);
    }
    mask = mask >>> 0;
    return [
        (0x100000000 + mask).toString(16).slice(1),
        (0x10000 | random[0]).toString(16).slice(1),
        (0x10000 | random[1]).toString(16).slice(1),
        (0x10000 | random[2]).toString(16).slice(1),
        (0x10000 | 0xffff & (random[3] ^ mask)).toString(16).slice(1) +
        (0x10000 | 0xffff & (random[4] ^ mask)).toString(16).slice(1) +
        (0x10000 | 0xffff & (random[5] ^ mask)).toString(16).slice(1),
    ].join("-");
}