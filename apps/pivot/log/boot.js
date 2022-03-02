cross.addDirect(/^https?\:\/\/([[a-z\.\d\:\/%]+\]|[\d\.]+)(\:\d+)?\//);
var fields = refilm`
地址/ip
地理位置/ip ${function (e) {
        var ip = e.data[e.field.key];
        var m = /(\d+\.){3}\d+$/.exec(ip);
        if (m) {
            var setAddress = function (a) {
                var l = document.createElement('label');
                l.innerText = a;
                appendChild(e, l);
            };
            if (e.data.address) setAddress(e.data.address);
            else data.from("iplocation", { ip: m[0] }, function (a) {
                e.data.address = a.address;
                setAddress(a.address);
            });
        }
        return e;
    }}
启动时间/time ${function (e) {
        e.innerHTML = filterTime(e.data[e.field.key]);
    }}
端口/port ${async function (e) {
        var { data, field } = e;
        var ports = data[field.key].split(/,/);
        var loaded = [];
        for (var p of ports) {
            var p0 = p;
            var protocol = /^https/.test(p) ? "https://" : "http://";
            p = p.replace(/[^\d]+/g, '');
            if (p) p = ":" + p;
            try {
                var ip = data.ip;
                if (/^::ffff:\d+\.\d+\.\d+\.\d+$/i.test(ip)) {
                    ip = ip.slice(7);
                }
                else {
                    ip = `[${ip}]`;
                }
                var xhr = await cross("options", `${protocol}${ip}${p}/:version`);
                if (xhr.responseText === 'efront ' + data.version) {
                    loaded.push(`<span style="color:green">${p0}</span>`);
                } else {
                    loaded.push(`<span style="color:red">${p0}</span>`);
                }
            } catch (e) {
                loaded.push(`<span style="color:gray">${p0}</span>`);
            }
            e.innerHTML = loaded.join('');
        }
    }}
版本 / version text
进程 / pid
    `;
function main() {
    var page = div();
    page.innerHTML = template;
    var items = data.from("bootlog", datas => {
        datas.forEach(a => {
            var [v, p] = a.ppid.split("/");
            a.version = v;
            a.pid = p;
        });
        datas.sort((a, b) => b.time - a.time);
        return datas;
    });
    renderWithDefaults(page, {
        items,
        fields
    });
    return page;
}