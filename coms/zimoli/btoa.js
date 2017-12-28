//base64
var encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
function toBase64(input) {
    for (
        // initialize result and counter
        var block, charCode, idx = 0, map = encoding, length = input.length, output = [];
        // if the next str index does not exist:
        //   change the mapping table to "="
        //   check if d has no fractional digits
        idx < length || (map = '=', idx % 1);
        // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
        output.push(encoding.charAt(63 & block >> 8 - idx % 1 * 8))
    ) {
        charCode = input[parseInt(idx += 3 / 4)];
        block = block << 8 | charCode;
    }
    return output.join("");
}
var btoa=toBase64;