var captured = {};
var emptyId = 0;
find("E:\\77").search(function (fullpath) {
    var ext = /\.([^\.]+)$/.exec(fullpath);
    ext = ext && ext[1].toLowerCase();
    if (/^(mht)$/i.test(ext)) {
        return;
    }
    return fs(fullpath).open('r').read(3).then(function (data) {
        if (!captured[ext]) captured[ext] = {};
        var map = captured[ext];
        var prefix = [].map.call(data, e => e.toString(16)).join();
        if (!/,/.test(prefix)) {
            map["_," + ++emptyId] = fullpath;
        } else if (!map[prefix]) {
            map[prefix] = fullpath;
        } else if (!isFinite(map[prefix])) {
            map[prefix] = 2;
            if (!map.captured) {
                map.captured = [];
                map.captured.push(prefix);
            }
            map.captured.count = Math.max(map.captured.count || 0, map[prefix]);
            map.captured[prefix] = map[prefix];
        } else {
            map[prefix]++;
            map.captured.count = Math.max(map.captured.count, map[prefix]);
            map.captured[prefix] = map[prefix];
        }
    }).close().then(() => a);
}).readtree().then(function (reuslt) {
    var resultMap = {};
    Object.keys(captured)
        .filter(key => captured[key].captured)
        .forEach(function (key) {
            var filesMap = captured[key];
            var files = [].concat.apply([],
                filesMap.captured ? Object.keys(filesMap).filter(key => !filesMap.captured[key] && /,/.test(key)).map(
                    key => filesMap[key]
                ) : []
            );
            resultMap[key] = files;
            files.captured = filesMap.captured;
        });
    var resultList = Object.keys(resultMap).filter(key => resultMap[key].captured.count > 6).map(key => resultMap[key]);
    var fileslist = [].concat.apply([], resultList);
    console.log(resultMap);
    return queue.call(file => fs(file).unlink(), [].concat.apply([], fileslist));
});