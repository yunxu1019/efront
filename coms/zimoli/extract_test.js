function extract_test() {
    // src: Object, search: Object
    function test(a, b, s) {
        var r = extract(a, b)
        assert(r, s);
    }
    test({ a: 1 }, { b: 1, a: 2 }, { a: undefined });
    test({ a: "b" }, { b: 1, a: 2 }, { a: 1 });
    test({ a: "a" }, { b: 1, a: 2 }, { a: 2 });
    test(["a", "b"], { b: 1, a: 2 }, [2, 1]);
    test(["b", "a"], { b: { c: 1 }, a: 2 }, [{ c: 1 }, 2]);
    test([["b", "c"], "a"], { b: { c: 1 }, a: 2 }, [1, 2]);
    test({ a: ["b", "c"], b: "a" }, { b: { c: 1 }, a: 2 }, { a: 1, b: 2 });
}