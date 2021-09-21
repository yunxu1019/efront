function refilm(str) {
    if (str.raw) str = str.raw;
    return refilm_decode.apply(null, [str].concat([].slice.call(arguments, 1)));
}