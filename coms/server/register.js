return async function register(protocol, port) {
    var password = await userdata.getItem('password-e');
    if (!password) {
        password = Math.random().toString(36).slice(2);
        await userdata.setItem("password-e", password);
    }
    if (/s\:$/.test(protocol)) port += 's';
    var a = encode62.geta(password) + "/" + port;
    var posturl = "https://efront.cc/pivot/register.jsp";
    // <!-- posturl="http://localhost/pivot/register.jsp" -->
    var xhr = cross("post", posturl).send(a);
    await xhr;
    var usercode = xhr.response;
    await userdata.setItem('usercode-e', usercode);
    return usercode;
}