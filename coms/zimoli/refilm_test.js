var steps = [
  refilm`-基本信息
昵称 input
英文名
出生日期 date
生肖 animal
血型 blood
身高 input
体重
  `,
  refilm`-理想信念
座右铭 text
最大愿望 
人生标杆（榜样）
理想职业
  `,
  refilm`-自认知
最大优点 text
最大缺点
  `,
  refilm`-兴趣爱好
最擅长事情 text
最出色本领
最喜欢运动
最喜欢音乐
最喜欢乐器
最喜欢书籍
最喜欢颜色
最喜欢食物
最喜欢活动
  `,
  refilm`-雷区警示
最讨厌事情 text
最害怕事情
最反感人物
其他雷区警示
  `,
  refilm`-最喜欢的家庭合照
照片列表 image
  `,
];

var fetchPiece = function (url, start, end, onprocess) {
  var xhr = new XMLHttpRequest;
  xhr.open("get", url);
  xhr.responseType = "arraybuffer";
  xhr.setRequestHeader("Range", `bytes=${start}-${end - 1}`);
  xhr.send();
  xhr.onload = function () {
    onprocess(new Uint8Array(this.response), start);
  }
};
var getFile = function (url, onprocess) {
  var xhr = new XMLHttpRequest;
  xhr.open("get", url);
  xhr.responseType = "arraybuffer";
  xhr.onreadystatechange = function (a) {
    if (this.readyState === 4 && this.response) {
      return onprocess(new Uint8Array(this.response), 0, + this.getResponseHeader("Content-Length"));
    }
    var a = +this.getResponseHeader("Content-Length");
    if (a) {
      this.abort();
      onprocess(null, 0, a);
    }
  };
  xhr.send();
};

var scope = {
  prevStep() {
    if (this.index > 0) {
      this.index--;
    }
  },
  nextStep() {
    if (this.index + 1 < this.steps.length) {
      this.index++;
    }
  },
  steps,
  data: {},
  index: 0,
};
var console = window.console;
function test_file_parse() {
  // https://blog.csdn.net/yu_yuan_1314/article/details/9491763
  var type = refilm`
  type 7bit [
    streaminfo{
      minblocksize 16bit/int
      maxblocksize 16bit/int
      minframesize 24bit/int
      maxframesize 24bit/int
      采样率/rate 20bit/int
      声道数/channels 3bit/raise
      采样位数  5bit/raise
      单声道采样数 36bit/int
      原始信号签名/md5 128bit
    }
    padding 1bit
    application {
      id 32bit
      data -1bit
    }
    [seektable,cys=0]{
      
        序号/id 8byte/int
        偏移量/pyl 8byte/int
        采样数/cys 2byte/int
      
    }
    vorbis_commen
    cuesheet
    picture
    ...reserved
    无效
  ]
`[0];
  console.log(type);
  var flac = refilm`
    f/flac 4B=fLaC/str
    [meta,isend=true]{
      isend 1bit/bool
      ${type}
      block_size 24bit/int
      / -block_size
      / .type
    }`;
  var url = "/@/data/liangliang.flac"
  getFile(url, function (data, start, total) {
    if (data) {
      console.log(data);
      var parsed = flac.parse(data);
      console.log(parsed);
    } else {

      fetchPiece(url, start, 42000, function (data) {
        console.log(data);
        var parsed = flac.parse(data);
        console.log(parsed);
      })
    }
  });
  console.log(flac);
}
function main() {
  test_file_parse();
  var page = div();
  page.innerHTML = refilm_test;

  renderWithDefaults(page, scope);
  return page;
}