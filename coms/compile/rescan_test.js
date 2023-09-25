var o = { name: 'o', text: 'replaced', abcd: 2023 };
var a = rescan`1${1}${2}${o}`;
console.log(a)