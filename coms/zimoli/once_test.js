function once_test() {
    once("click")(document.body, function () {
        console.log("click1");
    });
    once("click", document.body, function () {
        console.log("click2");
    });
    var off = once("click", document.body, function () {
        console.log("click3 error");
    });
    off();
    return button("once_test");
}