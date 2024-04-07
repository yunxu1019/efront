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

return async function (e) {
    var { data, field } = e;
    var ports = data[field.key].split(/,/).map(p => parseURL(p));
    e.innerHTML = `<a -repeat="p in ports" @click="checkPort(p,ip)" -class="{ok:p.ok,error:p.error}"><span -bind=p></span></a>`;
    render(e, {
        ports,
        ip: data.ip,
        checkPort,
    })
}