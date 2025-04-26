return () => plist.bind(i18n`房间`, "room", refilm`
*房间名/name 100
/ $ ${[{
        name: () => i18n`连接`,
        async do(o) {
            var linkid = await data.from("room", { id: encode62.packencode(o.name) });
            popup("/link/chat", { linkid, name: o.name });
        }
    }]}
`);
