var count = 0x10000000;//弹出式菜单或窗口的zIndex起点
function zIndex(inc = 1) {
    inc |= 0;
    if (inc > 0) count += inc;
    return count;
};
