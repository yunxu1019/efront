function wrapHtml(htmldata) {
    return htmldata ? "`" + String(htmldata).trim().replace(/>\s+</g, "><").replace(/\\[^`]/g, "\\$&") + "`" : '``';
}
