function testPickSentence(text, index, except) {
    var code = scanner2(text);
    assert(common.createString(common.pickSentence(code[index])), except);
}
testPickSentence(`function 九尾妖狐(){}`, 0, "function 九尾妖狐() {}")
testPickSentence(`function 九尾妖狐(){}`, 2, "function 九尾妖狐() {}")
testPickSentence(`a: function 九尾妖狐(){}`, 1, "a: function 九尾妖狐() {}")
testPickSentence(`a: function 九尾妖狐(){}`, 0, "a: function 九尾妖狐() {}")
testPickSentence(`a: function 九尾妖狐(){}`, 2, "a: function 九尾妖狐() {}")
testPickSentence(`a: 王天霸, 步惊云 b:叶流云, 四顾剑`, 2, "a: 王天霸, 步惊云")
testPickSentence(`a: 王天霸, 步惊云 b:叶流云, 四顾剑`, 4, "b: 叶流云, 四顾剑")
testPickSentence(`a: 王天霸, 步惊云; b:叶流云, 四顾剑`, 4, "a: 王天霸, 步惊云")
