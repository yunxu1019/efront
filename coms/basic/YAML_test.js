var data = [
    { a: 1, b: 2 },
    { abcd: 2, c: 3 },
    { abcdefg: 3, d: 4 },
    { abcdefgh: 3, e: 5, g: { h: 1, k: 2 } },
    { abcdefgh: 3, e: 5, g: [{ a: 1, b: 2 }] },
    { abcdefgh: 3, e: 5, g: [{ a: 1, b: [{ c: 3, defg: 3 }] }] },
]
console.log(YAML.stringify(data));