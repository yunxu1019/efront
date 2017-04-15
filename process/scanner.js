// 以下代码暂时没用
function Code(source) {
    var code = {
        string: function readString(index) {},
        template: function readTemplate(index) {},
        regexp: function readRegExp(index) {},
        block: function readBlock(index) {}
    };
    source = new String(source);
    delete source.__proto__;
    for (var k in code) {
        source[k] = code[k];
    };
    var result = []
    return {};
};




function single_quote_scanner(index) {
    // var x = "'".codePointAt(0); //39
    // var u = "\\".codePointAt(0);//92
    while (++index < this.length) {
        if (this.codePointAt(++index) === 39 && this.codePointAt(index - 1) !== 92) break;
    }
    return index;
}

function double_qoute_scanner(index) {
    // var x = "\"".codePointAt(0);//34
    // var u = "\\".codePointAt(0);//92
    while (++index < this.length) {
        if (this.codePointAt(++index) === 34 && this.codePointAt(index - 1) !== 92) break;
    }
    return index;
}

function regexp_qoute_scanner(index) {
    // var x="/".codePointAt(0);//47
    // var u = "\\".codePointAt(0);//92
    while (++index < this.length) {
        if (this.codePointAt(index) === 47 && this.codePointAt(index - 1) !== 92) break;
    }
}

function template_qoute_scanner(index) {
    // var x1 = "`".codePointAt(0);//96
    // var x2 = "{".codePointAt(0);//123
    // var u1 = "\\".codePointAt(0);//92
    // var u2 = "$".codePointAt(0);//36
    while (++index < this.length) {
        if (this.codePointAt(index) === 96 && this.codePointAt(index - 1) !== 92) break;
        if (this.codePointAt(index) === 92 && this.codePointAt(index - 1) === 36) {
            index = template_code_scanner.apply(this, [index]);
        }
    }
    return index;
};

function multi_comment_scanner(index) {
    var index = this.indexOf("*/", index + 1);
    if (index > 0) {
        return index;
    }
    return this.length;
    // var x="/".codePointAt(0);//47
    // var x="*".codePointAt(0);//42
    // 一般多行注释有更多的星号
    // index++;
    // while(++index<this.length){
    //     if(this.codePointAt(index)===47&&this.charCodeAt(index-1)===42)break;
    // }
}

function single_comment_scanner(index) {
    // length=this.indexOf(/[\r\n\u2028\u2029]/,index)
    var c;
    while (++index < this.length) {
        c = this.charCodeAt(index);
        if (c < 0xff) {
            if (c === 10 || c === 13) {
                index--;
                break;
            }
        } else {
            if (c === 2028 || c === 2029) {
                index--;
                break;
            }
        }
    }
    return index;
}

//var declareReg=/(var|const|let)\s+([A-Za-z\$_][\w$_]*(?:\s*,\s*[A-Za-z\$_][\w$_]*)*)/g;
function block_code_scanner(index) {
    //for(){block} while(){block} function(){block} switch(){block} ()=>{block} {simple block} 
    //{object block} /var|let|const\s*{block}/ 
    // "\"'/`{}".split("").sort().map(a=>a.codePointAt(0));
    // 字节顺序，x1,x2,x3,x4,x5,x6从小到大排列
    // var x1 = "\"".codePointAt(0);//34
    // var x2 = "'".codePointAt(0);//39
    // var x3 = "/".codePointAt(0);//47
    // var x4 = "`".codePointAt(0);//96
    // var x5 = "{".codePointAt(0);//123
    // var x6 = "}".codePointAt(0);//125
    // var u = "*".codePointAt(0);//42
    var c, deep = 0;
    while (++index < this.length) {
        c = this.codePointAt(index);
        if (123 > c) { //x5
            if (47 > c) { //x3
                if (34 === c) { //x1 "
                    index = single_quote_scanner.apply(this, [index]);
                } else { //x2 ' 39
                    index = double_qoute_scanner.apply(this, [index]);
                }
            } else {
                if (47 === c) { //x3 /
                    var d = this.codePointAt(index + 1);
                    if (d === 42) { // u /* */
                        index = multi_comment_scanner.apply(this, [index + 1]);
                    } else if (d === 47) { // x3 //
                        index = single_comment_scanner.apply(this, [index + 1]);
                    } else { // /reg/
                        index = regexp_qoute_scanner.apply(this, [index]);
                    }
                } else { //x4 ` 96
                    index = template_qoute_scanner.apply(this, [index]);
                }
            }
        } else {
            if (123 === c) { //x5 { 123
                deep++;
            } else { //x6 } 125
                if (deep === 0) {
                    break;
                }
                deep--;
            }
        }
    }
    return index;
};