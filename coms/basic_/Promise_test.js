var Promise0 = window.Promise;
delete modules.Promise;
window.Promise = null;
var Promise1 = await init("Promise")
window.Promise = Promise0;
async function testCatch(Promise) {
    console.log(Promise.toString().slice(0, 30), 'then')
    try {
        await Promise.reject(1).then(function () { }, function () {
            console.log('catch1');
        }).then(null, function () {
            console.log("catch2");
        });
        console.log("done");
    } catch (e) {
        console.log(e)
    }
}
await testCatch(Promise0);
await testCatch(Promise1);
