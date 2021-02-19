function isText(t) {
    return /[\s\u0100-\uffff]/i.test(t)
}
module.exports = isText;