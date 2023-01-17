
var helps = [
    "显示版本号,version,-v,--version",
    "显示efront的安装路径,path,--path",
    "查看efront自身占用的内存,memery,memory,-m,--memery,--memory",
    "显示帮助信息,help,-h,--help,help COMMAND,-h COMMAND,--help COMMAND",
    "启动文档服务器,docs",
    "启动示例项目服务器,demo,demo SRCNAME",
    "创建应用，项目目录允许创建第二个应用,init,from SRCNAME,init APPNAME,init APPNAME from SRCNAME,from SRCNAME init APPNAME",
    "创建简单应用，独占项目目录的单应用,create,simple,create|simple from SRCNAME,create|simple APPNAME,create|simple APPNAME from APPNAME",
    "创建空应用,blank,simple,from blank,simple from blank",
    "自动识别环境并启动开发环境服务器,live,lives,live HTTP_PORT,live HTTP_PORT HTTPS_PORT,lives HTTPS_PORT,lives HTTPS_PORT HTTP_PORT",
    "在项目文件夹启动生产环境服务器,start,starts,start HTTP_PORT,start HTTP_PORT HTTPS_PORT,starts HTTPS_PORT,starts HTTPS_PORT HTTP_PORT",
    "在项目文件夹启动开发环境服务器,dev,devs,test,dev|test HTTP_PORT,dev|test HTTP_PORT HTTPS_PORT,devs|tests HTTPS_PORT,devs|tests HTTPS_PORT HTTP_PORT",
    "在当前文件夹启动服务器,server,serve|serv|http HTTP_PORT HTTPS_PORT,serve|serv|http HTTP_PORT,https HTTPS_PORT HTTP_PORT,https HTTPS_PORT,HTTP_PORT HTTPS_PORT,HTTP_PORT,",
    "显示本机ip地址,ip,-ip,--ip",
    "编译项目,public,publish,build,release",
    "监测文件变化，自动编译更新的部分并输出到指定目录,watch",
    "关闭efront服务器,kill HTTP_PORT|HTTPS_PORT,close HTTP_PORT|HTTPS_PORT",
    "连接一台efront服务器，取得连接号,link ADDRESS",
    "用一个连接号登录本机的efront服务器，接收并打印消息,care ADDRESS,care ADDRESS LINKID",
    "向一个连接号发送消息,cast ADDRESS LINKID MESSAGE",
    "检查文件或文件夹中的外部变量,check FILEPATH",
    "执行按efront方式加载的代码,run CODEFILE,CODEFILE",
    "查找含有指定的外部变量的文件,find VARIABLE,find VARIABLE FILEPATH",
    "-从指定路径创建压缩文件,pack PUBLIC_PATH PACKAGE_PATH",
    "对json数据进行签名,sign JSON_PATH SIGNNAME",
    "根据模块的搜索路径查找真实路径,detect MODULE_PATH",
    "格式化代码,format MODULE_PATH TARGET_PATH TABSIZE",
    "导出与指定的对象路径关联的代码,pick MODULE_PATH TARGET_PATH KEYPATH",
    "清理代码，删除已声明未使用的代码,wash MODULE_PATH TARGET_PATH",
    "设置环境变量,setenv --NAME1=VALUE1 --NAME2=VALUE2,setenv NAME VALUE,set --NAME1=VALUE1,set --NAME=",
    "列出已配置的环境变量,listenv,env",
    "-将指定的路径添加到可执行文件的扫描路径,pathx PATHNAME",
    "-从可执行文件的扫描路径中移除指定的路径,pathxrm PATHNAME",
    "-设置远程访问的密码,password",
    "-创建windows平台的一键安装包,packwin|packexe PUBLIC_PATH PACKAGE_PATH",
    "-从压缩文件提取源文件,unpack PACKAGE_PATH PUBLIC_PATH",
];
helps.forEach((str, cx) => {
    var [info, ..._commands] = str.split(",");
    var hide = /^-/.test(info);
    info = info.replace(/^-/, '');
    var help = { info, hide, commands: _commands, cmds: _commands };
    helps[cx] = help;
});
var topics = {
    COMMAND: "命令名",
    APPNAME: "您的应用名",
    SRCNAME: "源项目|blank,blank,kugou,pivot",
    HTTP_PORT: " http 端口|80",
    HTTPS_PORT: " https 端口|443",
    VARIABLES: "变量名",
    ADDRESS: "efront服务器地址",
    LINKID: "efront服务器提供的连接号",
    MESSAGE: "文本消息",
    PUBLIC_PATH: "软件发布目录",
    PACKAGE_PATH: "安装包的路径",
    JSON_PATH: "json文件所在的路径",
    SIGNNAME: "签名",
    FILEPATH: "文件或文件夹的路径",
    CODEFILE: "代码文件的路径",
    MODULE_PATH: '源文件的模糊路径',
    TARGET_PATH: '目标文件的模糊路径',
    KEYPATH: '对象的属性路径',
    TABSIZE: '缩进空格数',
};
topics.VARIABLES += "," + Object.keys(topics);
module.exports = { helps, topics };