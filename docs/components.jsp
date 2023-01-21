<script serverside>

    var fs = require("fs").promises;
    var path = require("path");
    var comm_file_reg = /\.([tj]sx?|xht|md)$/i;
    var readdir = async function (a) {
        var b = path.join(__efront, "coms", a);
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