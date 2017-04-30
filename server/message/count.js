module.exports=function count(key, then) {
    if (!counts.count) {
        counts.count = 0;
    }
    if (!(then instanceof Function)) {
        return counts[key]++;
    }
    then(counts[key]);
}