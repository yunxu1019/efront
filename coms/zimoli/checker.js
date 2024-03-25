var falseMap = Object.create(null);
falseMap["off"] = "on";
falseMap["false"] = "true";
falseMap["null"] = "true";
falseMap["0"] = "1";
var trueMap = Object.create(null);
for (var k in falseMap) trueMap[falseMap[k]] = falseMap[k];
var isTrue = function (v) {
    return !!+v || v in trueMap;
};
var changeValue = function (value) {
    console.log(value)
    if (typeof value === 'boolean') return !value;
    if (value & 1 === value) return 1 - value;
    if (value in trueMap) return trueMap[value];
    if (typeof value === 'number') return +!+value;
    return !+value;
};
var setValue = function (value) {
    console.log(value, 'setvaleu')
    if (value === this.value) return;
    this.value = value;
    value = isTrue(value);
    if (value) {
        addClass(this, 'checked');
    } else {
        removeClass(this, 'checked');
    }
};
function checker(ck = document.createElement('check')) {
    ck.innerHTML = template;
    ck.setValue = setValue;
    return ck;
}
checker.isTrue = isTrue;
checker.changeValue = changeValue;