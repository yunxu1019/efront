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
  // https://xiph.org/flac/format.html
  // https://blog.csdn.net/yu_yuan_1314/article/details/9491763
  var type = refilm`
  type 7bit [
    streaminfo{
      "min block size" int16
      maxblocksize int16
      minframesize int24
      maxframesize int24
      采样率/rate int20
      声道数/channels 3bit/raise
      采样位数  5bit/raise
      单声道采样数 int36
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
    vorbis_commen{
      vender_length 32bit/small
      vender_text :vender_length/str
      user_length 32bit/small
      [user_comments] :user_length{
        length 32bit/small
        comment :length/str
      }

    }
    cuesheet{
      catalog 128bytes
      number  8bytes/int
      isdisc  1bit/bool
      padding 2071bits/zero
      songs_count 8bit
    }
    picture{
      type 32bit/int
      mime_length 32bit/int
      mime_text :mime_length/str
      description_length 32bit/int
      description_text :description_length/str
      width 32bit/int
      height 32bit/int
      color_depth 32bit/int
      colors_used 32bit/int
      data_length 32bit/int
      data_bunary :data_length
    }
    ...reserved
    无效
  ]
`[0];
  console.log(type);
  var flac = refilm`
    f/flac 4B=fLaC/str
    [metas,isend=true]{
      isend 1bit/bool
      ${type}
      block_size 24bit/int
      /meta_body -block_size
      / .type
    }
    [frames]{
      code 14bit=0b11111111111110
      reserved1 1bit/bool
      blocking_strategy 1bit/bool
      sample_count int4 [,192,0b0010-0101:(576<<(@-2)),@,@,0b1000-1111:256<<(@-8)]
      sample_rate int4 [reserved,88.2,176.4,192,8,16,22.05,24,32,44.1,48,96,@,@,@,invalid]
      channel int4
      sample_size int3 [@,8,12,@,16,20,24,@]
      reserved2 1bit/bool
      coded_number utf8
      (sample_count,block_size=0b0110) raise8
      (sample_count,block_size=0b0111) raise16
      (sample_rate,0b0011) int8
      (sample_rate,0b1101,1110) int16
      crc int8
      /frame_body -sample_count*sample_size/8+2|
      foot_crc int16
    }
`;
  var url = "/@/data/liangliang.flac"
  getFile(url, function (data, start, total) {
    if (data) {
      console.log(data);
      var parsed = flac.parse(data);
      console.log(parsed);
    } else {

      fetchPiece(url, start, 460000, function (data) {
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