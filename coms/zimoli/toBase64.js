var encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
function toBase64(input, url) {
    var encoding1 = encoding;
    if (url) {
        encoding1[62] = "-";
        encoding1[63] = "_";
    }
    for (var cx = 0, block, output = [], dx = input.length; cx < dx;) {
        block = input[cx++] << 16 | input[cx++] << 8 | input[cx++];
        output.push(
            encoding1[block >> 18],
            encoding1[block >> 12 & 0b111111],
            encoding1[block >> 6 & 0b111111],
            encoding1[block & 0b111111]
        );
    }
    if (url) {
        encoding1[62] = "+";
        encoding1[63] = "/";
        while (cx-- > dx) output.pop();
    }
    else for (cx = output.length + dx - cx, dx = output.length; cx < dx; cx++) output[cx] = '=';
    return output.join("");
}