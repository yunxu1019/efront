var spliter = /\s*[,;\|]\s*/
module.exports = function (names) {
    if (typeof names === 'string') names = names.split(spliter);
    return names;
}