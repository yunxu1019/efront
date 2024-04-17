"use strict";
function test(test, count) {
    var time = +new Date;
    if (test instanceof Function) {
        while (count-- > 0) {
            test();
        }
    }
    return new Date - time;
}
// -   function () {
//         single_comment_scanner.call("'", 0) === 1;
//         single_comment_scanner.call(" ", 0) === 1;
//         single_comment_scanner.call("' ", 0) === 1;
//         single_comment_scanner.call("\\'", 0) === 2;
//         single_comment_scanner.call(" ' ", 0) === 2;
//         single_comment_scanner.call("\\''", 0) === 3;
//         single_comment_scanner.call("\\'' ", 0) === 3;
//         // var t1=test(function(){
//         //     /[\r\n\u2028\u2029]/.exec(" ");
//         // },10000000);//300+
//         // var t2=test(function(){
//         //     "\r\n\u2028\u2029".indexOf(" ");
//         // },10000000);//700+
//         // console.log(t1,t2);
//     }();
// console.log(single_quote_scanner.call("''", 0))



/**
 * 单引号字符串扫描
 * @param {Inteter} index 
 */
// var count = 1000000;
// var string="                  '"
// var t1 = test(function () {
//     single_quote_scanner.call(string,0);
// }, count);//240+
// var t2 = test(function () {
//     single_quote_scanner2.call(string,0)
// }, count);//1202+
// console.log(t1, t2);
function single_quote_scanner(index) {
    var reg = /\\[\s\S]|'/g;
    reg.lastIndex = index + 1;
    do {
        var res = reg.exec(this);
    } while (res && res[0].length > 1);
    return res ? res.index + 1 : this.length;
}

function single_quote_scanner2(index) {
    // var x = "'".codePointAt(0); //39
    // var u = "\\".codePointAt(0);//92

    var length = this.length;
    while (++index < length) {
        // 字符的速度比codePointAt快点
        if (this[index] === "'" && this[index - 1] !== "\\") return index + 1;
        // if (this.codePointAt(index) === 39 && this.codePointAt(index - 1) !== 92) return index + 1;
    }
    return index;
}


/**
 * 双引号字符串扫描
 * @param {Integer} index 
 */
// var count = 1000000;
// var string="                  '"
// var t1 = test(function () {
//     double_quote_scanner.call(string,0);
// }, count);//240+
// var t2 = test(function () {
//     double_quote_scanner2.call(string,0)
// }, count);//1128+
// console.log(t1, t2);
function double_quote_scanner(index) {
    var reg = /\\[\s\S]|"/g;
    reg.lastIndex = index + 1;
    do {
        var res = reg.exec(this);
    } while (res && res[0].length > 1);
    return res ? res.index + 1 : this.length;
}

function double_quote_scanner2(index) {
    // var x = "\"".codePointAt(0);//34
    // var u = "\\".codePointAt(0);//92
    var length = this.length;
    while (++index < length) {
        // 字符的速度比codePointAt快点
        // if (this.codePointAt(index) === 34 && this.codePointAt(index - 1) !== 92) return index + 1;
        if (this[index] === "\"" && this[index - 1] !== "\\") return index + 1;
    }
    return index;
}



/**
 * 正则表达式扫描
 * @param {Integer} index 
 */
// var count = 1000000;
// var string="                  '"
// var t1 = test(function () {
//     regexp_quote_scanner.call(string,0);
// }, count);//220+
// var t2 = test(function () {
//     regexp_quote_scanner2.call(string,0)
// }, count);//1200+
// console.log(t1, t2);
function regexp_quote_scanner(index) {
    var reg = /\\[\s\S]|\[(\\[\s\S]|[^\]])+\]|\/[\w]*/g;
    reg.lastIndex = index + 1;
    do {
        var res = reg.exec(this);
    } while (res && res[0][0] !== "/");
    return res ? res.index + res[0].length : this.length;
}

function regexp_quote_scanner2(index) {
    // var x="/".codePointAt(0);//47
    // var u = "\\".codePointAt(0);//92
    while (++index < this.length) {
        // if (this.codePointAt(index) === 47 && this.codePointAt(index - 1) !== 92) return index + 1;
        // 字符的速度比codePointAt快点
        if (this[index] === "/" && this[index - 1] !== "\\") return index + 1;
    }
    return index;
}

/**
 * 模版字符串扫描
 * @param {Integer} index 
 * @param {Array} blocks 
 */
// var count = 1000000;
// var string = "                  ${`"
// var t1 = test(function () {
//     template_quote_scanner.call(string, 0);
// }, count); //610+
// var t2 = test(function () {
//     template_quote_scanner2.call(string, 0)
// }, count); //2500+
// console.log(t1, t2);

function template_quote_scanner(index, blocks) {
    index++;
    while (index < this.length) {
        var reg = /\\[\s\S]|`|\$\{/g;
        reg.lastIndex = index;
        var res = reg.exec(this);
        if (!res) {
            return this.length;
        }
        if (res[0] === "${") {
            index = block_code_scanner.call(this, res.index + 2, blocks);
        } else if (res[0].length === 1) {
            return res.index + 1;
        } else {
            index = reg.lastIndex;
        }
    }
    return index;
}

function template_quote_scanner2(index, blocks) {
    // var x1 = "`".codePointAt(0);//96
    // var x2 = "{".codePointAt(0);//123
    // var u1 = "\\".codePointAt(0);//92
    // var u2 = "$".codePointAt(0);//36
    var length = this.length;
    while (++index < length) {
        // if (this.codePointAt(index) === 96 && this.codePointAt(index - 1) !== 92) return index + 1;
        // if (this.codePointAt(index) === 92 && this.codePointAt(index - 1) === 36) {
        //     index = block_code_scanner.call(this, index, blocks);
        // }
        if (this[index] === "`" && this[index - 1] !== "\\") return index + 1;
        if (this[index] === "{" && this[index - 1] === "$") {
            index = block_code_scanner.call(this, index + 1, blocks);
        }
    }
    return index;
};
/**
 * 多行注释扫描
 * @param {Integer} index 
 */
// var count = 1000000;
// var string = "                  ${`";
// var t1 = test(function () {
//     multi_comment_scanner.call(string, 0);
// }, count); //266+
// var t2 = test(function () {
//     multi_comment_scanner2.call(string, 0);
// }, count); //266+
// console.log(t1, t2);
function multi_comment_scanner(index) {
    var reg = /\*\//g;
    reg.lastIndex = index + 1;
    var res = reg.exec(this);
    return res ? res.index + 2 : this.length;
}

function multi_comment_scanner2(index) {
    var index = this.indexOf("*/", index + 1);
    if (index > 0) {
        return index + 2;
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
/**
 * 单行注释扫描
 * @param {Integer} index 
 */
// var count = 1000000;
// var string = "                  ${`";
// var t1 = test(function () {
//     single_comment_scanner.call(string, 0);
// }, count); //233+
// var t2 = test(function () {
//     single_comment_scanner2.call(string, 0);
// }, count); //3340+
// console.log(t1, t2);
function single_comment_scanner(index) {
    var reg = /[\r\n\u2028\u2029]/g;
    reg.lastIndex = index + 1;
    var res = reg.exec(this);
    index = res ? res.index : this.length;
    if (this[index] === "\r" && this[index + 1] == "\n") {
        index++;
    }
    return index + 1;
}

function single_comment_scanner2(index) {
    var c;
    var length = this.length;
    while (++index < length) {
        /**
         * 这里switch case 与if的速度相当，但当使用双字节换行时有较大的风险，所以这里使用if+codePointAt
         */
        // switch (this[index]) {
        //     case "\r":
        //         if (this[index + 1] === "\n") return index + 2;
        //         return index + 1;
        //     case "\n":
        //     case "\u2028":
        //     case "\u2029":
        //     return index+1;
        // }
        c = this.charCodeAt(index);
        if (c < 0xff) {
            if (c === 13) {
                if (this.charCodeAt(index + 1) === 10) {
                    return index + 2;
                }
                return index + 1;
            } else if (c === 10) {
                return index + 1;
            }
        } else {
            if (c === 2028 || c === 2029) {
                return index + 1;
            }
        }
    }
    return index;
}
//var declareReg=/(var|const|let)\s+([A-Za-z\$_][\w$_]*(?:\s*,\s*[A-Za-z\$_][\w$_]*)*)/g;
/**
 * 代码块扫描
 * @param {Integer} index 
 * @param {Array} blocks 
 */
// var count = 1000000;
// var string = "                  ${`";
// var t1 = test(function () {
//     single_comment_scanner.call(string, 0);
// }, count); //317+
// var t2 = test(function () {
//     single_comment_scanner2.call(string, 0);
// }, count); //3354+
// console.log(t1, t2);
function block_code_scanner(index, blocks = [], keepdeep = Infinity) {
    var save = (blocks instanceof Array) ? function (scanner, children) {
        if (deep < keepdeep && saved_index < index) {
            blocks.push(new Block(scanner, saved_index, index, children));
            saved_index = index;
        }
    } : function () { };
    var lookback = function (tempIndex) {
        while (tempIndex >= saved_index && /\s/.test(this[tempIndex])) tempIndex--;
        if (tempIndex < saved_index) {
            var blockIndex = blocks.length;
            while (blockIndex-- > 0) {
                var tempBlock = blocks[blockIndex];
                var type = tempBlock.type;
                if (type === single_comment_scanner || type === multi_comment_scanner) continue;
                if (type !== block_code_scanner) break;
                var tempLastIndex = tempBlock.start;
                tempIndex = Math.min(tempBlock.end, tempIndex);
                while (tempIndex >= tempLastIndex && /\s/.test(this[tempIndex])) tempIndex--;
                if (tempIndex > tempLastIndex) break;
            }
            if (blockIndex < 0) tempIndex = blockIndex;
        }
        return tempIndex;
    };
    var saved_index = index;
    var start_index = index;
    var c, deep = 0;
    var length = this.length;
    var reg = /[\/\{\}'"`]/g;
    while (index < length) {
        reg.lastIndex = index;
        var res = reg.exec(this);
        index = res ? res.index : this.length;
        //直接用字符表示比用数字快一倍，用的时间是用codePointAt的一半
        var c = this[index];
        switch (c) {
            case "/": //    /
                save(block_code_scanner);
                var d = this[index + 1];
                //内部的d 数字与字符的速度差别不大
                if (d === "*") { // u /* */
                    index = multi_comment_scanner.call(this, index + 1);
                    save(multi_comment_scanner);
                } else if (d === "/") { // x3 //
                    index = single_comment_scanner.call(this, index + 1);
                    save(single_comment_scanner);
                } else { // /reg/
                    var isReg = false;
                    // do{break 8
                    // for(;;)break 12
                    // while(0)break 13
                    // switch(a){case 1:break
                    // return/a/
                    //switch case break,while continue,break abcd;
                    var tempIndex = lookback.call(this, index - 1);
                    isReg = tempIndex <= start_index || /[[|,+=*~?:&\^{\(\/><;%\-!]/.test(this[tempIndex]);
                    if (!isReg && tempIndex >= start_index + 5) {
                        var last_pice = this.slice(Math.max(tempIndex - 50, 0), tempIndex + 1);
                        isReg = /return\s*$|([)};:{]|[^\.\s]\s+)(continue|break|case)\s*$/.test(last_pice);
                        isReg = isReg || /([)};:{]|[^\.\s]\s+)(?:continue|break)\s+([\w\u0100-\u2027\u2030-\uffff]+?)$/.test(last_pice);
                        if (!isReg && !/\r\n\u2028\u2029/.test(last_pice)) {
                            var variabled_name_reg = /\w\u0100-\u2027\u2030-\uffff/;
                            if (variabled_name_reg.test(this[tempIndex])) {
                                while (tempIndex > 8 && variabled_name_reg.test(this[tempIndex])) tempIndex--;
                                var tempIndex2 = lookback.call(this, tempIndex);
                                if (tempIndex2 >= 8 && !/\r\n\u2028\u2029/.test(this.slice(tempIndex2, tempIndex))) {
                                    isReg = /([)};:{]|[^\.\s]\b\s*)(continue|break)$/.test(this.slice(tempIndex2 - 8, tempIndex2 + 1));
                                }
                            }
                        }
                    }
                    if (isReg) {
                        index = regexp_quote_scanner.call(this, index);
                        save(regexp_quote_scanner);
                    } else {
                        index++;
                    }
                }
                break;
            case "`": //     `
                save(block_code_scanner);
                var children = [];
                index = template_quote_scanner.call(this, index, children);
                save(template_quote_scanner, children);
                break;
            case "'": //         '
                save(block_code_scanner);
                index = single_quote_scanner.call(this, index);
                save(single_quote_scanner);
                break;
            case "\"": //         "
                save(block_code_scanner);
                index = double_quote_scanner.call(this, index);
                save(double_quote_scanner);
                break;
            case "}": //          }
                if (deep === 0) {
                    save(block_code_scanner);
                    return index + 1;
                }
                deep--;
                index++;
                break;
            case "{": //           {
                deep++;
                index++;
                break;
        }
    }
    if (saved_index < length) save(block_code_scanner);
    return index;
}

function block_code_scanner2(index, blocks) {
    var save = (blocks instanceof Array) ? function (scanner) {
        if (saved_index < index) {
            blocks.push(new Block(scanner, saved_index, index));
            saved_index = index;
        }
    } : function () { };
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
    var saved_index = index;
    var c, deep = 0;
    var length = this.length;
    while (index < length) {
        //直接用字符表示比用数字快一倍，用的时间是用codePointAt的一半
        var c = this[index];
        switch (c) {
            case "/": //    /
                save(block_code_scanner);
                var d = this[index + 1];
                //内部的d 数字与字符的速度差别不大
                if (d === "*") { // u /* */
                    index = multi_comment_scanner.call(this, index + 1);
                    save(multi_comment_scanner);
                } else if (d === "/") { // x3 //
                    index = single_comment_scanner.call(this, index + 1);
                    save(single_comment_scanner);
                } else { // /reg/
                    index = regexp_quote_scanner.call(this, index);
                    save(regexp_quote_scanner);
                }
                // var d = this.codePointAt(index + 1);
                // save(block_code_scanner);
                // if (d === 42) { // u /* */
                //     index = multi_comment_scanner.call(this, index + 1);
                //     save(multi_comment_scanner);
                // } else if (d === 47) { // x3 //
                //     index = single_comment_scanner.call(this, index + 1);
                //     save(single_comment_scanner);
                // } else { // /reg/
                //     index = regexp_quote_scanner.call(this, index);
                //     save(regexp_quote_scanner);
                // }
                break;
            case "`": //     `
                save(block_code_scanner);
                index = template_quote_scanner.call(this, index, blocks);
                save(template_quote_scanner);
                break;
            case "'": //         '
                save(block_code_scanner);
                index = single_quote_scanner.call(this, index);
                save(single_quote_scanner);
                break;
            case "\"": //         "
                save(block_code_scanner);
                index = double_quote_scanner.call(this, index);
                save(double_quote_scanner);
                break;
            case "}": //          }
                if (deep === 0) {
                    save(block_code_scanner);
                    return index + 1;
                }
                deep--;
                index++;
                break;
            case "{": //           {
                deep++;
            default:
                index++;
        }
        // c = this.codePointAt(index);
        // switch (c) {
        //     case 47://    /
        //         var d = this.codePointAt(index + 1);
        //         save(block_code_scanner);
        //         /** 嵌在内部的情况较少的switch(d)，速度与来没有差别*/
        //         // switch (d) {
        //         //     case 42:
        //         //         index = multi_comment_scanner.call(this, index + 1);
        //         //         save(multi_comment_scanner);
        //         //         break;
        //         //     case 47:
        //         //         index = single_comment_scanner.call(this, index + 1);
        //         //         save(single_comment_scanner);
        //         //         break;
        //         //     default:
        //         //         index = regexp_quote_scanner.call(this, index);
        //         //         save(regexp_quote_scanner);
        //         // }
        //         if (d === 42) { // u /* */
        //             index = multi_comment_scanner.call(this, index + 1);
        //             save(multi_comment_scanner);
        //         } else if (d === 47) { // x3 //
        //             index = single_comment_scanner.call(this, index + 1);
        //             save(single_comment_scanner);
        //         } else { // /reg/
        //             index = regexp_quote_scanner.call(this, index);
        //             save(regexp_quote_scanner);
        //         }
        //         break;
        //     case 96://     `
        //         save(block_code_scanner);
        //         index = template_quote_scanner.call(this, index);
        //         save(template_quote_scanner);
        //         break;
        //     case 39: //         '
        //         save(block_code_scanner);
        //         index = single_quote_scanner.call(this, index);
        //         save(single_quote_scanner);
        //         break;
        //     case 34://         "
        //         save(block_code_scanner);
        //         index = double_quote_scanner.call(this, index);
        //         save(double_quote_scanner);
        //         break;
        //     case 125://          }
        //         if (deep === 0) {
        //             save(block_code_scanner);
        //             return index + 1;
        //         }
        //         deep--;
        //     case 123://           {
        //         deep++;
        //     default:
        //         index++;
        // }

        /**
         * if else有明显的速度下降
         * 扫描angular.js的源码100次，ifelse用时8500左右
         * 其他条件不变时，switch case用时7600毫秒
         */

        // if (123 > c) { //x5
        //     if (47 > c) { //x3
        //         if (39 === c) { //x1 39 '
        //             save(block_code_scanner);
        //             index = single_quote_scanner.call(this, index);
        //             save(single_quote_scanner);
        //         } else if (34 === c) { //x2 " 34
        //             save(block_code_scanner);
        //             index = double_quote_scanner.call(this, index);
        //             save(double_quote_scanner);
        //         }else{
        //             index++;
        //         }
        //     } else {
        //         if (47 === c) { //x3 /
        //             var d = this.codePointAt(index + 1);
        //             save(block_code_scanner);
        //             if (d === 42) { // u /* */
        //                 index = multi_comment_scanner.call(this, index + 1);
        //                 save(multi_comment_scanner);
        //             } else if (d === 47) { // x3 //
        //                 index = single_comment_scanner.call(this, index + 1);
        //                 save(single_comment_scanner);
        //             } else { // /reg/
        //                 index = regexp_quote_scanner.call(this, index);
        //                 save(regexp_quote_scanner);
        //             }
        //         } else if (96 === c) { //x4 ` 96
        //             save(block_code_scanner);
        //             index = template_quote_scanner.call(this, index);
        //             save(template_quote_scanner);
        //         }else{
        //             index++;
        //         }
        //     }
        // } else {
        //     if (123 === c) { //x5 { 123
        //         deep++;
        //     } else if (125 === c) { //x6 } 125
        //         if (deep === 0) {
        //             save(block_code_scanner);
        //             return index + 1;
        //         }
        //         deep--;
        //     }
        //     index++;
        // }
    }
    if (saved_index < length) save(block_code_scanner);
    return index;
};

function lookback_scanner(blockIndex, blocks) {
    if (!blocks.length || blockIndex >= blocks.length) return -1;
    var tempIndex = blocks[blockIndex].end;
    while (blockIndex-- > 0) {
        var tempBlock = blocks[blockIndex];
        var type = tempBlock.type;
        if (type === single_comment_scanner || type === multi_comment_scanner) continue;
        if (type !== block_code_scanner) break;
        var tempLastIndex = tempBlock.start;
        tempIndex = Math.min(tempBlock.end, tempIndex);
        while (tempIndex >= tempLastIndex && /\s/.test(this[tempIndex])) tempIndex--;
        if (tempIndex > tempLastIndex) break;
    }
    if (blockIndex < 0) tempIndex = blockIndex;
    return tempIndex;
}

var scanner = module.exports = function (s, keepdeep) {
    var blocks = [];
    var s = String(s);
    // var time = +new Date;
    // for (var i = 0; i < 1000; i++) {
    //     block_code_scanner.call(s, 0, blocks);
    // }//angular 1.5.3 x1000 7.0s
    // console.log(+new Date - time);
    block_code_scanner.call(s, 0, blocks, keepdeep);
    // console.log(blocks.map(a => s.slice(a.start, a.end)).join())
    return blocks;
};
scanner.autoskip = function (code, start) {
    return block_code_scanner.call(code, start, null);
};
function Block(scanner, start, end, children) {
    this.type = scanner;
    this.start = start;
    if (children) this.children = children;
    this.end = end;
}
Block.prototype = {
    lookback_scanner,
    block_code_scanner,
    double_quote_scanner,
    regexp_quote_scanner,
    single_quote_scanner,
    multi_comment_scanner,
    single_comment_scanner,
    template_quote_scanner
};
// module.exports(require("fs").readFileSync("./apps/x6/js/angular.js"))
// module.exports(require("fs").readFileSync("./main.js"))