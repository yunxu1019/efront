var Tokens = new Enum(
    "Element",
    "Attribute",
    "Text",
    "SingleQuoteString",
    "DoubleQuoteString",
    "Comment",
    "Space",
);
var {
    Attribute,
    SingleQuoteString,
    DoubleQuoteString,
    Comment,
    Element,
    Text,
    Space,
} = Tokens;
var RegExpressions = {
    [Attribute]: [
        //    1   ///    2   ///     3       ///---------//
        /(\s*=\s*')|(\s*=\s*")|(\s*=\s*[^\s*])|(?=\/?>|\s)/g,
        SingleQuoteString,
        DoubleQuoteString
    ],
    [SingleQuoteString]: /(\\[\s\S])|'/g,
    [DoubleQuoteString]: /(\\[\s\S])|"/g,
    [Comment]: /-->/g,
    [Element]: [
        /////// 1////2////3///    4    /// 5 //
        {
            exec(source, lookback) {
                var reg = /\/>|<\/.*?>|>(\s)|>(<)|>(.)|([^\s>\/]+)|(\s+)/g;
                reg.lastIndex = this.lastIndex;
                var res = reg.exec(source);
                this.lastIndex = reg.lastIndex;
                switch (res && res[0].charAt(0)) {
                    case ">":
                        if (lookback.length) {
                            var back = lookback[lookback.length - 1];
                            if (!back.parent.startWith(/<(?:input|img|br|hr|meta|link)/ig)) {
                                break;
                            }
                        };
                        this.lastIndex = res.index;
                        return [">"];
                    case "/":
                        this.lastIndex = res.index + 1;
                        return ["/>"];

                }
                return res;
            }
        },
        Space,
        Element,
        Text,
        Attribute
    ],
    [Space]: /(?=[^\s])/g,
    [Text]: [
        //  1 ///-----///    2     /// 3///4//
        /(<!--)|(?=<\/)|(<[^\s\/>]+)|(\s)|([^\s])/g,
        Comment,
        Element,
        Space
    ],
};
function Block(type, start, parent) {
    this.type = type;
    this.start = start;
    this.parent = parent;
}
Block.prototype = extend({
    startWith(reg) {
        reg.lastIndex = this.start;
        reg.lastIndex = this.start;
        return reg.exec(this.scanner.source).index === this.start;
    },
    getSource() {
        return this.scanner.source.slice(this.start, this.end);
    }
}, Tokens);
var xml = {
    token: Block,
    syntax: RegExpressions,
    entry: Text,
    parse(text) {
        var context = compile(text, xml);
        var tagNameReg = /<([^\s\/>]+)/g;
        var getElement = function (block) {
            tagNameReg.lastIndex = block.start;
            var match = tagNameReg.exec(text);
            if (match) {
                var tagName = match[1];
                var elem = document.createElement(tagName);
                var children = getChildren(block.children, elem);
                appendChild(elem, children);
                return elem;
            }
        };
        var getChildren = function (blocks, parentNode) {
            return blocks.map(function (block) {
                switch (block.type) {
                    case Element:
                        return getElement(block);
                    case Text:
                        var node = document.createTextNode(block.getSource());
                        return node;
                    case Attribute:
                        var source = block.getSource();
                        var spliter = source.indexOf("=");
                        if (spliter < 0) spliter = source.length;
                        var key = source.slice(0, spliter).replace(/^\s*|s*$/g, "");
                        var value = source.slice(spliter + 1).replace(/^\s*|s*$/g, "");
                        if (value) {
                            value = value.replace(/^([`'"])([\s\S]*)\1$/mg, "$2").replace(/\\([\s\S])/g, "$1")
                        }
                        parentNode && parentNode.setAttribute(key, value);
                    case Space:
                        return document.createTextNode(" ");
                }
                return null;
            });
        };
        return getChildren(context);
    },

};
