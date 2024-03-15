var encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
function toBase64(input) {
    for (var cx = 0, block, output = [], dx = input.length; cx < dx;) {
        block = input[cx++] << 16 | input[cx++] << 8 | input[cx++];
        output.push(
            encoding[block >> 18],
            encoding[block >> 12 & 0b111111],
            encoding[block >> 6 & 0b111111],
            encoding[block & 0b111111]
        );
    }
    for (cx = output.length + dx - cx, dx = output.length; cx < dx; cx++) output[cx] = '=';
    return output.join("");
}