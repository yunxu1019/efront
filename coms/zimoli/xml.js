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
        /(\s*=\s*')|(\s*=\s*")|(\s*=\s*[^\s*])|(?=\/?>|\s)/yg,
        SingleQuoteString,
        DoubleQuoteString
    ],
    [SingleQuoteString]: /(\\[\s\S])|'/yg,
    [DoubleQuoteString]: /(\\[\s\S])|"/yg,
    [Comment]: /-->/yg,
    [Element]: [
        /////// 1////2////3///    4    /// 5 //
        /\/>|<\/.*?>|>(\s)|>(<)|>(.)|([^\s>\/]+)|(\s+)/yg,
        Space,
        Element,
        Text,
        Attribute
    ],
    [Space]: /(?=[^\s])/yg,
    [Text]: [
        //  1 ///-----///    2     /// 3///4//
        /(<!--)|(?=<\/)|(<[^\s\/>]+)|(\s)|([^\s])/yg,
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
                        var attr = block.getSource().split(/\s*=\s*/);
                        parentNode && parentNode.setAttribute(attr[0], attr[1] || "");
                    case Space:
                        return document.createTextNode(" ");
                }
                return null;
            });
        };
        return getChildren(context);
    },

};
