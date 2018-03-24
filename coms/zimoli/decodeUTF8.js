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
//解码幸运有你歌词1000次用时470毫秒
function decodeUTF8(buffer){
    var result=[],extra="";
    for (var cx = 0, dx = buffer.length; cx < dx; cx++) {
        var temp = buffer[cx];
        if (temp > 127) {
            extra = extra + "%" + temp.toString(16);
        } else {
            if (extra) {
                result.push(extra);
                extra = "";
            }
            result.push(String.fromCharCode(temp));
        }
    }
    return decodeURIComponent(result.join(""));
}