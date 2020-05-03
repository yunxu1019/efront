({
    "http://m.kugou.com/": {
        "song-info": "get                                 app/i/getSongInfo.php?cmd=playInfo&from=mkugou&hash",
        "slider-src": "get:[].mod-slider>.swipe-wrap>div  .#src=img!src&href=a!href",
        "songs-list": "get:[].panel-songslist>li          .#hash=!id&.panel-songs-item-name>span!innerText",
        "rank-list": "get:[].panel-img-list>li            rank/list#href=a!href&=a!href\\rank-info&imgurl=img!_src&name=p|innerText",
        "rank-info": "get:[].panel-songslist>li           rank/info/:id#src=!id&name=.panel-songs-item-name|innerText&data=.panel-songs-item-download/innerText",
        "plist-index": "get:[].panel-img-list>li          plist/index#href=a!href&=a!href\\plist-info&imgurl=img!_src&name=.panel-img-content-first|innerText&count=.panel-img-content-sub|innerText",
        "plist-info": "get:[].panel-songslist>li          plist/list/:id#name=.panel-songs-item-name|innerText&data=.panel-songs-item-download/innerText",
        "search-hot": "get                                api/v3/search/hot?format=json&plat=0&count=30",
        "singer-class": "get:[].bd%20li                   singer/class#href=a!href&=a!href\\singer-list&name=a|innerText&group=?parentNode",
        "singer-list": "get:[].singer-img-list>li         singer/list/:id#href=a!href&=a!href\\singer-info&imgurl=img!_src&name=p|innerText",
        "singer-info": "mget:[].singer-songs-list>li       singer/info/:id#hash=!id&singer=.singer-name|innerText&name=.song-name|innerText&data=em/innerText"
    },
    "http://mobilecdn.kugou.com/": {
        "search?keyword": "get:data.info                            api/v3/search/song?format=json&page=1&pagesize=30&showtype=1"
    }
})