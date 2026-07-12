var errbg = `-style="{background:item?.crash&&s.id in item.crash?'#fde':'#fff'}"`;
var detailWindow = view();
on('submit')(detailWindow, e => e.preventDefault());
drag.on(detailWindow, detailWindow.firstElementChild);
resize.on(detailWindow);
css(detailWindow, `position:absolute;left:0;top:0;bottom:0;width:260px;`);
detailWindow.initialStyle = "margin-left:-100px;opacity:0";
var updateCrash = lazy(function () {
    var item = detailScope.item;
    setCrash(item);
});
bind('input', document)(detailWindow, updateCrash);
bind('keyup', document)(detailWindow, updateCrash);
bind('paste', document)(detailWindow, updateCrash);
bind('cut', document)(detailWindow, updateCrash);
var salt = `efront${Math.random().toString(36).slice(6, 16)}`;

var config = data.getInstance("fanyi-config");
if (!config.tool) config.tool = `baidu`;
if (!config.model_id) config.model_id = 'gemini-3.5-flash';
if (!config.gemini_version) config.gemini_version = "v1";
var requestBaiduFanyi = async function (str, to, from = 'auto', nbr) {
    var appid = config.appid || "20210218000700622";
    var sign = config.sign || "xJf0dfXeJdzudCTBn3QS";
    var limit = 6000;
    if (str.length > limit || /[\r\n\u2028\u2029]/.test(str) && nbr !== false) {
        var strs = [];
        str.replace(/([^\r\n\u2028\u2029]*)([\r\n\u2028\u2029]*)/g, function (_, a, b) {
            strs.push([a, b]);
        });
        var reqstr = [];
        var reqbr = [];
        var res = [];
        var reqlength = 0;
        var req = async function () {
            var res = await requestBaiduFanyi(reqstr.join('\r\n'), to, from, false);
            res = res.split("\r\n").map((a, i) => {
                return a + reqbr[i];
            }).join("");
            return res;
        };
        for (var s of strs) {
            var [a, b] = s;
            if (a.length > limit) {
                throw i18n`文本过长无法翻译！`;
            }

            reqlength += a.length + 2;
            if (reqlength > limit || !a && reqstr.length) {
                res.push(await req());
                await wait(200);
                reqstr = [];
                reqbr = [];
                reqlength = a.length;
            }
            if (a) {
                reqstr.push(a);
                reqbr.push(b);
            }
            else {
                res.push(b);
            }
        }
        if (reqlength) {
            res.push(await req());
        }
        return res.join('');
    }
    var req = async function (prefix = '', postfix = '') {
        var map = Object.create(null);
        var str1 = str.replace(/\$(\d+)/g, (_, a) => {
            var k = prefix + a + postfix;
            map[k] = "$" + a;
            return k;
        });
        var xhr = await cross("get", "https://fanyi-api.baidu.com/api/trans/vip/translate").send({
            q: str1,
            from,
            to,
            appid,
            salt,
            sign: md5(`${appid}${str1}${salt}${sign}`),
        });
        var data = JSON.parse(xhr.response);
        if (+data.error_code > 54000) {
            throw data.error_msg;
        }
        var n = /\s*(\d+|[\u0d66-\u0d6f]+|[\u09E6-\u09ef]+)/;
        var reg = new RegExp(`${escapeRegExp(prefix)}${n.source}${escapeRegExp(postfix)}|${escapeRegExp(postfix)}${n.source}${escapeRegExp(prefix)}`, 'g');
        var map1 = Object.assign(Object.create(null), map);
        var lack = false;
        var res = data.trans_result.map(a => {
            a = a.dst.replace(reg, (_, a) => {
                if (/[\u0d66-\u0d6f]/.test(a)) a = a.split("").map(a => a.charCodeAt() - 0xd66).join("");
                else if (/[\u09e6-\u09ef]/.test(a)) a = a.split("").map(a => a.charCodeAt() - 0x9e6).join("");
                var k = prefix + a + postfix;
                var m = map1[k];
                if (!m) {
                    lack = true;
                    return _;
                }
                delete map1[k];
                return m;
            });
            return a;
        }).join('\r\n');
        var count = Object.keys(map1).length;
        if (!count && !lack) return [count, res];
        return [count || lack, res];
    }
    var [count, res] = await req("#", "");
    if (!count) return res;
    var [count, res] = await req("@", "");
    if (!count) return res;
    var [count, res] = await req("$", "");
    return res;
};
cross.addDirect("https://generativelanguage.googleapis.com/");
var requestGemini = async function (str, caps, context, loadcount) {
    var apikey = config.API_KEY;
    if (!apikey) {
        alert(i18n`请配置密钥（API Key）后使用`, 'error');
        return;
    }
    var model_id = config.model_id;
    var version = config.gemini_version;
    var url = `https://generativelanguage.googleapis.com/${version}/interactions`;
    if (!caps) {
        caps = 0;
        str = str.replace(/\$(\d+)/, (_, d) => {
            caps++;
        });
    }
    var contexts = [];
    if (context) contexts.push(context);
    if (caps) {
        var caps = "语句中存在变量占位符，以“$”开紧随整数数值，这里出现的" + new Array(caps).fill(0).map((_, i) => "“$" + (i + 1)+"”").join('、')+"均为占位符，不翻译";
        contexts.push(caps);
    }
    if (str) contexts.push(`请以“${str}”的语义为准，给出不同语种的翻译。`);
    var trans = {};
    var fanyi = detailScope.fanyi;
    var propdef = {};
    detailScope.supports.forEach(s => {
        trans[s.lang] = fanyi[s.id] || s.name;
        propdef[s.lang] = {
            type: "string",
            description: s.name,

        }
    });
    var responseSchema = {
        type: "object",
        properties: propdef,
    };
    responseSchema.required = Object.keys(propdef);
    var xhr = cross('post', url, {
        "Content-Type": "application/json",
        'x-goog-api-client': 'gl-node/0.1.0',
        'Accept': 'application/json',
        "X-goog-api-key": apikey
    }).send({
        model: model_id,
        input: contexts.join("。"),
        response_format: {
            type: 'text',
            mime_type: 'application/json',
            schema: responseSchema
        }
    });
    try {
        await xhr;
        var data = JSON.parse(xhr.response);
        var steps = data.steps;
        return JSON.parse(steps[steps.length - 1].content[0].text);
    } catch {
        var { error } = JSON.parse(xhr.response);
        if (error.code === 429) {
            var retryAfter = error.details.pop().retryDelay;
            if (/^\d+s$/i.test(retryAfter) && loadcount < 1) {
                retryAfter = parseInt(retryAfter);
                var alt = alert(i18n`请求频率超限`, false);
                while (retryAfter > 0) {
                    alt.setText(i18n`请求频率超限，将在${retryAfter}秒后重试`, false);
                    retryAfter--;
                    await wait(1000);
                }
                alt.setText(i18n`正在重试`);
                await wait(1000 * Math.random() | 0);
                return await requestGemini(str, caps, context, ++loadcount);
            }
        }
        alert(error.message, 'error');
    }
};
var requestDoubao = async function (params) {
    `ark-5cd3c8b7-fae7-4af2-9d8e-7edebd430c35-8938f`;
}
var detailScope = {
    drop,
    checker,
    item: null,
    select,
    field,
    textarea,
    supports: supports.checked,
    button,
    lattice,
    fanyi: {},
    context: '',
    config,
    a: button,
    get actname() {
        return config.tool === 'gemini'
            ? i18n`问问Gemini`
            : i18n`一键百度`;
    },
    _baiduAll: false,
    contexts: [
        { name: i18n`语境提示词`, key: '' }
    ],
    get baiduAll() {
        return this._baiduAll;
    },
    _wakeLock: null,
    _wakeAlert: null,
    async wakeLock() {
        if (this._wakeLock) {
            this.wakeLockEnd();
        }
        if (navigator.wakeLock) {
            this._wakeLock = navigator.wakeLock.request("screen");
            this._wakeLock = await this._wakeLock;
            if (this._wakeLock) this._wakeAlert = alert(i18n`当前状态会保持屏幕常亮，如您暂时离开，建议您手动锁屏`, 'warn', false);
        }
    },
    async wakeLockEnd() {
        var wakeLock = await this._wakeLock;
        this._wakeLock = null;
        if (wakeLock) {
            await wakeLock.release();
            if (this._wakeLock === wakeLock) this._wakeLock = null;
            if (!this._wakeLock) remove(this._wakeAlert);
        }
    },
    set baiduAll(v) {
        this._baiduAll = v;
        if (v) this.wakeLock();
        else this.wakeLockEnd();
    },
    async baidu2() {
        var startRow = activedRow;
        var direction = 1;
        do {
            var nextRow = null;
            if (config.tool === 'gemini') await this.gemini();
            else await this.baidu();
            if (activedRow && this.baiduAll) {
                if (direction > 0) {
                    var nextRow = activedRow.nextElementSibling;
                    if (nextRow) {
                        nextRow.click();
                        await wait(200);
                    }
                    else direction = -1;
                }
                if (direction < 0) {
                    var nextRow = activedRow.previousElementSibling;
                    if (nextRow) nextRow.click();
                }
                if (nextRow) {
                    tableElement.children[1].setFocus(nextRow);
                }
            }
            await wait(200);

        } while (nextRow);

    },
    async gemini() {
        var item = this.item;
        var fanyi = this.fanyi;
        if (!item) {
            for (var k in fanyi) {
                text = fanyi[k];
                if (text) break;
            }
        }
        else {
            var text = item.text, caps = item.caps;
            item.context = this.context;
        }
        if (!text) return;
        var start = new Date();
        try {
            var res = await requestGemini(text, caps, this.context, 0);
            var deltaTime = new Date - start;
            if (deltaTime < 6000) await wait(6000 - deltaTime);
            this.supports.forEach(s => {
                fanyi[s.id] = res[s.lang];
            });
            更新翻译数();
        } catch (e) {
            console.log(e)
            // var e = JSON.parse(e.responseText).error;
            // if (error?.message) {
            //     alert(error.message, 'error');
            // }
        }

    },
    async baidu() {

        var fanyi = this.fanyi;
        var item = this.item;
        if (item) {
            更新翻译数();
            var liang = item.liang;
            var text = item.text;
        }
        var from = 'auto';
        if (!text) for (var k in fanyi) {
            if (fanyi[k]) {
                text = fanyi[k], from = k;
                break;
            }
        }
        try {
            for (var s of this.supports) {
                var fy = fanyi[s.id];
                if (fy instanceof Array) fy = fy[0];
                if (typeof fy === 'string' && fy.trim()) continue;
                fanyi[s.id] = await requestBaiduFanyi(text, s.id, from);
                liang++;
                if (item) item.liang = liang;
                if (item) setCrash(item);
                render.digest();
            }
            if (item) item.liang = liang;
        } catch (e) {
            alert(e, 'error');
        }
    },
    copyText() {
        return copyToClipboard(this.item.text);
    },
    save() {

    },
    close() {
        remove(detailWindow);
    }
};
data.bindInstance('fanyi-config', function (fanyiConfig) {
    detailScope.supports = supports.checked = fanyiConfig.smap ? supports.filter(s => fanyiConfig.smap[s.id]) : supports.slice(0, 8);
});

var 更新翻译数 = function () {
    var count = 0;
    var fanyi = detailScope.fanyi;
    if (fanyi) {
        for (var s of supports) {
            var fy = fanyi[s.id];
            if (fy instanceof Array) fy = fy[0];
            if (typeof fy === 'string' && fy.trim()) count++;
        }
        if (detailScope.item) {
            detailScope.item.liang = count;
        }
    }
};
on('remove')(detailWindow, function () {
    更新翻译数();
    delete detailScope.item;
})
var tableElement, activedRow;
detailWindow.setItem = function (item, tableElement_, activedRow_) {
    detailScope.item = item;
    detailScope.fanyi = item ? item.fanyi : Object.create(null);
    detailScope.context = item ? item.context || '' : '';
    tableElement = tableElement_;
    activedRow = activedRow_;
    detailScope.contexts = [detailScope.contexts[0]].concat(supports.contexts.map(k => ({ key: k, name: k })));
    更新翻译数();
}
detailWindow.supports = supports;
supports.forEach(a => {
    a.info = a.land()
});

function main() {
    detailWindow.innerHTML = template;
    render(detailWindow, detailScope);
    render.digest();
    return detailWindow;
}
