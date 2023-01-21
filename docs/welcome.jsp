<script serverside>
    var fullpath = path.join(__efront, req.id);
    if (!/^\.\./.test(path.relative(fullpath, __efront)) || !/\.md$/.test(req.id)) {
        return forbidden("禁止访问！");
    }
    return fs.promises.readFile(fullpath);
</script>