// 备案信息
var _beian = createElement(div);
css(_beian, "font-size:14px;cursor:pointer;position:absolute;bottom:0;background-color:#f2f2f2;color:#667676;margin:0 auto;text-align:center;width:10em;left:50%;margin-left:-5em;");

function beian() {
    var b_a = createElement(_beian);
    b_a.innerText = "豫ICP备17037756号";
    onclick(b_a, function () {
        window.open("http://www.miitbeian.gov.cn");
    });
    return b_a;
}