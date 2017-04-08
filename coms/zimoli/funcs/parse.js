/* 
 * 不枝雀
 * 2017-3-18 0:47:26
 */


let parse = function (template) {
    if (!template) {
        return;
    }
    let in_comma = false;//引号
    let in_bracket = false;//尖括号
    // tag1
    //      tag2
    //      tag3
    //          tag4
    //      tag5
    // tag6
    var tags = [];
    for (let cx = 0, dx = template.length; cx < dx; cx++) {
        let char = template[cx];
        if (in_bracket) {
            if ((in_comma === "'" && char === "'" || in_comma === '"' && char === '"') && template[cx - 1] !== '\\') {
                in_comma === false;
            } else if (!in_comma && (char === '"' || char === "'")) {
                in_comma = char;
            }else if (char === ">") {
                in_bracket = false;
                in_comma = false;
            }
            continue;
        }
        if (char === "<") {
            if (template[cx + 1] === "/") {
                //闭合tag
                let ca = cx + 2;
                while (cx < dx) {
                    if (template[cx++] === ">") {
                        break;
                    }
                }
                let temp = template.slice(ca, cx-1);
                let temp_index = tags.length - 1;
                let tag = tags[temp_index];
                while (temp_index >= 0) {
                    tag = tags[temp_index];
                    if (tag === temp.name) {
                        break;
                    }
                    temp_index--;
                }
                if (temp_index>0) {
                    tag.children = tags.splice(temp_index + 1);
                }
                continue;
            }
            in_bracket = cx;
        }else if(char===">"){
            let tag_template=template.slice(in_bracket+1,cx);
            
        }
    }
};
console.log(parse("<div></div>"))
module.exports = parse;