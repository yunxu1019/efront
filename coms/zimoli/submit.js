function submit() {
    try {
        return submit_.apply(this, arguments);
    } catch (e) {
        alert(String(e), 'warn');
        throw e;
    }
}