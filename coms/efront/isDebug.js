module.exports = !!~(process.execArgv || process.argv).findIndex(e => /^--(?:debug-brk=|inspect-brk=|efront)/i.test(e));
