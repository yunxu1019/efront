function wrapHtml(htmldata) {
    return "`" + String(htmldata).trim().replace(/>\s+</g, "><").replace(/\\[^`]/g, "\\$&") + "`";
}
