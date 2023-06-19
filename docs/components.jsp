<script serverside>

    var fs = require("fs").promises;
    var path = require("path");
    var comm_file_reg = /\.([tj]sx?|xht|md|less|html)$/i;
    var basepath = path.join(String(__efront), 'coms');
    if (req.id) {
        var compath = path.join(basepath, req.id);
        if (!comm_file_reg.test(req.id) || !/^\.\./.test(path.relative(compath, basepath))) return forbidden(i18n[req.headers["accept-language"]]`禁止访问`);
        return fs.readFile(compath);
    }

    var readdir = async function (a) {
        var b = path.join(basepath, a);
        var names = await fs.readdir(b);
        names = names.filter(name => {
            if (/#/.test(name) || !comm_file_reg.test(name)) return false;
            return true;
        });
        return { children: names, name: a };
    };
    var data = await queue.call(["basic", "zimoli", "reptile", "frame"], readdir);
    return JSON.stringify(data);
</script>