function call(obj) {
    return this.apply(obj, [].slice.call(arguments, 1));
}