/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */
css(document.body, {
    width: "100%",
    height: "100%",
    position: "absolute",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    backgroundColor:"black"
});
/**
 * go
 */
function zimoli(page, args) {
    //只有把runtime绑定到对像才可以使用
    //    css(document.body,{
    //        backgroundColor:"rgba(0,0,0,1)"
    //    });
    //    var button=createElement(anniu);
    //    console.log(button)
    init(page, function (pg) {

        // console.log(pg(),"pg");  
        document.body.appendChild(pg.apply(null,args));
    })
}