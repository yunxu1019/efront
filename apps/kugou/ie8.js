document.createElement = function (document, createElement, defineProperty) {
    var setHTML = function (v) {
        v = String(v);
        var nodePath = [this], currentNode = this;
        v.replace(/<\!\-\-[\s\S]*?(?:\-\-\!?>|$)|<(?:[^>'"]+|(["'])(?:\\[\s\S]|[\s\S])*?\1)*>|[^<]+/g, function (m, q, index) {
            var tagCloseIndex = index + m.length + 3;
            var isComment = /^<\!\-\-/.test(m);
            var tag = /^<([^\s]+)([\s\S]*)\/?>/.exec(m);
            var isTextNode = !tag;
            if (isComment || isTextNode) {
                if (v.charAt(tagCloseIndex - 1) !== '/' || v.slice(tagCloseIndex, tagCloseIndex + currentNode.tagName.length).toUpperCase() !== currentNode.tagName.toUpperCase()) {
                    currentNode = nodePath[nodePath.length - 1];
                }
            }
            if (isComment) {
                var comment = document.createComment(m.replace(/^<\!\-\-|\-\-\!?>$/g, ''));
                currentNode.appendChild(comment);
                return;
            }
            if (isTextNode) {
                var textNode = document.createTextNode(m);
                currentNode.appendChild(textNode);
                return;
            }
            var tagName = tag[1];
            if (/^[!?]/.test(tagName)) return;
            if (tagName.charAt(0) === "/") {
                tagName = tagName.slice(1).toUpperCase();
                while (currentNode && currentNode.tagName.toUpperCase() !== tagName) currentNode = nodePath.pop();
                if (currentNode === nodePath[nodePath.length - 1]) nodePath.pop();
                return;
            }
            currentNode = nodePath[nodePath.length - 1];
            tagName = tagName.replace(/\/$/, '');
            var element = createElement.call(document, tagName);
            var attributes = tag[2].trim();
            if (attributes) attributes.replace(/([^\s\'\"\=\/]+)(?:\s*\=\s*((['"])(?:\\[\s\S]|[\s\S])*?\3|\S+))?/g, function (_, name, value) {
                if (value) value = value.replace(/^['"]|["']$/g, '').replace(/\\([\s\S])/, '$1');
                else value = '';
                element.setAttribute(name, value);
            })
            currentNode.appendChild(element);
            if (!/^(input|meta|link|img)$/i.test(tagName) && !/\/\>$/.test(tag)) {
                nodePath.push(element);
            };
            currentNode = element;
        });
    };
    var getHTML = function () {
        /**
         * @type {NodeList}
         */
        var childNodes = this.childNodes;
        var text = [];
        for (var cx = 0, dx = childNodes.length; cx < dx; cx++) {
            var c = childNodes[cx];
            switch (c.nodeType === 8) {
                case 8: text.push("<!", "-", "-", c.nodeValue, "-", "-", ">"); continue;
                case 3: text.push('"', c.nodeValue.replace(/[\\"]/g, "\\$&"), '"'); continue;
                case 1:
                    var attributes = c.attributes;
                    text.push("<", c.nodeName);
                    for (var cy = 0, dy = attributes.length; cy < dy; cy++) {
                        var a = attributes[cy];
                        text.push(" ", a.name)
                        if (a.value) text.push("=\"", a.value.replace(/[\\"]/g, "\\$&"), "\"");
                    }
                    var innerHTML = c.innerHTML;
                    if (!innerHTML && /^(input|meta|link)$/i.test(c.nodeName)) {
                        text.push('>');
                        continue;
                    }
                    text.push(">", innerHTML, "</", c.nodeName, ">");
            }
        }
        return text.join('');
    };
    var descriptor = { set: setHTML, get: getHTML };
    return function (tagName) {
        var element = createElement.call(document, tagName);
        if (/^(style|script)$/i.test(element.tagName)) return element;
        defineProperty(element, "innerHTML", descriptor);
        return element;
    };
}(document, document.createElement, Object.defineProperty);
Object.defineProperty = function (Object, defineProperty) {
    return function (o, k, v) {
        if (o.nodeType) return defineProperty.call(Object, o, k, v);
        if ("value" in v) {
            return o[k] = v.value;
        }
    }
}(Object, Object.defineProperty);