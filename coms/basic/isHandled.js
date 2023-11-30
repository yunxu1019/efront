function isHandled(value) {
    if (value === '' || value === null || value === undefined || Number.isNaN(value)) return false;
    return true;
}
module.exports = isHandled;