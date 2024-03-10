function isEmpty(value) {
    if (value === '' || value === null || value === undefined || value !== value) return true;
    if (value instanceof Array && value.length === 0 || value.constructor === Object || !value.constructor) {
        for (var k in value) return false;
        return true;
    }
    return false;
}
module.exports = isEmpty;