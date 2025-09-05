var dynareg = /\<([%\?]|script)(?:(?<=%)|(?:(?<=[\?])(?:php|jsp|asp))|(?<=\<script)[^\>]*?serverside[^\>]*\>)([\s\S]*?)(?:\<\/(?=script)\1\>|\1\>)/gi;
var seekreg = new RegExp(`^\\s*(?:\\=\\s*|return\\s+|)[^\\d\\s${punkreg.source.slice(1)}[^\\s${punkreg.source.slice(1)}*\\s*$`);
var commparse = commbuilder.parse;
function dynabuilder(buff, fileurl, filepath) {
    var that = this;
    var time = +new Date;
    var data = String(buff).replace(dynareg, function (match, split, content) {
        if (!seekreg.test(content)) {
            content = commparse.call(that, content, fileurl, filepath, false, false).data;
        }
        if (split === '%') return `<%${content}%>`;
        return `<script serverside>${content}</script>`;
    });
    data = Buffer.from(data);
    data.time = new Date - time;
    return data;
}
dynabuilder.dynareg = dynareg;
dynabuilder.seekreg = seekreg;