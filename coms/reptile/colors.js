var colors = module.exports = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
    FgGray: "\x1b[90m",
    FgRed2: "\x1b[91m",
    FgGreen2: "\x1b[92m",
    FgYellow2: "\x1b[93m",
    FgBlue2: "\x1b[94m",
    FgPurple: "\x1b[95m",
    FgCyan2: "\x1b[96m",
    FgWhite2: "\x1b[97m",
    // test: "\x1b[97m",
    BgGray: "\x1b[100m",
    BgRed2: "\x1b[102m",
    BgGreen2: "\x1b[102m",
    BgYellow2: "\x1b[103m",
    BgBlue2: "\x1b[104m",
    BgMagenta2: "\x1b[105m",
    BgCyan2: "\x1b[106m",
    BgWhite2: "\x1b[107m",
};
colors.label = colors.strap = colors.value = colors.FgBlue2;
colors.comment = colors.FgGreen;
colors.invoke = colors.method = colors.FgYellow2;
colors.express = colors.property = colors.FgCyan2;
colors.predef = colors.FgGreen2;
colors.outside = colors.FgCyan;
colors.stamp = colors.FgGray;
colors.regexp = colors.FgRed2;
colors.text = colors.FgRed;
colors.flow = colors.FgPurple;
colors.digit = colors.FgGreen2;
colors.deep0 = colors.FgYellow;
colors.deep1 = colors.FgPurple;
colors.deep2 = colors.FgBlue2;
colors.deep3 = colors.FgYellow;
colors.deep4 = colors.FgPurple;
colors.deep5 = colors.FgBlue2;
colors.deep6 = colors.FgYellow;
colors.deep7 = colors.FgPurple;
colors.deep8 = colors.FgBlue2;
colors.deep9 = colors.FgYellow;
colors.deep10 = colors.FgPurple;
colors.deep11 = colors.FgBlue2;
colors.deep12 = colors.FgYellow;
colors.deep13 = colors.FgPurple;
colors.deep14 = colors.FgBlue2;
colors.deep15 = colors.FgYellow;
colors.deep16 = colors.FgPurple;
colors.deep17 = colors.FgBlue2;
class Color {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    toString() {
        return this.value;
    }
}
for (var k in colors) {
    colors[k] = new Color(k, colors[k]);
}