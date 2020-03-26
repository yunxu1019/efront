function setValue(value) {
    if (this.setValue instanceof Function) {
        this.setValue(value);
    }
    this.value = value;
}