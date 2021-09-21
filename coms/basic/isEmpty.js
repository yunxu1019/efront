function isEmpty(value) {
    if (value === '' || value === null || value === undefined || typeof value === 'number' && !isFinite(value)) return true;
    if (value instanceof Array && value.length === 0) {
        for (var k in value) return false;
        return true;
    }
    return false;
}
module.exports = isEmpty;