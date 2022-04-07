function vbox_test() {
    var vbox1 = vbox();
    var vbox2 = vbox();
    vbox2.innerHTML = '<span></span>';
    appendChild(vbox1, vbox2);
    test_scroll(vbox2);
    return vbox1;
}