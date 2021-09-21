module.exports = !!~(process.execArgv && process.execArgv.length ? process.execArgv : process.argv).findIndex(e => /^--(?:debug|inspect)(?:-brk)?(?:=\d*)?$/i.test(e));
