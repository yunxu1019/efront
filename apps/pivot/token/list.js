frame$list.bind(null, "密钥管理", {
    load() {
        return data.from("private-list", a => JSAM.parse(encode62.timedecode(a)));
    },
    remove(o) {
        return data.from("private-edit", { key: encode62.timeencode(o.key), value: encode62.timeencode("") }).loading_promise;
    },
    fields: refilm`
*键名/key 100
显示名/name input/300
密钥/value text/100
备注/comment text/200
`}, "/token/edit");