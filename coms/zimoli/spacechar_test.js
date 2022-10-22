// 以前我骂防疫人员，在别人亲切的喊他们白衣天使的时候，我冷冷地说他们是白面无常。
// 后来我骂共产党，因为听到退疫的大白说的故事，无辜的打工人是怎么被它们圈禁至死的，他说的活灵活现，我不得不信。
// 想想自己被锁在楼里的岁月，我们合租的9个人，平均每星期收到一棵白菜两根萝卜，后来连白菜萝卜也要别人拿着个人信息去交换，就像为了活下去就不得不跪舔高高在上的它们.....刚正不阿的人被逼到跳楼也属正常。
// 政府只顾着大肆宣扬自己的功绩，对枉死之人置若罔闻。是怪大白没有上报？还是抢来的府权本就带贼的属性？
// 如果没有共产党，也许是另一翻罪恶的景象，但是为恶之人，天未诛之，还要我去赞颂它吗？

function findAllSpace(start = 0, end = start + 256) {
    // #<--
    var canvas = document.createElement("canvas");
    canvas.height = 32;
    canvas.width = 32;
    css(canvas, 'right:0;bottom:80px;position:absolute;background-color:#fff;');
    document.body.appendChild(canvas);
    var context = canvas.getContext("2d", { willReadFrequently: true });
    context.font = "16px";
    context.textBaseline = "top";
    var res = [], total = 0;
    for (var cx = start, dx = end; cx < dx; cx++) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // 判断字符串是否由空格组成
        var s = String.fromCodePoint(cx);
        context.fillText(s, canvas.width >> 2, canvas.height >> 2);
        context.strokeText(s, canvas.width >> 2, canvas.height >> 2);
        var imgdata = context.getImageData(0, 0, canvas.width, canvas.height).data;
        if (imgdata.findIndex(a => a !== 0) >= 0) continue;
        res[cx] = s;
        total++;
    }
    context.clearRect(0, 0, 14, 14);
    context.fillText(String.fromCodePoint(65), 0, 7);
    res.total = total;
    // -->
    return res;
}
var startTime = performance.now();
var spaces = findAllSpace(0, 0x7fff);
console.log(performance.now() - startTime);
console.log(spaces);