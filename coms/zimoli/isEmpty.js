function isEmpty(param) {
    return param === null || param === undefined || param === '' || typeof param === 'number' && !isFinite(param);
}