function opacity(element, opacity) {
    css(element, {
        opacity: opacity,
        // MsFilter: "\"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=" + parseInt(opacity * 100) + ")\"",
        filter: "Alpha(opacity=" + parseInt(opacity * 100) + ")"
    });
}