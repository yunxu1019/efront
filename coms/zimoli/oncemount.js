function oncemount(target, handle) {
    if (isMounted(target)) {
        handle.call(target);
        return;
    }
    once("mounted")(target, handle);
}