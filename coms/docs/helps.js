// <!--
if (typeof i18n === "undefined") i18n = (a, ...b) => a[0] + b.map((c, i) => c + a[i + 1]).join(',');
// -->
var helps = [
    ["f", i18n`显示版本号`, "version", "-v", "--version"],
    ["f", i18n`显示efront的安装路径`, "path", "--path"],
    ["f", i18n`显示帮助信息`, "help", "-h", "--help", "help COMMAND", "-h COMMAND", "--help COMMAND"],
    ["f", i18n`启动文档服务器`, "docs"],
    ["f", i18n`查看efront自身占用的内存`, "memery", "memory", "-m", "--memery", "--memory"],
    ["m", i18n`启动示例项目服务器`, "demo", "demo SRCNAME"],
    ["m", i18n`创建应用，项目目录允许创建第二个应用`, "init", "from SRCNAME", "init APPNAME", "init APPNAME from SRCNAME", "from SRCNAME init APPNAME"],
    ["m", i18n`创建简单应用，独占项目目录的单应用`, "create", "simple", "create|simple from SRCNAME", "create|simple APPNAME", "create|simple APPNAME from APPNAME"],
    ["m", i18n`创建空应用`, "blank", "simple", "from blank", "simple from blank"],
    ["a", i18n`自动识别环境并启动测试环境服务器`, "cook", "cooks", "cook HTTP_PORT", "cook HTTP_PORT HTTPS_PORT", "cooks HTTPS_PORT", "cooks HTTPS_PORT HTTP_PORT"],
    ["q", i18n`自动识别环境并启动开发环境服务器`, "live", "lives", "live HTTP_PORT", "live HTTP_PORT HTTPS_PORT", "lives HTTPS_PORT", "lives HTTPS_PORT HTTP_PORT"],
    ["a", i18n`在项目文件夹启动生产环境服务器`, "start", "starts", "start HTTP_PORT", "start HTTP_PORT HTTPS_PORT", "starts HTTPS_PORT", "starts HTTPS_PORT HTTP_PORT"],
    ["a", i18n`在项目文件夹启动开发环境服务器`, "dev", "devs", "test", "dev|test HTTP_PORT", "dev|test HTTP_PORT HTTPS_PORT", "devs|tests HTTPS_PORT", "devs|tests HTTPS_PORT HTTP_PORT"],
    ["a", i18n`在当前文件夹启动服务器`, "server", "serve|serv|http HTTP_PORT HTTPS_PORT", "serve|serv|http HTTP_PORT", "https HTTPS_PORT HTTP_PORT", "https HTTPS_PORT", "HTTP_PORT HTTPS_PORT", "HTTP_PORT", ""],
    ["a", i18n`显示本机ip地址`, "ip", "-ip", "--ip"],
    ["q", i18n`编译项目`, "public", "publish", "build", "release"],
    ["a", i18n`监测文件变化，自动编译更新的部分并输出到指定目录`, "watch"],
    ["a", i18n`关闭efront服务器`, "kill HTTP_PORT|HTTPS_PORT", "close HTTP_PORT|HTTPS_PORT"],
    ["a", i18n`连接一台efront服务器，取得连接号`, "link ADDRESS"],
    ["a", i18n`用一个连接号登录本机的efront服务器，接收并打印消息`, "care ADDRESS", "care ADDRESS LINKID"],
    ["a", i18n`向一个连接号发送消息`, "cast ADDRESS LINKID MESSAGE"],
    ["z", i18n`检查文件或文件夹中的外部变量`, "check FILEPATH"],
    ["q", i18n`执行按efront方式加载的代码`, "run CODEFILE", "CODEFILE"],
    ["z", i18n`查找含有指定的外部变量的文件`, "find VARIABLE", "find VARIABLE FILEPATH"],
    ["-", i18n`从指定路径创建压缩文件`, "pack PUBLIC_PATH PACKAGE_PATH"],
    ["a", i18n`对json数据进行签名`, "sign JSON_PATH SIGNNAME"],
    ["z", i18n`根据模块的搜索路径查找真实路径`, "detect MODULE_PATH"],
    ["z", i18n`格式化代码`, "format MODULE_PATH TARGET_PATH TABSIZE"],
    ["z", i18n`导出与指定的对象路径关联的代码`, "pick MODULE_PATH TARGET_PATH KEYPATH"],
    ["z", i18n`清理代码，删除已声明未使用的代码`, "wash MODULE_PATH TARGET_PATH"],
    ["z", i18n`从网络下载文件，类似unix中的wget`, "get WEB_PATH ALIAS", "wget WEB_PATH ALIAS"],
    ["k", i18n`设置环境变量`, "setenv --NAME1=VALUE1 --NAME2=VALUE2", "setenv NAME VALUE", "set --NAME1=VALUE1", "set --NAME="],
    ["k", i18n`列出已配置的环境变量`, "listenv", "env"],
    ["-", i18n`创建国际化文案表`, "translate APPNAME"],
    ["-", i18n`将指定的路径添加到可执行文件的扫描路径`, "pathx PATHNAME"],
    ["-", i18n`从可执行文件的扫描路径中移除指定的路径`, "pathxrm PATHNAME"],
    ["-", i18n`设置远程访问的密码`, "password"],
    ["-", i18n`创建windows平台的一键安装包`, "packwin|packexe PUBLIC_PATH PACKAGE_PATH"],
    ["-", i18n`从压缩文件提取源文件`, "unpack PACKAGE_PATH PUBLIC_PATH"]
];
helps.forEach((h, cx) => {
    var [type, info, ...cmds] = h;
    helps[cx] = { type, info, cmds, commands: cmds, hide: type === '-' };
});

var topics = {
    COMMAND: [i18n`命令名`],
    APPNAME: [i18n`您的应用名`],
    SRCNAME: [i18n`源项目`, "blank", "kugou", "pivot"],
    HTTP_PORT: [i18n` http端口`, 80],
    HTTPS_PORT: [i18n` https端口`, 443],
    VARIABLES: [i18n`变量名`],
    ADDRESS: [i18n`efront服务器地址`],
    LINKID: [i18n`efront服务器提供的连接号`],
    MESSAGE: [i18n`文本消息`],
    PUBLIC_PATH: [i18n`软件发布目录`],
    PACKAGE_PATH: [i18n`安装包的路径`],
    JSON_PATH: [i18n`json文件所在的路径`],
    SIGNNAME: [i18n`签名`],
    FILEPATH: [i18n`文件或文件夹的路径`],
    CODEFILE: [i18n`代码文件的路径`],
    MODULE_PATH: [i18n`源文件的模糊路径`],
    TARGET_PATH: [i18n`目标文件的模糊路径`],
    KEYPATH: [i18n`对象的属性路径`],
    TABSIZE: [i18n`缩进空格数`]
};
Object.keys(topics).forEach(k => {
    var v = topics[k];
    if (v.length === 2) v.default = v.pop();
    else if (v.length > 2) v.default = v[1];
})
topics.VARIABLES.push(...Object.keys(topics));
module.exports = { helps, topics };