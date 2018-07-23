function random_test() {
    var args = [
        [random$name],
        [random$name],
        [random$name],
        [random$name],
        [random$name],
        [random$phone],
        [random$phone],
        [random$phone],
        [random$phone],
        [random$phone],
    ];
    var id = 0;
    var run = function () {
        if (id >= args.length) return;
        console.log(id);
        alert(random.apply(null, args[id]));
        id++;
        setTimeout(run, 200);
    }
    run();
}