async function main() {
    cross.addDirect('//baidu.com/');
    try{
        var xhr = await cross("fpost", 'http://baidu.com');
        console.log(xhr.responseText);
    }
    catch(e){
        console.error(String(e));
    }
}