<script serverside>
    var data = await readdata(req);
    return await runtask('server-register', req, data);
</script>