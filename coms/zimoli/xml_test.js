function xml_test() {
    var compiled= xml.parse("<div a=b>compiled</div>");
    console.log(compiled[0]);
}