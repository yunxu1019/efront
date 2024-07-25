<script serverside>
    var fs = require("fs").promises;
    var names = await fs.readdir(__dirname);
    names = names.filter(a => /\.(flac|mp3|wav)$/i.test(a));
    return JSON.stringify(names);
</script>