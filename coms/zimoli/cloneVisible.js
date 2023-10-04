var cloneProperties = "fontWeight,fontSize,fontFamily,color,textShadow,opacity,writingMode,blockSize,wordSpacing,letterSpacing,whiteSpace".split(",");// text-node
var cloneProperties2 = "position,backdropFilter,filter,float,clear,margin,color,verticalAlign,textAlign,textShadow,opacity,boxShadow,overflow,textOverflow,wordBreak,webkitLineClamp,webkitBoxOrient,writingMode,blockSize,wordSpacing,letterSpacing,textIndent,lineHeight,display,appearance,webkitAppearance,MozAppearance".split(",");// element
var pushProperty = function (key, props) {
    props.split(",").forEach(k => {
        cloneProperties2.push(key + k);
    });
};
if (/firefox|Trident/i.test(navigator.userAgent)) {
    pushProperty("border",
        "Collapse,ImageRepeat,BlockEndStyle,BlockStartStyle,BottomStyle,InlineEndStyle,InlineStartStyle,LeftStyle,RightStyle,TopStyle,ImageOutset,ImageSlice,ImageSource,ImageWidth,Spacing,BlockEndWidth,BlockStartWidth,BottomWidth,InlineEndWidth,InlineStartWidth,LeftWidth,RightWidth,TopWidth,BottomLeftRadius,BottomRightRadius,EndEndRadius,EndStartRadius,StartEndRadius,StartStartRadius,TopLeftRadius,TopRightRadius,BlockEndColor,BlockStartColor,BottomColor,InlineEndColor,InlineStartColor,LeftColor,RightColor,TopColor"
    );
    pushProperty("padding",
        "BlockEnd,BlockStart,Bottom,InlineEnd,InlineStart,Left,Right,Top"
    );
    pushProperty("margin",
        "BlockEnd,BlockStart,Bottom,InlineEnd,InlineStart,Left,Right,Top"
    );
    pushProperty("background", "Attachment,BlendMode,Clip,Image,Origin,PositionX,PositionY,Repeat,Size,Color,Position");
    pushProperty("font", "Weight,Kerning,OpticalSizing,SizeAdjust,Stretch,Style,Synthesis,VariantCaps,VariantEastAsian,VariantLigatures,VariantNumeric,VariantPosition,Weight,Family,FeatureSettings,LanguageOverride,Size,VariantAlternates,VariationSettings,Variant");
} else {
    pushProperty("border", "Style,Width,Color,Image,Radius");
    cloneProperties2.push("padding", "font", "background");
}
var copyStyle = function (srcStyle, dstStyle, cloneProperties = cloneProperties2) {
    for (var cx = 0, dx = cloneProperties.length; cx < dx; cx++) {
        var k = cloneProperties[cx];
        if (k in dstStyle) {
            if ((dstStyle[k] || srcStyle[k]) && dstStyle[k] !== srcStyle[k]) {
                dstStyle[k] = srcStyle[k] || "";
            }
        }
    }
};
var getZIndex = function (node) {
    return node.nodeType === 1 ? +getComputedStyle(node).zIndex || 0 : 0;
};
var cloneChildren = function (td, copy, clone) {
    switch (String(copy.tagName).toLowerCase()) {
        case "input":
        case "textarea":
            copy.placeholder = td.placeholder;
            copy.setAttribute("value", td.value);
            break;
        case "select":
            var selector = `option[value="${String(td.value === null || td.value === undefined ? '' : td.value).replace(/"/g, "\\\"")}"]`;
            var opt = td.querySelector && td.querySelector(selector);
            if (opt) {
                copy.innerHTML = opt.outerHTML;
            } else {
                copy.innerHTML = td.innerHTML;
            }
            copy.value = td.value;
            break;
        case "img":
            copy.src = td.src;
            break;
        case "svg":
            copy.innerHTML = td.innerHTML;
            [].forEach.call(td.attributes || [], a => {
                if (/^[\w\-]+$/i.test(a.name)) copy.setAttribute(a.name, a.value);
            });
            break;
        default:
            var children = Array.prototype.slice.call(td.childNodes, 0).filter(isMaybeVisible);
            children.sort((a, b) => {
                return getZIndex(a) - getZIndex(b);
            }).forEach(clone);
    }
    var before = clonePseudo(td, ':before'), after = clonePseudo(td, ':after');
    if (before) copy.insertBefore(before, copy.firstChild);
    if (after) copy.appendChild(after);

};
/**
 * @param {Node}
 */
var isMaybeVisible = function (node) {
    if (!node || !node.parentNode || node.nodeType > 3 || node.nodeType === 2) return;
    if (/^(style|link|script|meta)$/i.test(node.tagName)) return;
    var style = node.style;
    if (!style) {
        node = node.parentNode;
    }
    style = getComputedStyle(node);
    if (style.display === "none") return;
    if (style.visibility === "hidden" || style.visibility === "collapse") return;
    if (+style.opacity === 0) return;
    if (style.position === "fixed") return;
    if (style.overflow === "hidden") {
        if (node.offsetHeight === 0 || node.offsetWidth === 0) return;
    }
    if (node.offsetParent) {
        var parent = node.offsetParent;
        if (getComputedStyle(parent).overflow === 'visible') return true;
        return !(node.offsetLeft + node.offsetWidth - parent.scrollLeft <= parent.clientLeft ||
            node.offsetTop + node.offsetHeight - parent.scrollTop <= parent.clientTop ||
            node.offsetLeft - parent.scrollLeft >= (parent.clientWidth || parent.offsetWidth) ||
            node.offsetTop - parent.scrollTop >= (parent.clientHeight || parent.offsetHeight));
    }
    return true;
}
var clonePseudo = function (node, pseudo) {
    var pseudoStyle = getComputedStyle(node, pseudo);
    if (pseudoStyle.content === 'none' || !pseudoStyle.content) return;
    var copy = document.createElement(pseudo.slice(1));
    copy.innerText = pseudoStyle.content.replace(/^"|"$/g, '').replace(/\\([\s\S])/g, '$1');
    copyStyle(pseudoStyle, copy.style);
    return copy;
};
var hasPseudo = function (node, pseudo) {
    var pseudoStyle = getComputedStyle(node, pseudo);
    return pseudoStyle.content && pseudoStyle.content !== 'none';
};
var cloneCanvas = function (canvas) {
    var clonedCanvas = canvas.cloneNode(false);
    clonedCanvas.width = canvas.width;
    clonedCanvas.height = canvas.height;
    if (!canvas.getContext) return clonedCanvas;
    var ctx = canvas.getContext('2d');
    var clonedCtx = clonedCanvas.getContext('2d');
    if (clonedCtx) {
        if (ctx) {
            clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
        }
        else {
            clonedCtx.drawImage(canvas, 0, 0);
        }
    }
    return clonedCanvas;
};
var cloneVisible = function (td) {
    var result = document.createElement("clone");
    if (!isMaybeVisible(td.offsetParent)) return result;
    var _left, _top, _right, _bottom;
    var span = document.createElement("x");
    var hasSvg = false;
    /**
     * @param {Node} td
     */
    var clone = function (td) {
        if (!isMaybeVisible(td)) return;
        if (td.nodeType === 3) {
            var copy = span.cloneNode();
            copy.appendChild(td.cloneNode());
            var parentNode = td.parentNode;
            parentNode.insertBefore(copy, td);
            parentNode.removeChild(td);
            var { left, top, width, height } = getScreenPosition(copy);
            var style = getComputedStyle(copy);
            copyStyle(style, copy.style, cloneProperties);
            parentNode.insertBefore(td, copy);
            parentNode.removeChild(copy);
            result.appendChild(copy);
        } else if (td.nodeType !== 1) return;

        else {
            var style = getComputedStyle(td);
            if (/(?:hidden)/.test(style.overflow) || hasPseudo(td, ":after")) {
                var copy = cloneCell(td);
                result.appendChild(copy);
            } else {
                var copy = createElementFromNode(td);
                copyStyle(style, copy.style);
                result.appendChild(copy);
                cloneChildren(td, copy, clone);
            }
            var { left, top, width, height } = getScreenPosition(td);
            if (!hasSvg && /^svg$/i.test(td.tagName)) {
                hasSvg = true;
            }

        }
        var right = left + width;
        var bottom = top + height;
        copy.tempstyle = {
            left,
            top,
            width,
            height
        };
        if (_left === undefined || _left > left) _left = left;
        if (_top === undefined || _top > top) _top = top;
        if (_right === undefined || _right < right) _right = right;
        if (_bottom === undefined || _bottom < bottom) _bottom = bottom;
    };
    clone(td);
    extend(result.style, {
        zIndex: getComputedStyle(td).zIndex,
        position: "absolute",
        left: _left + "px",
        top: _top + "px",
        width: _right - _left + "px",
        height: _bottom - _top + "px"
    });
    Array.prototype.map.call(result.children, function (element) {
        var { left, top, width, height } = element.tempstyle;
        extend(element.style, {
            position: "absolute",
            display: "block",
            margin: 0,
            boxSizing: "border-box",
            left: (left - _left) + "px",
            top: (top - _top) + "px",
            width: width + "px",
            height: height + "px"
        });
    });
    if (hasSvg) result.innerHTML = result.innerHTML;
    return result;
};

var createElementFromNode = function (node) {
    if (node.namespaceURI && !/html$/i.test(node.namespaceURI)) {
        return document.createElementNS(node.namespaceURI, node.tagName);
    }
    return document.createElement(node.tagName);
}

function cloneCell(node, parentPosition) {
    if (!node || node.nodeType > 3 || node.nodeType === 2) return;
    var style = node.style;
    if (!style) return node.cloneNode();
    if (!isMaybeVisible(node)) return;
    style = getComputedStyle(node);
    var clone = createElementFromNode(node);
    var cloneStyle = clone.style;
    copyStyle(style, cloneStyle);
    var screenPosition = getScreenPosition(node);
    clone.value = node.value;
    if (parentPosition && cloneStyle.position === "absolute") {
        cloneStyle.left = (screenPosition.left - parentPosition.left) + "px";
        cloneStyle.top = (screenPosition.top - parentPosition.top) + "px";
    } else {
        cloneStyle.margin = style.margin;
        cloneStyle.left = style.left;
        cloneStyle.top = style.top;
    }
    cloneStyle.width = screenPosition.width + "px";
    cloneStyle.height = screenPosition.height + "px";
    cloneStyle.boxSizing = "border-box";
    cloneChildren(node, clone, function (child) {
        var childClone = cloneCell(child, screenPosition);
        if (childClone) clone.appendChild(childClone);
    });
    return clone;
}
cloneVisible.cell = cloneCell;