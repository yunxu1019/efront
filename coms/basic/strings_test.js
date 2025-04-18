function test_recode(a, b = a) {
    assert(strings.recode(a), b);
}
test_recode(`"\v"`, `"\\u000b"`);
test_recode(`"\b"`, `"\\b"`);
test_recode(`"\f"`, `"\\f"`);
test_recode(`"\t"`, `"\\t"`);
test_recode(`"\r"`, `"\\r"`);
test_recode(`"\n"`, `"\\n"`);
test_recode(`"\0"`, `"\\u0000"`);
test_recode(`"\u0001"`, `"\\u0001"`);