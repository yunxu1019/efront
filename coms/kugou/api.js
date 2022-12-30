({
    "https://m.kugou.com/": {
        "song-info;hash": "get                                 app/i/getSongInfo.php?cmd=playInfo&from=mkugou",
        "slider-src": "get:[].mod-slider>.swipe-wrap>div  .#src=img!src&href=a!href",
        "songs-list": "get:[].panel-songslist%20li          .#hash=!id&.panel-songs-item-name>span!innerText",
        "songs-list": "get:[].m_cm_item1warp:nth-child(2)>div .#=a!href\\song-mix&a:nth-child(2)>p:first-child!innerText&singer=a:nth-child(2)>p:nth-child(2)!innerText&imgurl=img!_src",
        "song-mix;": "mget:script:nth-last-child(2)           mixsong/:hashid.html",
        "rank-list": "get:[].panel-img-list%20li            rank/list#href=a!href&=a!href\\rank-info&imgurl=img!_src&name=p|innerText",
        "rank-info": "get:[].panel-songslist%20li           rank/info/:id#src=!id&name=.panel-songs-item-name|innerText&data=.panel-songs-item-download/innerText",
        "rank-title": "get:.page-title                      rank/info/:id#title=!innerText",
        "plist-index": "get:[].panel-img-list%20li          plist/index#href=a!href&=a!href\\plist-info&imgurl=img!_src&name=.panel-img-content-first|innerText&count=.panel-img-content-sub|innerText",
        "plist-info": "mget:[].panel-songslist%20li          plist/list/:id/#name=.panel-songs-item-name|innerText&data=.panel-songs-item-download/innerText",
        "search-hot": "get                                api/v3/search/hot?format=json&plat=0&count=30",
        "singer-class": "get:[].bd%20li                   singer/class#href=a!href&=a!href\\singer-list&name=a|innerText&group=?parentNode",
        "singer-list": "get:[].singer-img-list>li         singer/list/:id#href=a!href&=a!href\\singer-info0&imgurl=img!_src&name=p|innerText",
        "singer-info0": "mget:[].singer-songs-list>li       singer/info/:id#hash=!id&singer=.singer-name|innerText&name=.song-name|innerText&data=em/innerText"
    },
    "https://www.kugou.com/": {
        "singer-info": "cget:link[rel]+script       singer/info/:id",
    },
    "http://mobilecdn.kugou.com/": {
        "search?keyword": "get:data.info                            api/v3/search/song?format=json&page=1&pagesize=30&showtype=1"
    },
    "http://www.kuwo.cn/": {
        "kuwo-token"/*主要用于初始化kw_token*/: "get",
    },
    "http://www.kuwo.cn/api/www/ csrf=$kw_token": {
        "search-kuwo;key": "get:data.list                                 search/searchMusicBykeyWord?&pn=1&rn=30#singername=artist&songname=name&priced=isListenFee",
        "music-info;mid": "get:data                                       music/musicInfo",
    },
    "http://www.kuwo.cn/api/v1/www/": {
        "play-url;mid=rid": "get:data                                              music/playUrl?type=music",
    },

    "http://m.kuwo.cn/newh5/": {
        "kuwo-lrc;musicId=rid": "get:data.lrclist singles/songinfoandlrc",
    },
    "https://music.163.com/weapi/": {
        "search-yyyy": "form:result.songs cloudsearch/get/web#songname=name&avatar=al.picUrl",
        "yyyy-url": "form:data[0] song/enhance/player/url/v1#encode=type",
        "yyyy-lrc": "form:lrc.lyric song/lyric",
        "yyyy-info": "form:lrc.lyric v3/song/detail",
    },
    "http://lyrics.kugou.com/": {
        "search-krc;keyword=songName&duration=time&hash": "get:candidates[0] search?ver=1&man=yes&client=pc",
        "download-krc;accesskey&id": "get:content download?ver=1&client=pc&fmt=krc&charset=utf8"
    },
    "https://music.91q.com/": {// 千千静听/百度音乐
        "search-qqjt;word": "get:data.typeTrack v1/search#songname=title&singername=artist<、>.name&avatar=pic&priced=isVip",
        "qqjt-url?TSID": "get:data v1/song/tracklink#url=path"
    }
})
