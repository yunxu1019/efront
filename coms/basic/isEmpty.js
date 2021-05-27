function isEmpty(value) {
    return value === '' || value === null || value === undefined || typeof value === 'number' && !isFinite(value) || value instanceof Array && value.length === 0;
}