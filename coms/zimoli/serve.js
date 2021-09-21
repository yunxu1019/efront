var watchers = Object.create(null);
var wait = function (linkid, callback) {
    watchers[linkid] = cross("options", "/:care-" + linkid).success(function (res) {
        if (watchers[linkid]) wait(linkid, callback);
        var a = JSAM.parse(res.responseText);
        if (isFunction(callback)) a.forEach(b => callback(b));
    }).error(function () {
        if (watchers[linkid]) wait(linkid, callback);
    });
};
var kill = function (linkid) {
    var r = watchers[linkid];
    delete watchers[linkid];
    if (r) r.abort();
};
var block_size = 1024;
var cast = function (linkid, data) {
    data = encode(data);
    var inc = 0, size = block_size;
    return new Promise(function (ok, oh) {
        var run = function () {
            if (inc > data.length) return ok();
            cross("options", "/:cast-" + linkid + "?" + data.slice(inc, inc + size)).success(run).error(oh);
            inc += size;
        };
        run();
    }).then(function () {
        if (inc === data.length) {
            return cast(linkid, '');
        }
    });
};
var encode = function (data) {
    var str = encodeURIComponent(data.replace(/\-/g, '--')).replace(/%/g, '-');
    return str;
};
var decode = function (params) {
    params = params.replace(/\-\-|\-/g, a => a === '-' ? '%' : '-');
    params = decodeURIComponent(params);
    return params;
};

function serve(listener) {
    return new Promise(function (ok, oh) {
        cross("options", "/:link").success(function (res) {
            var responseText = res.responseText;
            wait(responseText, listener);
            ok(responseText);
        }).error(oh);
    })
}
function servd(getdata) {
    return serve(function (linkid) {
        cast(linkid, JSAM.stringify(getdata()));
    });
}
function servp(linkto) {
    return new Promise(function (ok, oh) {
        var blocks = [], _linkid;
        serve(function (block) {
            blocks.push(block);
            if (block.length < block_size) {
                var data = decode(blocks.join(''));
                ok(JSAM.parse(data));
                kill(_linkid);
            }
        }).then(function (linkid) {
            cast(linkto, linkid);
            _linkid = linkid;
        }, oh);
    });
}
serve.servd = servd;
serve.servp = servp;
serve.kill = kill;
