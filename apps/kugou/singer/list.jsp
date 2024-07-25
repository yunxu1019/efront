<script serverside>
    var fs = require("fs").promises;
    var names = await fs.readdir(__dirname);
    names = names.filter(a => /\.(jpe?g|png|gif)$/i.test(names));
    return JSON.stringify(names);
</script>