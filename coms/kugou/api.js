({
    "https://m.kugou.com/": {
        "song-info": "get                                 app/i/getSongInfo.php?cmd=playInfo&from=mkugou&hash",
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
        "singer-info": "cget:link[rel]+script       yy/singer/home/:id.html",
    },
    "http://mobilecdn.kugou.com/": {
        "search?keyword": "get:data.info                            api/v3/search/song?format=json&page=1&pagesize=30&showtype=1"
    }
})