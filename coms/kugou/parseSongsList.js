a => a.map(b => {
    var data = {};
    if (b.data) extend(data, {
        name: b.data.filename.replace(/^[\s\S]*?\s*\-\s*/, ''),
        singer: b.data.filename.replace(/\s*\-\s*[\s\S]*?$/, '')
    }, b.data);
    else extend(data, b);
    if (data.hash) data.hash = data.hash.replace(/^songs\_/i, '');
    return data;
});