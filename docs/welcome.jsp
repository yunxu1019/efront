<script serverside>
    __efront = String(__efront);
    var fullpath = path.join(__efront, req.id);
    if (!/^\.\./.test(path.relative(fullpath, __efront)) || !/\.md$/.test(req.id)) {
        return forbidden(i18n[req.headers["accept-language"]]`禁止访问！`);
    }
    return fs.promises.readFile(fullpath);
</script>