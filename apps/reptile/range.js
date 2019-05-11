function main() {
    range(`http://localhost/xiaohua/data/login!dVvbGGuRRDN3eyyh.mp4`, function (buff, offet = 0) {
        return fs('/data/temp.mp4').writeSync(buff, offet);
    })
}