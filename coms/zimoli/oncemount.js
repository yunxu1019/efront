function oncemount(target, handle) {
    if (isMounted(target)) {
        handle.call(target);
        return;
    }
    once("append")(target, handle);
}