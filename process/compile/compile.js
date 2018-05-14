var Scanner = function (dataString, syntax) {
    this.source = dataString;
    this.syntax = syntax.syntax;
    this.token = syntax.token;
    this.entry = syntax.entry;
    this.blocks = [];
}
Scanner.prototype = {
    scan(index = 0, type = this.entry, collection = this.blocks, parent = null) {
        var regInfo = this.syntax[type];
        var dataString = this.source;
        var Block = this.token;
        if (!regInfo) return index;
        if (!(regInfo instanceof Array)) {
            regInfo = [regInfo];
        }
        var reg = regInfo[0];
        loop: while (index < dataString.length) {
            reg.lastIndex = index;
            var res = reg.exec(dataString);
            if (res) {
                index = res.index + res[0].length;
                var inc = 0;
                while (!res[++inc]) {
                    if (inc >= regInfo.length) break loop;
                }
                var children = [];
                var matchType = regInfo[inc];
                if (!matchType) continue;
                var savedIndex = res.index;
                var block = new Block(matchType, savedIndex);
                block.parent = parent;
                index = this.scan(index, matchType, children, block);
                block.end = index;
                if (children.length) block.children = children;
                if (collection && savedIndex < index) {
                    collection.push(block);
                }
            } else {
                index = dataString.length;
            }
        }
        return index;
    }
}
var scan = function (data, syntax) {
    var blocks = [];
    var scanner = new Scanner(data, syntax);
    scanner.scan(undefined, undefined, blocks);
    return blocks;
};
module.exports = scan;