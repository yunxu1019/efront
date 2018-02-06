window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozcancelAnimationFrame || window.webkitcancelAnimationFrame || window.mscancelAnimationFrame || function (id) {
    return clearTimeout(id);
};