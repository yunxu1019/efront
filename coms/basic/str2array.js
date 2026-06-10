var spliter = /\s*[,;\|\r\n]\s*/
module.exports = function (names) {
    if (typeof names === 'string') names = names.split(spliter);
    return names;
}