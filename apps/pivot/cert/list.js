plist.bind(null, '接口管理', "cert", refilm`
*域名/hostname input/253
公钥/private gen/600 ${async function (data) {
        var [private_key, public_key] = await acme2.createKeyPair();
        data.private = private_key;
        data.public = public_key;
    }}
-私钥/public text
$证书/cert text`, '/cert/edit');
