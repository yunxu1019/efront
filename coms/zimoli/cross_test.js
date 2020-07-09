function main() {
    cross.addDirect('//baidu.com/');
    cross("fpost", 'http://baidu.com').data({ a: 1 }).done(console.log);
}