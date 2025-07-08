var huffman_map = a => {
    var sum = a[0];
    var i = 1;
    while (a[1] !== p) {
        a = a[1];
        sum |= a[0] << i++;
    }
    return [sum, i];
};
var huffman_sort = (a, b) => a[1] - b[1];
var Array_slice = Array.prototype.slice;
var isLE = (a, b) => a >= b;
var createHuffman = function (counts) {
    var rest = [];
    var counts = Array_slice.call(counts);
    do {
        var a = counts.pop();
        var b = counts.pop();
        var p = [+a + +b];
        if (!a.length) rest.unshift([0, p]);
        else a[1] = p, a[0] = 0;
        if (!b.length) rest.unshift([1, p]);
        else b[1] = p, b[0] = 1;
        saveToOrderedArray(counts, p, isLE);
    } while (counts.length > 1);

    rest = rest.map(huffman_map);
    rest = rest.sort(huffman_sort);
    return rest;
};