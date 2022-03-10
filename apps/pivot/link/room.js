plist.bind(null, '房间', "room", refilm`
*房间名/name 100
/ $ ${[{
        name: "连接",
        async do(o) {
            var linkid = await data.from("room", { id: encode62.timeencode(o.name) });
            popup("/link/chat", { linkid, name: o.name });
        }
    }]}
`);