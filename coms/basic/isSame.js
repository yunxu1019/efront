function isSame(o1, o2) {
    return o1 === o2 || isNumber(o1) && isNumber(o2) && isNaN(o1) && isNaN(o2);
}