/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */
//用于模块化的函数，用以构造依赖注入的对象
function zimoli(page, args) {
    //只有把runtime绑定到对像才可以使用
    //    css(document.body,{
    //        backgroundColor:"rgba(0,0,0,1)"
    //    });
    //    var button=createElement(anniu);
    //    console.log(button)
    css(document.body, {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "#ff0",
        margin: "0",
        padding: "0",
        overflow: "hidden",
        // WebkitTouchCallout: "none",
        // WebkitUserSelect: "none",
        // KhtmlUserSelect: "none",
        // MozUserSelect: "none",
        // MsUserSelect: "none"
    });
    // document.body.setAttribute("style","width:100%;height:100%;position:absolute;margin:0;padding:0;");
    // document.body.style.backgroundColor="#000";
    document.body.appendChild(page.apply(null, args));

}