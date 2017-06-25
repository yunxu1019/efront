function hline(line_width, line_opacity) {
    var line = createElement(div);
    css(line, "width:100%;height:" + line_width + "px;background-color:#000;");
    line_opacity && opacity(line, line_opacity);
    return line;
}