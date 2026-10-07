var commbuilder = efront$commbuilder;
var lonebuilder = efront$lonebuilder;
var htmlbuilder = lonebuilder.html;
var {
    backs_root
} = require("./environment");
var asmbuilder = require("../efront/asmbuilder");
var getCommmap = require("../efront/getCommap");
var memery = require("../efront/memery");
var xhtbuilder, dynabuilder, backbuilder, pagebuilder, commap;
var updatemap = async function () {
    commap = BuildInfo.commap = await getCommmap(memery.APP, undefined, Infinity);
    var backmap = BuildInfo.backmap = await getCommmap.load(backs_root, Infinity);
    if (commap["#"]) Object.defineProperty(backmap, "#", {
        value: commap["#"],
        enumerable: false,
    });
    var pagemap = commap;
    if (pagemap['zimoli'] || pagemap["zimoli$zimoli"]) {
        ["state", 'login', 'upwith', "go"].forEach(function (name) {
            var f = pagemap[name];
            if (f) delete this[f];
            delete pagemap[name];
        }, pagemap["?"]);
    }
    xhtbuilder = commbuilder = commbuilder.bind(commap);
    dynabuilder = efront$dynabuilder.bind(backmap);
    backbuilder = efront$backbuilder.bind(backmap);
    pagebuilder = function (buffer, filename) {
        if (memery.webindex.indexOf(filename) >= 0) {
            return htmlbuilder.apply(null, arguments);
        }
        else {
            var bf = buffer;
            if (/^\s*<!--/.test(bf.slice(0, 20).toString())) {
                bf = bf.slice(0, 2000).toString().replace(/^(\s*<!--[\s\S]*?--!?>)*/g, "");
            }
            if (/^\s*<!Doctype\b/i.test(bf)) return htmlbuilder.apply(null, arguments);
        }
        return commbuilder.apply(pagemap, arguments);
    };
}
var noopbuilder = lonebuilder.noop;

function patchBuilder(info) {
    var builder;
    var extt = info.extt;
    bigloop: switch (info.type) {
        case "":
            builder = xhtbuilder;
            if (info.realpath === commap[";"]) builder = noopbuilder;
            else builder = xhtbuilder;
            break;
        case "/":
            if (/\.html?$/i.test(extt)) {
                if (memery.webindex.indexOf(info.destpath) < 0) {
                    builder = pagebuilder;
                }
            }
            else {
                builder = xhtbuilder;
            }
            break;
        case "%":
            builder = dynabuilder;
            break;
        case "~":
            if (/\.asm$/i.test(extt)) {
                builder = asmbuilder;
            } else {
                builder = lonebuilder.get(extt);
            }
            break;
        case "*":
        case "\\":
            builder = noopbuilder;
            break;
        // case ".":
        //     builder = iconbuilder;
        //     extt = ".png";
        //     fullpath = ccons_root instanceof Array ? ccons_root.map(c => path.join(c, name + extt)) : path.join(ccons_root, name + extt);
        //     destpath = path.join("ccon", name);
        //     break;
        case "+":
        case "-":
            builder = backbuilder;
            break;

        default:
            throw new Error(i18n`类型不被支持!`);
    }
    info.builder = builder;
}
patchBuilder.load = updatemap;

return patchBuilder;