var commbuilder = require("./commbuilder");
var packcomm = require("./cache")("../comm", function (buffer, filename) {
            var text = commbuilder(buffer, filename);
            var functionArgs, functionBody;
            //依赖项名称部分的长度限制为36*36*18=23328
            var doublecount = parseInt(text.slice(0, 3), 36);
            if (doublecount & 1 ^ 1) {
                var dependencesCount = doublecount >> 1;
                var perdependenceCount = doublecount - (dependencesCount << 1);
                var dependenceNamesOffset = 3 + dependencesCount;
                var dependenceNames = text.slice(3, dependenceNamesOffset);
                functionArgs = dependenceNames ? dependenceNames.split(",") : [];
                functionBody = text.slice(dependenceNamesOffset);
            } else {
                functionArgs = [];
                functionBody = text;
            }
            var halfArgsLength=functionArgs.length>>1;
            functionArgs.slice(0, halfArgsLength).map(packcomm).map(
                
            ).concat(`var ${filename}`);
            if (functionArgs.length) {} else {
                return functionBody;
            }

        }

        module.exports = function (file) {
            commbuilder(buffer)
        }