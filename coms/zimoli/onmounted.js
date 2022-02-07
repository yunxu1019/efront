/**
 * 在挂载后执行
 * 如果是已挂载的元素，立即执行传入的函数
 * 如果是未挂载的元素，等到挂载时执行
 * @param {Element} target 
 * @param {Function} handle 
 */
function onmounted(target, handle) {
    if (isMounted(target)) {
        handle.call(target);
        return;
    }
    once("append")(target, handle);
}