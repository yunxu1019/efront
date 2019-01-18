function rgba(r, g, b, a) {
    switch (arguments.length) {
        case 1:
            // 0xffffffff
            switch (typeof r) {
                case "number":
                    return `rgba(${[r >>> 24 & 0xff, r >>> 16 & 0xff, r >>> 8 & 0xff, (r & 0xff) / 0xff]})`;
                case "array":
                    return rgba.apply(null, r);
                case "string":
                    if (/^([\da-f]{3}){1,2}$/i.test(r)) return "#" + color;
                    if (/^#?([\da-f]{4}){1,2}$/i.test(r)) {
                        switch (r.length) {
                            case 5:
                                r = r.slice(1);
                            case 4:
                                return rgba.apply(null, r.split("").map(a => parseInt(a + a, 16)));
                            case 9:
                                r = r.slice(1);
                            case 8:
                                return rgba(parseInt(a, 16));
                        }
                    };
                    return color;
            }
        case 2:
            if (g > 1) g = g / 256;
            if (/^#?([\da-f]{3}){1,2}[\da-f]{1,2}$/i.test(r)) {
                r = r.replace(/^#/, "").split("").map(a => parseInt(a.length == 1 ? a + a : a, 16)).slice(0, 3);
                r.push(g);
                return `rgba(${r})`;
            }
            if (typeof r === "number") {
                return `rgba(${[r >>> 16 & 0xff, r >>> 8 & 0xff, r & 0xff, g]})`;
            }
            break;
        case 3: return `rgb(${[r, g, b]})`;
        case 4:
            return `rgba(${[r, g, b, a]})`;
    }
    return null;
}