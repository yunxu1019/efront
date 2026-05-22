function wrapHtml(htmldata) {
    return htmldata ? `\`${String(htmldata).replace(/>\s+</g, "><").replace(/\\[^`]/g, "\\$&").trim()}\`` : '``';
}
