function getValue() {
    if (isFunction(this.getValue)) return this.getValue();
    return this.value;
}