var tbar = titlebar("建设中");
var page = div();
page.innerHTML = pending;
page.initialStyle = "transform:perspective 800px rotate3d(0,0,1,180deg);background:#000;z-index:2;margin-left:100%;";
function main(title) {
    tbar.querySelector("label").innerHTML = title;
    return page;
}