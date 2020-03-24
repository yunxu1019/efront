function getEventRect(event) {
    var { clientX, clientY } = event;
    return {
        width: 14,
        height: 14,
        left: clientX - 7,
        right: clientX + 7,
        top: clientY - 7,
        bottom: clientY + 7
    };
}