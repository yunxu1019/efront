function krc_test() {
    var list = krc({
        "fileHead": 0,
        "q": 0,
        "extra": {
            "320filesize": 5055827,
            "sqfilesize": 11934905,
            "sqhash": "75D8819CB839CB0478EFE88743172113",
            "128hash": "3C8D3AD5B55D7F9E6CF410E618AAE11D",
            "320hash": "50CB9E7B2C6E35B3D8253541B9E9D1D9",
            "128filesize": 2004113
        },
        "fileSize": 517421,
        "hash": "3C8D3AD5B55D7F9E6CF410E618AAE11D",
        "choricSinger": "金南玲",
        "error": "",
        "imgUrl": "http:\/\/singerimg.kugou.com\/uploadpic\/softhead\/{size}\/20161125\/20161125213630101.jpg",
        "errcode": 0,
        "songName": "逆流成河",
        "url": "http:\/\/fs.open.kugou.com\/20f4e7907d2377a986f8cb236395901e\/5acf71c4\/G008\/M03\/09\/07\/SA0DAFUOcfuIJ6sTAAflLYJj2ssAABC_wAmqdkAB-VF410.m4a",
        "time": 1523544631,
        "bitRate": 33,
        "singerHead": "",
        "album_img": "http:\/\/imge.kugou.com\/stdmusic\/{size}\/20150715\/20150715201344601548.jpg",
        "intro": "",
        "singerId": 84329,
        "ctype": 1009,
        "status": 1,
        "stype": 11323,
        "albumid": "",
        "singerName": "金南玲",
        "privilege": 0,
        "fileName": "金南玲 - 逆流成河",
        "topic_url": "",
        "mvhash": "81AF2AF48243112FAAC24502BA3440B0",
        "topic_remark": "",
        "extName": "m4a",
        "req_hash": "3C8D3AD5B55D7F9E6CF410E618AAE11D",
        "timeLength": 125
    });
    css(list,{
        backgroundColor:"#666"
    })
    appendChild(document.body, list);
}