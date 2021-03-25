//解码幸运有你歌词1000次用时550毫秒
// function decodeUTF8(buffer){
//     var result=[],extra="";
//     for (var cx = 0, dx = buffer.length; cx < dx; cx++) {
//         var temp = buffer[cx];
//         if (temp > 127) {
//             extra = extra + "%" + temp.toString(16);
//         } else {
//             if (extra) {
//                 result.push(decodeURIComponent(extra));
//                 extra = "";
//             }
//             result.push(String.fromCharCode(temp));
//         }
//     }
//     return result.join("");
// }
// //解码幸运有你歌词1000次用时470毫秒
// function decodeUTF8(buffer){
//     var result=[],extra="";
//     for (var cx = 0, dx = buffer.length; cx < dx; cx++) {
//         var temp = buffer[cx];
//         if (temp > 127) {
//             extra = extra + "%" + temp.toString(16);
//         } else {
//             if (extra) {
//                 result.push(extra);
//                 extra = "";
//             }
//             result.push(String.fromCharCode(temp));
//         }
//     }
//     return decodeURIComponent(result.join(""));
// }

module.exports = function (buff) {
    var dist = [];
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        var t = buff[cx], s;
        if (t < 192 || t > 255) {//0b0xxxxxxx - 0b10xxxxxx
            s = t;
        }
        else if (t < 224) {// 0b110xxxxx 10xxxxxx
            s = ((t & 0b00011111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 240) {// 0b1110xxxx 10xxxxxx 10xxxxxx
            s = ((t & 0b00001111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 248) {// 0b11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = ((t & 0b00000111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 252) {// 0b111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = (t & 0b00000011) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 254) {// 0b1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = (t & 0b00000001) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 255) {// 0b11111110 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = (buff[++cx] & 0b00111111) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else {// //////////// 0b11111111 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = (buff[++cx] & 0b00111111) * Math.pow(2, 36) + (buff[++cx] & 0b00111111) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        dist.push(String.fromCharCode(s));
    }
    return dist.join('');
};
