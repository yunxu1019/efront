var checkPort = async function (p, ip) {
    if (!p.host) {
        if (/^::ffff:\d+\.\d+\.\d+\.\d+$/i.test(ip)) {
            ip = ip.slice(7);
        }
        else {
            ip = `[${ip}]`;
        }
        p.locate(ip);
    }
    try {
        p.locate("/:version");
        var xhr = await cross("@options", p.href);
        if (/^efront/.test(xhr.response)) {
            p.ok = true;
        }
        else {
            p.error = '异常';
        }
    } catch (e) {
        p.error = e;
    }

}
var fields = refilm`
IP地址/ip text/120
地理位置/address/查看 act/80 ${async function (a) {
        var ip = a.ip;
        var m = /(\d+\.){3}\d+$/.exec(ip);
        var { address } = await data.from("iplocation", { ip: m ? m[0] : ip });
        a.address = address;
    }}
启动时间/time ${function (e) {
        e.innerHTML = filterTime(e.data[e.field.key]);
    }}
绑定地址/port 120/${async function (e) {
        var { data, field } = e;
        var ports = data[field.key].split(/,/).map(p => parseURL(p));
        e.innerHTML = `<a -repeat="p in ports" @click="checkPort(p,ip)" -class="{ok:p.ok,error:p.error}"><span -bind=p></span></a>`;
        render(e, {
            ports,
            ip: data.ip,
            checkPort,
        })
    }}
版本/version input
进程/pid
`;

function main() {
    var page = div();
    page.innerHTML = template;
    var items = data.from("bootlog", datas => {
        datas.forEach(a => {
            var [v, p] = String(a.ppid).split("/");
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