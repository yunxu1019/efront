var test_2d = function () {
    var m = matrix.create2d();
    assert(m.transform([0, 1]), [0, 1])
    m.rotate(Math.PI);
    assert(m.transform([0, 1]), [0, -1])
    m.rotate(Math.PI / 2);
    assert(m.transform([1, 0]), [0, -1]);
    assert(m.transform([0, 1]), [1, 0]);
}
test_2d();