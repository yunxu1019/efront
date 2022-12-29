var isIE = /edge|msie/i.test(navigator.userAgent)/*edge|ie1-10*/ || typeof document.uniqueID === "string"/* ie11 */;
function main() {
    var block = document.createElement('input');
    block.type = "checkbox";
    if (isIE) {
        block.setAttribute("ie", isIE);
        block.with = document.createElement("label");
    }
    return block;
}