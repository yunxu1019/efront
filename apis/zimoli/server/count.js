function countPage({ path }) {
    return counts[path] || 0;
}
module.exports = countPage;