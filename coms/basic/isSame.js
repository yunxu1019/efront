var isNaN = Number.isNaN;
function isSame(o1, o2) {
    return o1 === o2 || isNaN(o1) && isNaN(o2);
}