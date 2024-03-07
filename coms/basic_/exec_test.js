var a = async function () {
    console.log(1);
    for (var a = 0; a < 10; a++) {
        await new Promise(ok => setTimeout(ok, 20));
    }
    console.log(2);
    await new Promise(ok => setTimeout(ok, 20));
    await new Promise(ok => setTimeout(ok, 20));
};
var b = async function () {
    console.log(3, process.uptime())
    try {
        console.log(4, 'try');
        throw 5
    } catch (e) {
        console.log(e, 'catched')
        throw 7;
    }
    finally {
        console.log(6, 'finally')
    }
    console.fail('<red>这一行不应出现！</red>');
};
var c = async function () {

    try {

        await b();
    } catch (e) {
        console.log(e)
        return 9;
    }
    finally {
        console.log(8)
    }
};
var d = async function () {
    try {
        throw new Error(10);
    }
    catch (e) {
        throw e;
    }
}
console.log(0, process.uptime())
await a();
console.log(await c());
await d();