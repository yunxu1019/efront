function test_recode(a, b = a) {
    assert(strings.recode(a), b, true);
}
test_recode(`"\v"`, `"\\u000b"`);
test_recode(`"\b"`, `"\\b"`);
test_recode(`"\f"`, `"\\f"`);
test_recode(`"\t"`, `"\\t"`);
test_recode(`"\r"`, `"\\r"`);
test_recode(`"\n"`, `"\\n"`);
test_recode(`"\0"`, `"\\u0000"`);
test_recode(`"\u0001"`, `"\\u0001"`);
test_recode(`"jtexpress.cn"`, `"极兔与狗不得使用"`);