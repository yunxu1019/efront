function isHandled(value) {
    if (value === '' || value === null || value === undefined || value !== value) return false;
    return true;
}
module.exports = isHandled;