function lz77c(source, params) {
    setup(params);
    var windowLength = settings.windowLength || settings.defaultWindow;
    if (windowLength > settings.maxWindow) {
        throw 'Window length too large';
    }

    var
        compressed = '',
        pos = 0,
        lastPos = source.length - settings.minStringLength;

    while (pos < lastPos) {
        var
            searchStart = Math.max(pos - windowLength, 0),
            matchLength = settings.minStringLength,
            foundMatch = false,
            bestMatch = {
                distance: settings.maxStringDistance,
                length: 0
            },
            newCompressed = null,
            isValidMatch, realMatchLength;

        while ((searchStart + matchLength) < pos) {
            isValidMatch = ((source.substr(searchStart, matchLength) === source.substr(pos, matchLength)) && (matchLength < settings.maxStringLength));
            if (isValidMatch) {
                matchLength++;
                foundMatch = true;
            } else {
                realMatchLength = matchLength - 1;
                if (foundMatch && (realMatchLength > bestMatch.length)) {
                    bestMatch.distance = pos - searchStart - realMatchLength;
                    bestMatch.length = realMatchLength;
                }
                matchLength = settings.minStringLength;
                searchStart++;
                foundMatch = false;
            }
        }

        if (bestMatch.length) {
            newCompressed = settings.refPrefix + encodeRefInt(bestMatch.distance, 2) + encodeRefLength(bestMatch.length);
            pos += bestMatch.length;
        } else {
            if (source.charAt(pos) !== settings.refPrefix) {
                newCompressed = source.charAt(pos);
            } else {
                newCompressed = settings.refPrefix + settings.refPrefix;
            }
            pos++;
        }
        compressed += newCompressed;
    }

    return compressed + source.slice(pos).replace(/`/g, '``');

}