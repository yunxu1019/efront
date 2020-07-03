module.exports = !!~(process.execArgv && process.execArgv.length ? process.execArgv : process.argv).findIndex(e => /^--(?:debug|inspect)-brk=/i.test(e));
