var dynareg = /\<([%\?]|script)(?:(?<=%)|(?:(?<=[\?])(?:php|jsp|asp))|(?<=\<script)[^\>]*?serverside[^\>]*\>)([\s\S]*?)(?:\<\/(?=script)\1\>|\1\>)/gi;
var seekreg = /^(?:\=|\return\s|)\s*[^[$_a-zA-Z]\w*(\s*\.\s*[$_a-zA-Z]\w*)*\s*$/;
var commparse = commbuilder.parse;
function dynabuilder(buff, fileurl, filepath) {
    var that = this;
    var time = +new Date;
    var data = String(buff).replace(dynareg, function (match, split, content) {
        if (seekreg.test(content)) {
            content = createseek(content);
        } else {
            content = commparse.call(that, content, fileurl, filepath).data;
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