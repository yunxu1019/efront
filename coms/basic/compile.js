"use strict";
var Scanner = function (dataString, syntax) {
    this.source = dataString;
    this.syntax = syntax.syntax;
    this.entry = syntax.entry;
    var Token = this.token = syntax.token;
    var block = this.block = new Token(syntax.entry, 0);
    block.scanner = this;
    this.blocks = this.block.children = [];
    this.source = dataString;
}
Scanner.prototype = {
    scan(index = 0, type = this.entry, collection = this.blocks, parent = this.block) {
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
            var res = reg.exec(dataString, collection);
            if (res) {
                index = reg.lastIndex;
                var inc = 0;
                while (res[++inc] === undefined) {
                    if (inc >= regInfo.length) break loop;
                }
                var matchType = regInfo[inc];
                if (!matchType) continue;
                var savedIndex = reg.lastIndex - res[inc].length;
                var children = [];
                var block = new Block(matchType, savedIndex);
                block.parent = parent;
                block.children = children;
                block.root = this.block;
                block.scanner = this;
                index = this.scan(index, matchType, children, block);
                if (collection && savedIndex < index) {
                    if (collection.length) {
                        var lastChild = collection[collection.length - 1];
                        block.prev = lastChild;
                        lastChild.next = block;
                    }
                    collection.push(block);
                }
                block.end = index;
            } else if (/y/.test(reg.flags)) {
                throw new Error(i18n`意外标记 ${dataString[index]}`);
            } else {
                index = dataString.length;
            }
        }
        return index;
    }
}
var scan = function (data, syntax) {
    var scanner = new Scanner(data, syntax);
    scanner.scan();
    return scanner.blocks;
};
module.exports = scan;