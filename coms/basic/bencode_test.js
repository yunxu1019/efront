var format = function (data) {
    if (!isObject(data)) return data;
    if (isArray(data)) return data.map(format);
    var d = {};
    Object.keys(data).sort().map(k => d[k] = format(data[k]));
    return d;
}
var test = function (data, res) {
    var d = format(data);
    assert(bencode(d), res);
};
test({ "t": "aa", "y": "e", "e": [201, "A Generic Error Ocurred"] }, 'd1:eli201e23:A Generic Error Ocurrede1:t2:aa1:y1:ee')
test({ "t": "aa", "y": "q", "q": "ping", "a": { "id": "abcdefghij0123456789" } }, 'd1:ad2:id20:abcdefghij0123456789e1:q4:ping1:t2:aa1:y1:qe')
test({ "t": "aa", "y": "r", "r": { "id": "mnopqrstuvwxyz123456" } }, 'd1:rd2:id20:mnopqrstuvwxyz123456e1:t2:aa1:y1:re')
test({ "t": "aa", "y": "q", "q": "find_node", "a": { "id": "abcdefghij0123456789", "target": "mnopqrstuvwxyz123456" } }, 'd1:ad2:id20:abcdefghij01234567896:target20:mnopqrstuvwxyz123456e1:q9:find_node1:t2:aa1:y1:qe')
test({ "t": "aa", "y": "r", "r": { "id": "0123456789abcdefghij", "nodes": "def456..." } }, 'd1:rd2:id20:0123456789abcdefghij5:nodes9:def456...e1:t2:aa1:y1:re')
test({ "t": "aa", "y": "q", "q": "get_peers", "a": { "id": "abcdefghij0123456789", "info_hash": "mnopqrstuvwxyz123456" } }, 'd1:ad2:id20:abcdefghij01234567899:info_hash20:mnopqrstuvwxyz123456e1:q9:get_peers1:t2:aa1:y1:qe')
test({ "t": "aa", "y": "r", "r": { "id": "abcdefghij0123456789", "token": "aoeusnth", "nodes": "def456..." } }, 'd1:rd2:id20:abcdefghij01234567895:nodes9:def456...5:token8:aoeusnthe1:t2:aa1:y1:re')
test({ "t": "aa", "y": "q", "q": "announce_peer", "a": { "id": "abcdefghij0123456789", "implied_port": 1, "info_hash": "mnopqrstuvwxyz123456", "port": 6881, "token": "aoeusnth" } }, 'd1:ad2:id20:abcdefghij012345678912:implied_porti1e9:info_hash20:mnopqrstuvwxyz1234564:porti6881e5:token8:aoeusnthe1:q13:announce_peer1:t2:aa1:y1:qe')
test({ "t": "aa", "y": "r", "r": { "id": "mnopqrstuvwxyz123456" } }, 'd1:rd2:id20:mnopqrstuvwxyz123456e1:t2:aa1:y1:re')