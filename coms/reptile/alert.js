(title, type) => {
    if (console[type]) console[type](title);
    else if (console[title]) console[title](type);
    else console.warn(title);
}